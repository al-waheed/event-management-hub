import { FaRegStar } from "react-icons/fa";
import { useUserData } from "../queries/DataQueries";

const EventCard = ({ event, onStarClick }) => {
  const { data: userData } = useUserData();

  const date = new Date(event.eventSession);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 relative border">
      <div className="relative">
        <img
          src={event.eventBanner}
          alt={event.eventTitle}
          className="w-full h-44 object-cover"
        />
        <span className="absolute bottom-0 capitalize bg-yellow text-primary text-xs font-medium px-3 py-1 rounded-tr-md">
          {event.eventCategory}
        </span>
        {userData.id === event.createdBy ? (
          <button
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-yellow transition"
            onClick={() => onStarClick && onStarClick(event)}
          >
            <FaRegStar className="text-primary text-lg hover:bg-yellow" />
          </button>
        ) : null}
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
          <h2 className="text-sm font-medium capitalize text-primary mb-1 line-clamp-1">
            {event.eventDescription}
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
};

export default EventCard;
