import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useUsersEventData } from "../queries/DataQueries";
import InviteUserModal from "../modal/InviteUserModal";
import EventCard from "../Utils/EventCards";
import EventModalUtils from "../Utils/EventModalUtils";

const MyEvents = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [inviteEvent, setInviteEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: userEvents, isLoading } = useUsersEventData();
  const events = userEvents || [];

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <p className="text-gray-700 mb-6">Manage your events here.</p>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
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
      ) : events.length === 0 ? (
        <p className="text-gray-600">You have not created any events yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onCardClick={(clickedEvent) => setSelectedEvent(clickedEvent)}
              onStarClick={(clickedEvent) => {
                setInviteEvent(clickedEvent);
                setOpenInviteModal(true);
              }}
            />
          ))}
        </div>
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

export default MyEvents;
