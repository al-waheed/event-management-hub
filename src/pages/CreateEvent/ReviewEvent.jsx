import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Auth/Firebase";
import { Timestamp } from "firebase/firestore";
import { formatApiError } from "../../Utils/EventUtils";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/EventSlice";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const ReviewEvent = ({ previouStep, eventData }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userEventDetails = useSelector((state) => state.event.addEvent);
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
      dispatch(setUserData(eventData));
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
      <div className="rounded-2xl border-2 border-primary p-6">
        <div className=" overflow-hidden">
          <div className="w-full h-96">
            {userEventDetails.eventBanner ? (
              <img
                src={userEventDetails.eventBanner}
                alt="Event Banner"
                className="w-full h-full object-cover rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Banner Image Placeholder
              </div>
            )}
          </div>

          <div className="py-6 space-y-6">
            <h1 className="text-2xl font-extrabold text-primary">
              {userEventDetails.eventTitle}
            </h1>

            <div className="flex justify-between flex-col md:flex-row w-full text-primary">
              <div className="w-full md:w-1/2">
                <h4 className="font-semibold mb-2">Date and Time</h4>
                <p>📅 {userEventDetails.eventSession}</p>
                <p>⏰ {userEventDetails.eventStarttime}</p>
                <a
                  href="#"
                  className="text-sm text-blue-600 underline block mt-1"
                >
                  + Add to Calendar
                </a>
              </div>
              <div className="">
                <h4 className="font-semibold mb-2 ">Category / Type</h4>
                <p>📌 {userEventDetails.eventCategory}</p>
                <p>🧾 {userEventDetails.eventType}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-primary">Location</h4>
              <p>📍 {userEventDetails.eventAddress}</p>
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
                      {userEventDetails?.hostName || "Fidel Castro"}
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
                {userEventDetails.eventDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

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
