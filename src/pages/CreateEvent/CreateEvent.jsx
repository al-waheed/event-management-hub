import { useState, useEffect } from "react";
import CreateEventDetails from "./CreateEventDetails";
import UploadEventBanner from "./UploadEventBanner";
import ReviewEvent from "./ReviewEvent";
import EventStepper from "../../Utils/EventStepper";

const CreateEvent = () => {
  const [step, setStep] = useState(0);
  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventCategory: "",
    eventType: "",
    eventSession: "",
    eventStarttime: "",
    eventEndtime: "",
    eventAddress: "",
    eventDescription: "",
    eventVisibility: "public",
    eventBanner: "",
  });

  const updateEventData = (newData) => {
    setEventData((prev) => {
      const updatedData = { ...prev, ...newData };
      localStorage.setItem("eventData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const nextStep = () => {
    setStep((next) => next + 1);
  };

  const previouStep = () => {
    setStep((prev) => prev - 1);
  };

  const stepLabels = ["Details", "Banner & Visibility", "Review"];

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-primary">Create a New Event</h1>
        <div className="flex items-center gap-2 mt-4">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i <= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i <= step ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded ${
                    i < step ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {step === 0 && (
        <CreateEventDetails
          nextStep={nextStep}
          eventData={eventData}
          updateEventData={updateEventData}
        />
      )}
      {step === 1 && (
        <UploadEventBanner
          nextStep={nextStep}
          previouStep={previouStep}
          eventData={eventData}
          updateEventData={updateEventData}
        />
      )}
      {step === 2 && (
        <ReviewEvent previouStep={previouStep} eventData={eventData} />
      )}
    </div>
  );
};

export default CreateEvent;
