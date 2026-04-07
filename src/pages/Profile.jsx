import { RotatingLines } from "react-loader-spinner";
import { format } from "date-fns";
import { MdOutlineEmail, MdVerified } from "react-icons/md";
import { FaRegUser, FaRegCalendarAlt } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useUserData, useUsersEventData } from "../queries/DataQueries";

const Profile = () => {
  const { data: userData, isLoading } = useUserData();
  const { data: userEvents } = useUsersEventData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <RotatingLines
          visible={true}
          height="80"
          width="80"
          strokeWidth="4"
          strokeColor="#2B293D"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Unable to load profile data.
      </div>
    );
  }

  const memberSince = userData.createdAt?.seconds
    ? format(new Date(userData.createdAt.seconds * 1000), "dd MMM yyyy")
    : "N/A";

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">
            {userData.fullname?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-primary truncate">
              {userData.fullname}
            </h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
            <span
              className={`inline-flex items-center gap-1 mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                userData.emailVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {userData.emailVerified ? (
                <>
                  <MdVerified className="text-sm" /> Verified
                </>
              ) : (
                "Not Verified"
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <h3 className="text-lg font-semibold text-primary">
          Account Information
        </h3>

        <div className="flex items-center gap-3 text-primary">
          <FaRegUser className="text-lg flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Full Name</p>
            <p className="font-medium">{userData.fullname}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-primary">
          <MdOutlineEmail className="text-lg flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Email Address</p>
            <p className="font-medium">{userData.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-primary">
          <IoShieldCheckmarkOutline className="text-lg flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Email Status</p>
            <p className="font-medium">
              {userData.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-primary">
          <FaRegCalendarAlt className="text-lg flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Member Since</p>
            <p className="font-medium">{memberSince}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border p-5 text-center">
          <p className="text-3xl font-bold text-primary">
            {userEvents?.length || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">Events Created</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-5 text-center">
          <p className="text-3xl font-bold text-primary">
            {userEvents?.reduce((sum, e) => sum + (e.invites?.length || 0), 0) || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total Invites Sent</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;