import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError, listOfEvent } from "../Utils/EventUtils";

const initialValues = {};

const validationSchema = Yup.object().shape({});

const CreateEvent = () => {
  const [eventType, setEventType] = useState("single");

  const handleCreatEvent = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className="text-3xl text-primary">
        <h1 className="font-bold">Create a New Event</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreatEvent}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 max-w-4xl mx-auto space-y-6">
            <h4 className="text-2xl text-primary pl-44">Event Details</h4>
            <div className="flex items-center gap-4">
              <label className="w-40 text-right font-normal text-base text-primary whitespace-nowrap">
                Event Title <span className="text-red-500 font-bold">*</span>
              </label>
              <Field
                id="eventtitle"
                name="eventtitle"
                type="text"
                className="input flex-1"
                placeholder="Enter name of your event"
              />
              <FormError name="eventtitle" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="w-40 text-right whitespace-nowrap text-base font-normal text-primary">
                Event Category <span className="text-red-500 font-bold">*</span>
              </label>
              <Field as="select" name="eventcategory" className="input flex-1">
                {listOfEvent.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <FormError name="eventtitle" />
            </div>
            <div className="pt-7">
              <h4 className="text-2xl text-primary pl-44 pb-3">Date & Time</h4>
              <div className="flex items-center gap-4 pt-2">
                <label className="w-40 text-right whitespace-nowrap text-base font-normal text-primary">
                  Event Type <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex items-center gap-10">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="eventType"
                      value="single"
                      checked={eventType === "single"}
                      onChange={() => setEventType("single")}
                      className="appearance-none h-3 w-3 rounded-full border border-[#2B293D] checked:bg-[#2B293D] checked:ring-2 checked:ring-offset-1 ring-[#2B293D]"
                    />
                    <span className="text-primary text-base font-medium">
                      Single Event
                    </span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="eventType"
                      value="recurring"
                      checked={eventType === "recurring"}
                      onChange={() => setEventType("recurring")}
                      className="appearance-none h-3 w-3 rounded-full border border-[#2B293D] checked:bg-[#2B293D] checked:ring-2 checked:ring-offset-1 ring-[#2B293D]"
                    />
                    <span className="text-primary text-base font-medium">
                      Recurring Event
                    </span>
                  </label>
                </div>
              </div>
              <FormError name="eventtype" />
            </div>
            <div className="flex  gap-4 pt-1">
              <label className="w-40 text-right whitespace-nowrap text-base font-normal text-primary">
                Session(s) <span className="text-red-500 font-bold">*</span>
              </label>
              <div>
                <label>
                  Start Date <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  id="eventsession"
                  name="eventsession"
                  type="date"
                  className="input flex-1"
                  placeholder="Enter name of your event"
                />
                <FormError name="eventsession" />
              </div>
              <div>
                <label>
                  Start Time <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  id="eventtarttime"
                  name="eventstarttime"
                  type="time"
                  className="input flex-1"
                  placeholder="Enter name of your event"
                />
                <FormError name="eventstarttime" />
              </div>
              <div>
                <label>
                  End Time <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  id="eventendtime"
                  name="eventendtime"
                  type="time"
                  className="input flex-1"
                  placeholder="Enter name of your event"
                />
                <FormError name="eventendtime" />
              </div>
            </div>
            <div className="pt-7">
              <h4 className="text-2xl text-primary pl-44 pb-3">Address</h4>
              <div className="flex items-center gap-4">
                <label className="w-40 text-right text-base font-normal text-primary">
                  Where will your event take place
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  id="eventaddress"
                  name="eventaddress"
                  type="text"
                  className="input flex-1"
                  placeholder="Enter your event address location"
                />
                <FormError name="eventaddress" />
              </div>
            </div>
            <div className="pt-7">
              <h4 className="text-2xl text-primary pl-44 pb-3">
                Aditional Information
              </h4>
              <div className="flex gap-4">
                <label className="w-40 text-right text-base font-normal text-primary">
                  Event Description
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  id="description"
                  as="textarea"
                  name="eventdescription"
                  className="input flex-1 resize-none h-40"
                  placeholder="Describe the event in detail..."
                />
                <FormError name="eventdescription" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary font-bold">
                Save & Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
 
export default CreateEvent;
