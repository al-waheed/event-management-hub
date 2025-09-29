import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Auth/Firebase";
import EventLists from "./EventLists";

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

  console.log("userData",userData)
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={""}
            alt={`avatar`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0 bg-blue-50"
          />

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight truncate">
              Welcome,{" "}
              <span className="text-slate-900">{userData?.fullname}</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Good to see you — here’s a quick summary of your events.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 border rounded-2xl p-4 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-semibold text-primary">
              {5}
            </div>
            <div className="mt-1 text-sm text-primary">Events Created</div>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4 text-center shadow-sm">
            <div className="text-3xl sm:text-4xl font-semibold text-primary">
              {4}
            </div>
            <div className="mt-1 text-sm text-primary">Events Attending</div>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-semibold text-primary">
              {new Date(
                userData?.createdAt?.seconds * 1000
              ).toLocaleDateString()}{" "}
            </div>
            <div className="mt-1 text-sm text-primary">Member since</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4">
        <NavLink to="/dashboard/create-event">
          <button className="btn btn-primary w-full">Create New Event</button>
        </NavLink>
      </div>
      <div className="max-w-6xl mx-auto mt-8">
        <EventLists />
        </div>
    </div>
  );
};
export default Dashboard;
