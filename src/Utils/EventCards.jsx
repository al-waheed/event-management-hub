import { FaRegStar, FaUsers } from "react-icons/fa";
import {
  MdAccessTime,
  MdLocationOn,
  MdOutlinePublic,
  MdLock,
} from "react-icons/md";
import { useUserData } from "../queries/DataQueries";

const EventCard = ({ event, onStarClick, onCardClick }) => {
  const { data: userData } = useUserData();

  const date = new Date(event.eventSession);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const attendees = event?.attendeeCount ?? event?.invites?.length ?? 0;
  const isPrivate = event.eventVisibility === "private";

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => onCardClick && onCardClick(event)}
    >
      <div className="relative h-40">
        <img
          src={event.eventBanner}
          alt={event.eventTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1 ${
              isPrivate
                ? "bg-red-500/80 text-white"
                : "bg-green-500/80 text-white"
            }`}
          >
            {isPrivate ? (
              <>
                <MdLock className="text-[10px]" /> Private
              </>
            ) : (
              <>
                <MdOutlinePublic className="text-[10px]" /> Public
              </>
            )}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white capitalize">
            {event.eventCategory}
          </span>
        </div>

        {userData?.id === event.createdBy && (
          <button
            className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-yellow transition"
            onClick={(e) => {
              e.stopPropagation();
              onStarClick && onStarClick(event);
            }}
          >
            <FaRegStar className="text-primary text-sm" />
          </button>
        )}

        <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center leading-none">
          <p className="text-[10px] font-bold text-primary/60 uppercase">
            {month}
          </p>
          <p className="text-lg font-bold text-primary leading-none">{day}</p>
        </div>
      </div>

      <div className="p-3.5 space-y-2">
        <h2 className="text-sm font-bold text-primary line-clamp-1 leading-snug">
          {event.eventTitle}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-1">
          {event.eventDescription}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MdLocationOn className="text-sm text-primary/50 flex-shrink-0" />
          <span className="line-clamp-1">{event.eventAddress}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MdAccessTime className="text-sm text-primary/50 flex-shrink-0" />
          <span>
            {event.eventStarttime}
            {event.eventEndtime ? ` - ${event.eventEndtime}` : ""}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaUsers className="text-primary/50" />
            <span>
              <strong className="text-primary font-semibold">
                {attendees}
              </strong>{" "}
              {attendees === 1 ? "attendee" : "attendees"}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-primary/40 uppercase tracking-wide group-hover:text-primary transition">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
