import { useState } from "react";
import {
  MdOutlineDateRange,
  MdAccessTime,
  MdOutlinePublic,
  MdLock,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import EventModalUtils from "../../Utils/EventModalUtils";
import InviteUserModal from "../../modal/InviteUserModal";

const MyCreatedEvents = ({ userEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [inviteEvent, setInviteEvent] = useState(null);

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-2">
      {!!userEvents && userEvents.length > 0 ? (
        userEvents.map((event) => {
          const date = new Date(event.eventSession);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const isPrivate = event.eventVisibility === "private";
          const attendees = event.attendeeCount ?? event.invites?.length ?? 0;

          return (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center flex-shrink-0 border border-gray-100">
                <span className="text-[10px] font-bold text-primary/60 uppercase leading-none">
                  {date.toLocaleString("en-US", { month: "short" })}
                </span>
                <span className="text-lg font-bold text-primary leading-none">
                  {date.getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-primary truncate">
                    {event.eventTitle}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center gap-0.5 ${
                      isPrivate
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {isPrivate ? (
                      <MdLock className="text-[9px]" />
                    ) : (
                      <MdOutlinePublic className="text-[9px]" />
                    )}
                    {isPrivate ? "Private" : "Public"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MdOutlineDateRange className="text-sm" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdAccessTime className="text-sm" />
                    {event.eventStarttime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers className="text-[11px]" />
                    {attendees}
                  </span>
                </div>
              </div>

              <IoIosArrowForward className="text-lg text-gray-300 group-hover:text-primary transition flex-shrink-0" />
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center py-8">
          No events created yet.
        </p>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center z-50">
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md w-[70%] relative overflow-y-auto max-h-[100vh]">
            <button
              className="absolute top-0 right-3 text-primary hover:text-primary-hover text-2xl"
              onClick={closeEventDetails}
            >
              &times;
            </button>

            <h4 className="font-semibold text-primary mb-2">Event Details</h4>
            <EventModalUtils
              Banner={selectedEvent.eventBanner}
              Starttime={selectedEvent.eventStarttime}
              Session={selectedEvent.eventSession}
              Endtime={selectedEvent.eventEndtime}
              Category={selectedEvent.eventCategory}
              Type={selectedEvent.eventType}
              Title={selectedEvent.eventTitle}
              Address={selectedEvent.eventAddress}
              Description={selectedEvent.eventDescription}
              Visibility={selectedEvent.eventVisibility}
              invitedUsers={selectedEvent}
            />
          </div>
        </div>
      )}

      {openInviteModal && (
        <InviteUserModal
          openInviteModal={openInviteModal}
          toggleModal={() => setOpenInviteModal(!openInviteModal)}
          event={inviteEvent}
        />
      )}
    </div>
  );
};

export default MyCreatedEvents;
