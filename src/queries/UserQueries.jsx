import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";

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
      const userData = snapshot.data();
      if (userData.events) {
        userData.events = userData.events.slice().sort((a, b) => {
          const aTime = a?.createdAt?.seconds || 0;
          const bTime = b?.createdAt?.seconds || 0;
          return bTime - aTime;
        });
      }
      return userData;
    },
  });
};
