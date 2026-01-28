import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useUsersEventData } from "../queries/DataQueries";
import InviteUserModal from "../modal/InviteUserModal";
import EventCard from "../Utils/EventCards";

const MyEvents = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: userEvents, isLoading } = useUsersEventData();
  const events = userEvents || [];

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
              onStarClick={(clickedEvent) => {
                setSelectedEvent(clickedEvent);
                setOpenInviteModal(true);
              }}
            />
          ))}
          {openInviteModal && (
            <InviteUserModal
              openInviteModal={openInviteModal}
              toggleModal={() => setOpenInviteModal(!openInviteModal)}
              event={selectedEvent}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
