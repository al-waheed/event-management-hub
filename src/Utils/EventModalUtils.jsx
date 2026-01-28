import React from "react";

const EventModalUtils = (props) => {
  const {
    Banner,
    Starttime,
    Session,
    Endtime,
    Category,
    Type,
    Title,
    Address,
    Description,
  } = props;
  return (
    <div className="rounded-2xl border-2 border-primary p-6">
      <div className="overflow-hidden">
        <div className="w-full h-96">
          {Banner && (
            <img
              src={Banner}
              alt="Event Banner"
              className="w-full h-full object-cover rounded-t-2xl"
            />
          )}
        </div>

        <div className="py-6 space-y-6">
          <h1 className="text-2xl font-extrabold text-primary uppercase">
            {Title}
          </h1>

          <div className="flex justify-between flex-col md:flex-row w-full text-primary">
            <div className="w-full md:w-1/2">
              <h4 className="font-semibold mb-2">Date and Time</h4>
              <p>📅 {Session}</p>
              <p>⏰ Start Time - {Starttime}</p>
              <p>⏰ End Time - {Endtime || null}</p>
              <a
                href="#"
                className="text-sm text-blue-600 underline block mt-1"
              >
                + Add to Calendar
              </a>
            </div>
            <div className="capitalize">
              <h4 className="font-semibold mb-2">Category / Type</h4>
              <p>📌 {Category}</p>
              <p>🧾 {Type}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-primary capitalize">
              Location
            </h4>
            <p>📍 {Address}</p>
            <div className="bg-gray-200 w-full h-48 rounded-md flex items-center justify-center mt-2">
              <span className="text-gray-500">Map Placeholder</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-primary">Hosted by</h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-4 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <div>
                  <p className="text-gray-900 font-medium">
                    {"Fidel Castro"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 text-sm border border-primary-hover text-primary rounded">
                      Contact
                    </button>
                    <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-hover">
                      + Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-primary">
              Event Description
            </h4>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {Description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventModalUtils;
