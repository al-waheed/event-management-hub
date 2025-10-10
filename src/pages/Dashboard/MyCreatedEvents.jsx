import { useState } from "react";

const MyCreatedEvents = ({ createdEvents }) => {
  const [openEvents, setOpenEvents] = useState(false);

  return (
    <div className="p-4 space-y-3">
      {createdEvents.length > 0 ? (
        createdEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-4 rounded-lg shadow-sm border bg-white hover:shadow-md transition"
          >
            <div>
              <h3 className="font-bold text-base text-primary">
                {event.eventTitle}
              </h3>
              <p className="text-xs text-primary">
                {event.eventCategory} •{" "}
                {new Date(event.eventSession).toLocaleDateString()}
              </p>
            </div>
            <button
              className="btn btn-primary font-bold text-xs p-3"
              onClick={() => setOpenEvents(!openEvents)}
            >
              View Event
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No events created yet.</p>
      )}

      {openEvents && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center z-50">
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md shadow-md relative">
            <h4 className="font-semibold text-primary mb-2">Event Details</h4>
            <p className="text-sm text-primary">
              Here you can display more details about the selected event.
            </p>
            <button
              className="absolute top-0 right-3 text-primary hover:text-primary-hover text-2xl"
              onClick={() => setOpenEvents(!openEvents)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCreatedEvents;
