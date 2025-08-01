import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Auth/Firebase";
import { Timestamp } from "firebase/firestore";
import { formatApiError } from "../../Utils/EventUtils";
import { useDispatch } from "react-redux";
import { setAddEvent } from "../../redux/EventSlice";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const ReviewEvent = ({ previouStep, eventData }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEventSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        ref,
        {
          event: {
            ...eventData,
            createdAt: Timestamp.now(),
          },
        },
        { merge: true }
      );
      dispatch(setAddEvent(eventData))
      setLoading(false);
      toast.success("Event created successfully!");
      navigate("/dashboard/my-events");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(()=>{
    console.log("evendate",eventData)
  },[eventData])

  return (
    <div className="space-y-4">
      <h4 className="text-2xl text-primary">
        Near there!, Check everything's correct.
      </h4>
      {error && (
        <div className="text-red-500 text-sm mb-4">{formatApiError(error)}</div>
      )}

      <div className="flex justify-end gap-4 mt-6">
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
          className="btn btn-primary font-bold"
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
