import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import EventModalUtils from "../../Utils/EventModalUtils";

const MyCreatedEvents = ({ userEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="p-4 space-y-3">
      {!!userEvents && userEvents.length > 0 ? (
        userEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4 rounded-lg shadow-sm border bg-white hover:shadow-md transition"
          >
            <div>
              <h3 className="font-bold text-lg text-primary">
                {event.eventTitle}
              </h3>
              <p className="text-sm text-primary">{event.eventCategory}</p>
            </div>

            <div className="flex items-center gap-1">
              <MdOutlineDateRange className="inline text-xl text-primary mr-1 font-medium" />
              <p className="text-base text-primary font-medium">
                {new Date(event.eventSession).toLocaleDateString()}
              </p>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="font-medium text-base cursor-pointer">
                View Event
              </div>
              <IoIosArrowForward className="text-xl text-primary" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No events created yet.</p>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center z-50">
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md w-[70%] relative overflow-y-auto max-h-[100vh]">
            <button
              className="absolute top-0 right-3 text-primary hover:text-primary-hover text-2xl"
              onClick={() => setSelectedEvent(!selectedEvent)}
            >
              &times;
            </button>

            <h4 className="font-semibold text-primary mb-2">Event Details</h4>
            <p className="text-sm text-primary mb-4">
              Here you can display more details about the selected event.
            </p>
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCreatedEvents;
