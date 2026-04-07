import { useState } from "react";
import MyCreatedEvents from "./MyCreatedEvents";
import AttendingEvents from "./AttendingEvents";

const tabs = ["My Created Events", "Events I'm Attending"];

const EventLists = ({ userEvents, attendingEvents }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "My Created Events" && (
          <MyCreatedEvents userEvents={userEvents} />
        )}
        {activeTab === "Events I'm Attending" && (
          <AttendingEvents attendingEvents={attendingEvents} />
        )}
      </div>
    </div>
  );
};

export default EventLists;
