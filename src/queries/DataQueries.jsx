import { useQuery } from "@tanstack/react-query";
import { auth, db } from "../Auth/Firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

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
      return snapshot.data();
    },
  });
};

export const useUsersEventData = () => {
  const uid = auth.currentUser?.uid;
  return useQuery({
    queryKey: ["userEvents"],
    queryFn: async () => {
      const events = query(collection(db, "events"), where("uid", "==", uid));
      const snapshot = await getDocs(events);
      const userEvents = [];
      snapshot.map((doc) => {
        userEvents.push({ id: doc.id, ...doc.data() });
      });
      return userEvents;
    },
  });
};

export const useAllEventsData = () => {
  return useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "events"));
      if (!snapshot.exists()) {
        throw new Error("No events found");
      }
      let allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      allEvents.sort((a, b) => a?.createdAt?.seconds - b?.createdAt?.seconds);
      return allEvents;
    },
  });
};
