import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { auth, db } from "../../Auth/Firebase";
import EventModalUtils from "../../Utils/EventModalUtils";
import { formatApiError } from "../../Utils/EventUtils";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const ReviewEvent = ({ previouStep, eventData }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userEventDetails = localStorage.getItem("eventData")
    ? JSON.parse(localStorage.getItem("eventData"))
    : eventData;

  const handleEventSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = userEventDetails || eventData;
      const ref = collection(db, "events");
      await addDoc(ref, {
        ...payload,
        createdAt: Timestamp.now(),
        createdBy: auth.currentUser.uid,
      });
      localStorage.removeItem("eventData");
      await queryClient.invalidateQueries({ queryKey: ["userEvents"] });
      await queryClient.invalidateQueries({ queryKey: ["allEvents"] });
      toast.success("Event created successfully!");
      navigate("/dashboard/my-events");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto py-8 space-y-8">
      <h2 className="text-base text-primary">
        Almost there! Review your event details
      </h2>

      {error && (
        <div className="text-red-500 text-sm">{formatApiError(error)}</div>
      )}
      <EventModalUtils
        Banner={eventData.eventBanner}
        Starttime={eventData.eventStarttime}
        Session={eventData.eventSession}
        Endtime={eventData.eventEndtime}
        Category={eventData.eventCategory}
        Type={eventData.eventType}
        Title={eventData.eventTitle}
        Address={eventData.eventAddress}
        Description={eventData.eventDescription}
      />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={previouStep}
          className="btn btn-yellow font-bold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleEventSubmit}
          className="btn btn-primary font-bold w-40"
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Publish Event"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewEvent;
