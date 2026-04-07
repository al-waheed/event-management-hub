import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  MdOutlineTitle,
  MdCategory,
  MdOutlineDateRange,
  MdAccessTime,
  MdLocationOn,
  MdDescription,
} from "react-icons/md";
import { FormError, listOfEvent } from "../../Utils/EventUtils";

const CreateEvent = ({ nextStep, eventData, updateEventData }) => {
  const initialValues = {
    eventTitle: eventData.eventTitle,
    eventCategory: eventData.eventCategory,
    eventType: eventData.eventType,
    eventSession: eventData.eventSession,
    eventStarttime: eventData.eventStarttime,
    eventEndtime: eventData.eventEndtime,
    eventAddress: eventData.eventAddress,
    eventDescription: eventData.eventDescription,
  };

  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string()
      .required("Event title is required")
      .min(3, "Title must be at least 3 characters"),
    eventCategory: Yup.string().required("Please select an event category"),
    eventType: Yup.string().required(
      "Please choose event type (single/recurring)"
    ),
    eventSession: Yup.string().required("Please select event session"),
    eventStarttime: Yup.string().required("Start time is required"),
    eventEndtime: Yup.string().test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        if (!value) return true;
        return (
          new Date(`1970-01-01T${value}`) >
          new Date(`1970-01-01T${this.parent.eventStarttime}`)
        );
      }
    ),
    eventAddress: Yup.string()
      .required("Event address is required")
      .min(5, "Address must be more descriptive"),
    eventDescription: Yup.string()
      .required("Event description is required")
      .min(10, "Description must be at least 10 characters"),
  });

  const handleCreatEvent = (values) => {
    updateEventData(values);
    nextStep();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreatEvent}
      >
        {({ values }) => {
          const disabled =
            !values.eventDescription ||
            !values.eventTitle ||
            !values.eventCategory ||
            !values.eventType ||
            !values.eventSession ||
            !values.eventStarttime ||
            !values.eventAddress;

          return (
            <Form className="mt-8 max-w-2xl mx-auto space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdOutlineTitle className="text-lg" />
                  Event Details
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="eventTitle"
                    type="text"
                    className="input"
                    placeholder="Enter name of your event"
                  />
                  <FormError name="eventTitle" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Event Category <span className="text-red-500">*</span>
                  </label>
                  <Field as="select" name="eventCategory" className="input">
                    {listOfEvent.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <FormError name="eventCategory" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdOutlineDateRange className="text-lg" />
                  Date & Time
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 relative cursor-pointer">
                      <Field
                        type="radio"
                        name="eventType"
                        value="single"
                        className="peer sr-only"
                      />
                      <div className="p-3 rounded-xl border border-gray-200 text-center text-sm font-medium text-gray-500 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition">
                        Single Event
                      </div>
                    </label>
                    <label className="flex-1 relative cursor-pointer">
                      <Field
                        type="radio"
                        name="eventType"
                        value="recurring"
                        className="peer sr-only"
                      />
                      <div className="p-3 rounded-xl border border-gray-200 text-center text-sm font-medium text-gray-500 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition">
                        Recurring Event
                      </div>
                    </label>
                  </div>
                  <FormError name="eventType" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="eventSession"
                      type="date"
                      className="input"
                    />
                    <FormError name="eventSession" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="eventStarttime"
                      type="time"
                      className="input"
                    />
                    <FormError name="eventStarttime" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">
                      End Time
                    </label>
                    <Field
                      name="eventEndtime"
                      type="time"
                      className="input"
                    />
                    <FormError name="eventEndtime" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdLocationOn className="text-lg" />
                  Location
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Event Address <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="eventAddress"
                    type="text"
                    className="input"
                    placeholder="Enter your event address location"
                  />
                  <FormError name="eventAddress" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdDescription className="text-lg" />
                  Description
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">
                    Event Description <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    name="eventDescription"
                    className="input h-28 resize-none"
                    placeholder="Describe the event in detail..."
                  />
                  <FormError name="eventDescription" />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={disabled}
                  className="btn btn-primary font-bold px-8"
                >
                  Continue
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateEvent;
