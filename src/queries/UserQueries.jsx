import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";

export function useUserData() {
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
}
