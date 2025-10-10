import { useState } from "react";
import MyCreatedEvents from "./MyCreatedEvents";
import AttendingEvents from "./AttendingEvents";
import { useUserData } from "../../queries/UserQueries";

const tabs = ["My Created Events", "Event I'm Attending"];

const EventLists = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data: userData, isLoading } = useUserData();
  const createdEvents = userData?.events || [];

  return (
    <div>
      <div className="text-lg font-medium text-center text-primary">
        <ul className="flex flex-wrap -mb-px pl-4">
          {tabs.map((tab) => (
            <li className="me-2" key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`inline-block pb-2 border-b-2 rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-primary-hover border-primary-hover font-bold"
                    : "border-transparent hover:text-primary-hover font-medium"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {activeTab === "My Created Events" && (
          <MyCreatedEvents createdEvents={createdEvents} />
        )}
        {activeTab === "Event I'm Attending" && <AttendingEvents />}
      </div>
    </div>
  );
};

export default EventLists;
