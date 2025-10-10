import { RotatingLines } from "react-loader-spinner";
import { useUserData } from "../queries/UserQueries";
import { FaRegStar } from "react-icons/fa";

const MyEvents = () => {
  const { data: userData, isLoading } = useUserData();
  const events = userData?.events || [];

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
          {events.map((event) => {
            const date = new Date(event.eventSession);
            const month = date
              .toLocaleString("en-US", { month: "short" })
              .toUpperCase();
            const day = date.getDate();

            return (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 relative border"
              >
                <div className="relative">
                  <img
                    src={event.eventBanner}
                    alt={event.eventTitle}
                    className="w-full h-44 object-cover"
                  />
                  <span className="absolute bottom-0 capitalize bg-yellow text-primary text-xs font-medium px-3 py-1 rounded-tr-md">
                    {event.eventCategory}
                  </span>
                  <button
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-yellow transition"
                    onClick={() =>
                      console.log("Open invite modal for:", event.id)
                    }
                  >
                    <FaRegStar className="text-primary text-lg hover:bg-yellow" />
                  </button>
                </div>
                <div className="flex gap-3 p-4">
                  <div className="text-center">
                    <p className="text-sm font-bold text-indigo-700">{month}</p>
                    <p className="text-xl font-bold text-primary">{day}</p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-primary mb-1 line-clamp-1">
                      {event.eventTitle}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {event.eventAddress}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.eventStarttime} - {event.eventEndtime}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="mr-1">🎟️</span>
                      <span>FREE</span>
                      <span className="mx-1">•</span>
                      <span>⭐ 10 interested</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
