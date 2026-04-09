import { NavLink } from "react-router-dom";
import EventLists from "./EventLists";
import { format } from "date-fns";
import { RotatingLines } from "react-loader-spinner";
import {
  MdOutlineDateRange,
  MdEventAvailable,
  MdOutlineCalendarMonth,
  MdAdd,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import {
  useUserData,
  useUsersEventData,
  useAttendingEventsData,
} from "../../queries/DataQueries";

const Dashboard = () => {
  const { data: userData, isLoading } = useUserData();
  const { data: userEvents } = useUsersEventData();
  const { data: attendingEvents } = useAttendingEventsData();

  const totalInvites = attendingEvents?.length || 0;

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

  const memberSince = userData?.createdAt?.seconds
    ? format(new Date(userData.createdAt.seconds * 1000), "dd MMM yyyy")
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-6 text-white mt-3">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full" />

        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {userData?.fullname?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight truncate">
              Welcome back, {userData?.fullname}
            </h1>
            <p className="mt-0.5 text-sm text-white/70">
              Here's a quick summary of your events.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <MdEventAvailable className="text-xl mx-auto mb-1 text-white/80" />
            <p className="text-2xl font-bold">{userEvents?.length || 0}</p>
            <p className="text-[11px] text-white/60 font-medium">Created</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <MdOutlineCalendarMonth className="text-xl mx-auto mb-1 text-white/80" />
            <p className="text-2xl font-bold">{attendingEvents?.length || 0}</p>
            <p className="text-[11px] text-white/60 font-medium">Attending</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <FaUsers className="text-xl mx-auto mb-1 text-white/80" />
            <p className="text-2xl font-bold">{totalInvites}</p>
            <p className="text-[11px] text-white/60 font-medium">
              Invites Sent
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <MdOutlineDateRange className="text-xl mx-auto mb-1 text-white/80" />
            <p className="text-sm font-bold mt-1">{memberSince}</p>
            <p className="text-[11px] text-white/60 font-medium">
              Member Since
            </p>
          </div>
        </div>
      </div>

      <NavLink to="/dashboard/create-event">
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-hover transition text-sm mt-6">
          <MdAdd className="text-lg" />
          Create New Event
        </button>
      </NavLink>

      <EventLists userEvents={userEvents} attendingEvents={attendingEvents} />
    </div>
  );
};
export default Dashboard;
