import { useState } from "react";
import MyCreatedEvents from "./MyCreatedEvents";
import AttendingEvents from "./AttendingEvents";

const tabs = ["My Created Events", "Event I'm Attending"];

const EventLists = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="text-xl font-medium text-center text-primary border-b border-primary-hover">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li className="me-2" key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-primary-hover border-primary-hover font-semibold"
                    : "border-transparent hover:text-primary-hover"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {activeTab === "My Created Events" && <MyCreatedEvents />}
        {activeTab === "Event I'm Attending" && <AttendingEvents />}
      </div>
    </div>
  );
};

export default EventLists;
