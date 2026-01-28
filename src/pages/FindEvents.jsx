import { useAllEventsData } from "../queries/DataQueries";
import EventCards from "../Utils/EventCards";

const FindEvents = () => {
  const { data: allEvents } = useAllEventsData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find Events</h1>
      <p>Find created events here.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {allEvents &&
          allEvents.map((event) => <EventCards key={event.id} event={event} />)}
      </div>
    </div>
  );
};

export default FindEvents;
