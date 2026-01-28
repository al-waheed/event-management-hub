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

export const useUsersEventData = () => {
  const uid = auth.currentUser?.uid;
  return useQuery({
    queryKey: ["userEvents", uid],
    enabled: !!uid,
    queryFn: async () => {
      const event = query(
        collection(db, "events"),
        where("createdBy", "==", uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(event);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
      let allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return allEvents;
    },
  });
};
