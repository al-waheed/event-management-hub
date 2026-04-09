import { useQuery } from "@tanstack/react-query";
import { auth, db } from "../Auth/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";

const withAttendeeCount = async (event) => {
  try {
    const invitesQuery = query(
      collection(db, "invites"),
      where("eventId", "==", event.id),
    );
    const invitesSnapshot = await getDocs(invitesQuery);
    return {
      ...event,
      attendeeCount: invitesSnapshot.size,
    };
  } catch {
    return {
      ...event,
      attendeeCount: event.invites?.length || 0,
    };
  }
};

export const useUserData = () => {
  const uid = auth.currentUser?.uid;
  return useQuery({
    queryKey: ["userData", uid],
    enabled: !!uid,
    queryFn: async () => {
      const snapshot = await getDoc(doc(db, "users", uid));
      if (!snapshot.exists()) {
        throw new Error("No user data found");
      }
      return { id: snapshot.id, ...snapshot.data() };
    },
  });
};

export const useUserDataById = (uid) => {
  return useQuery({
    queryKey: ["userData", uid],
    enabled: !!uid,
    queryFn: async () => {
      const snapshot = await getDoc(doc(db, "users", uid));
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() };
    },
  });
};

export const useUsersEventData = () => {
  const uid = auth.currentUser?.uid;
  return useQuery({
    queryKey: ["userEvents", uid],
    enabled: !!uid,
    queryFn: async () => {
      if (!uid) return [];
      const event = query(
        collection(db, "events"),
        where("createdBy", "==", uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(event);
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return Promise.all(events.map(withAttendeeCount));
    },
  });
};


export const useUserInvitesData = () => {
  const uid = auth.currentUser?.uid;

  return useQuery({
    queryKey: ["userInvites", uid],
    enabled: !!uid,
    queryFn: async () => {
      if (!uid) return [];

      // 🔹 Get current user
      const userSnap = await getDoc(doc(db, "users", uid));
      if (!userSnap.exists()) return [];

      const userEmail = userSnap.data().email?.toLowerCase();
      if (!userEmail) return [];

      // 🔹 Get events created by this user
      const eventsQuery = query(
        collection(db, "events"),
        where("createdBy", "==", uid),
      );

      const eventSnap = await getDocs(eventsQuery);
      const eventIds = eventSnap.docs.map((doc) => doc.id);

      if (eventIds.length === 0) return [];

      // 🔹 Get invites for those events
      const invitesQuery = query(
        collection(db, "invites"),
        where("eventId", "in", eventIds),
      );

      const inviteSnap = await getDocs(invitesQuery);

      return inviteSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};

export const useAttendingEventsData = () => {
  const uid = auth.currentUser?.uid;

  return useQuery({
    queryKey: ["attendingEvents", uid],
    enabled: !!uid,

    queryFn: async () => {
      if (!uid) return [];

      // 🔹 STEP 1: Get current user data (same as before)
      const userSnap = await getDoc(doc(db, "users", uid));
      if (!userSnap.exists()) return [];

      const userEmail = userSnap.data().email?.toLowerCase();
      if (!userEmail) return [];
      const invitesQuery = query(
        collection(db, "invites"),
        where("email", "==", userEmail),

        // 🔸 Optional: only show accepted invites
        // remove this line if you want pending too
        where("status", "==", "accepted"),
      );

      const inviteSnap = await getDocs(invitesQuery);

      if (inviteSnap.empty) return [];

      // 🔹 STEP 3: Extract eventIds from invites
      const eventIds = inviteSnap.docs.map((doc) => doc.data().eventId);

      // 🔹 STEP 4: Fetch each event using eventId
      const events = await Promise.all(
        eventIds.map(async (eventId) => {
          const eventSnap = await getDoc(doc(db, "events", eventId));

          if (!eventSnap.exists()) return null;

          return {
            id: eventSnap.id,
            ...eventSnap.data(),
          };
        }),
      );

      // 🔹 STEP 5: Clean result
      const filteredEvents = events.filter(
        (event) =>
          event && // remove nulls
          event.createdBy !== uid, // exclude user's own events
      );
      return Promise.all(filteredEvents.map(withAttendeeCount));
    },
  });
};

export const useAllEventsData = () => {
  return useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const allEvent = query(
        collection(db, "events"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(allEvent);
      const allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return Promise.all(allEvents.map(withAttendeeCount));
    },
  });
};
