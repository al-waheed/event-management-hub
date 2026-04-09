import { useState, useEffect } from "react";
import {
  MdOutlineDateRange,
  MdAccessTime,
  MdLocationOn,
  MdCategory,
  MdOutlinePublic,
  MdLock,
} from "react-icons/md";
import { FaUsers, FaRegEnvelope } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import EventAttendees from "./EventAttendees";
import InviteUserModal from "../modal/InviteUserModal";
import { useUserData, useUserDataById } from "../queries/DataQueries";
import { auth, db } from "../Auth/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EventModalUtils = (props) => {
  const {
    Banner,
    Starttime,
    Session,
    Endtime,
    Category,
    Type,
    Title,
    Address,
    Description,
    Visibility,
    invitedUsers,
  } = props;

  const [invites, setInvites] = useState([]);
  const [viewAttendees, setViewAttendees] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { data: currentUser } = useUserData();
  const { data: hostUser } = useUserDataById(invitedUsers?.createdBy);
  const queryClient = useQueryClient();

  const currentUid = auth.currentUser?.uid;
  const isCreator = currentUid === invitedUsers?.createdBy;
  const isPublic = Visibility !== "private";

  // ✅ FIX: make email comparison safe (case insensitive)
  const alreadyJoined = invites.some(
    (inv) => inv.email?.toLowerCase() === currentUser?.email?.toLowerCase(),
  );

  const attendeeCount = invites?.length;

  const mapQuery = encodeURIComponent(Address || "");

  const toggleInviteModal = () => {
    setOpenInviteModal(!openInviteModal);
  };

  // ✅ GOOD: fetching invites
  useEffect(() => {
    const fetchInvites = async () => {
      if (!invitedUsers?.id) return;

      const q = query(
        collection(db, "invites"),
        where("eventId", "==", invitedUsers.id),
      );

      const snap = await getDocs(q);

      setInvites(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    };

    fetchInvites();
  }, [invitedUsers?.id]);

  const handleJoinEvent = async () => {
    if (!currentUser?.email || !invitedUsers?.id) return;
    setIsJoining(true);

    try {
      const alreadyExists = invites.some(
        (inv) => inv.email?.toLowerCase() === currentUser.email?.toLowerCase(),
      );

      if (alreadyExists) {
        toast.info("You already joined this event");
        return;
      }

      await addDoc(collection(db, "invites"), {
        eventId: invitedUsers.id,
        email: currentUser.email,
        status: "accepted",
        invitedAt: Timestamp.now(),
      });

      // ❗ FIX: manually refetch invites (since you're not using React Query here)
      const q = query(
        collection(db, "invites"),
        where("eventId", "==", invitedUsers.id),
      );

      const snap = await getDocs(q);

      setInvites(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );

      // ❗ REMOVE: this does nothing for invites UI
      // await queryClient.invalidateQueries({ queryKey: ["invites", invitedUsers.id] });

      toast.success("You have joined this event!");
    } catch (e) {
      toast.error("Failed to join event: " + e.message);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white">
      {Banner && (
        <div className="relative w-full h-52 md:h-64">
          <img
            src={Banner}
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm ${
                  Visibility === "private"
                    ? "bg-red-500/80 text-white"
                    : "bg-green-500/80 text-white"
                }`}
              >
                {Visibility === "private" ? (
                  <span className="flex items-center gap-1">
                    <MdLock className="text-xs" /> Private
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <MdOutlinePublic className="text-xs" /> Public
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white capitalize">
                {Category}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {Title}
            </h1>
          </div>
        </div>
      )}

      {!Banner && (
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                Visibility === "private"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {Visibility === "private" ? "Private" : "Public"}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
              {Category}
            </span>
          </div>
          <h1 className="text-xl font-bold text-primary">{Title}</h1>
        </div>
      )}

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <MdOutlineDateRange className="text-xl text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Date
              </p>
              <p className="text-primary font-semibold">{Session}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <MdAccessTime className="text-xl text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Time
              </p>
              <p className="text-primary font-semibold">
                {Starttime}
                {Endtime ? ` - ${Endtime}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <MdCategory className="text-xl text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Type
              </p>
              <p className="text-primary font-semibold capitalize">{Type}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-xl text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Location
              </p>
              <p className="text-primary font-semibold text-sm">{Address}</p>
            </div>
          </div>
          {Address && (
            <div className="rounded-lg overflow-hidden border border-gray-200 h-40">
              <iframe
                title="Event Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=&layer=mapnik&marker=&query=${mapQuery}`}
                allowFullScreen
              />
            </div>
          )}
        </div>

        {Description && (
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1.5">
              About this event
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {Description}
            </p>
          </div>
        )}

        {!isCreator && isPublic && hostUser && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-3">
              Hosted by
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                {hostUser?.fullname?.charAt(0).toUpperCase() || Morenikeji}
              </div>
              <div className="min-w-0">
                <p className="text-primary font-semibold text-sm truncate">
                  {hostUser?.fullname}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FaRegEnvelope className="text-[10px]" />
                  <span>{hostUser?.email}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaUsers className="text-primary" />
            <span>
              <strong className="text-primary">{attendeeCount}</strong>{" "}
              {attendeeCount === 1 ? "attendee" : "attendees"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {invites?.length > 0 && (
              <button
                onClick={() => setViewAttendees(!viewAttendees)}
                className="px-3 py-1.5 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-gray-50 transition"
              >
                {viewAttendees ? "Hide" : "View"} Attendees
              </button>
            )}

            {isCreator && (
              <button
                className="px-4 py-1.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                onClick={toggleInviteModal}
              >
                Invite Users
              </button>
            )}

            {!isCreator && isPublic && !alreadyJoined && (
              <button
                className="px-4 py-1.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                onClick={handleJoinEvent}
                disabled={isJoining}
              >
                {isJoining ? "Joining..." : "Join Event"}
              </button>
            )}

            {!isCreator && isPublic && alreadyJoined && (
              <span className="text-green-600 font-medium text-sm flex items-center gap-1">
                <IoPersonCircleOutline className="text-lg" /> Joined
              </span>
            )}

            {!isCreator && !isPublic && (
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <MdLock /> Invite only
              </span>
            )}
          </div>
        </div>

        {viewAttendees && <EventAttendees event={invitedUsers} />}

        {isCreator && (
          <InviteUserModal
            openInviteModal={openInviteModal}
            toggleModal={toggleInviteModal}
            event={invitedUsers}
          />
        )}
      </div>
    </div>
  );
};
export default EventModalUtils;
