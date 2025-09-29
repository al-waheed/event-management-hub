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

  return (
    <div>
      <div className="text-3xl text-primary w-full md:px-10">
        <h1 className="font-bold">Create a New Event</h1>
        {/* <EventStepper currentStep={step + 1} /> */}
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
