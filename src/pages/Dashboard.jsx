import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("No user data found!");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
        <p>Welcome to your dashboard00000!</p>
      </div>
      {userData ? (
        <div>
          <p>Welcome, {userData.fullname}!</p>
          <p>Email: {userData.email}</p>
          <p>
            Account created on:{" "}
            {new Date(userData.createdAt?.seconds * 1000).toLocaleDateString()}
          </p>
          <button className="btn btn-primary" onClick={() => handleLogout()}>
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
export default Dashboard;
