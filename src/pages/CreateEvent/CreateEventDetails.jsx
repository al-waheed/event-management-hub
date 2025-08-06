import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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
            !values.eventTitle ||
            !values.eventCategory ||
            !values.eventType ||
            !values.eventSession ||
            !values.eventStarttime ||
            !values.eventAddress;

          return (
            <Form className="mt-14 max-w-4xl mx-auto space-y-3 h-full">
              <h4 className="text-xl text-primary md:pl-44">Event Details</h4>

              <div className="md:flex items-center gap-4">
                <label className="w-40 text-right font-normal text-sm text-primary whitespace-nowrap">
                  Event Title <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="w-full md:flex-1">
                  <Field
                    name="eventTitle"
                    type="text"
                    className="input"
                    placeholder="Enter name of your event"
                  />
                  <FormError name="eventTitle" />
                </div>
              </div>

              <div className="md:flex items-center gap-4 pt-2">
                <label className="w-40 text-right whitespace-nowrap text-sm font-normal text-primary">
                  Event Category{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="w-full md:flex-1">
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

              <div className="pt-7">
                <h4 className="text-xl text-primary md:pl-44 pb-1">
                  Date & Time
                </h4>
                <div className="md:flex items-center gap-4 pt-2">
                  <label className="w-40 text-right whitespace-nowrap text-sm font-normal text-primary">
                    Event Type <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex items-center gap-10">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <Field
                        type="radio"
                        name="eventType"
                        value="single"
                        className="appearance-none h-3 w-3 rounded-full border border-[#2B293D] checked:bg-[#2B293D] checked:ring-2 checked:ring-offset-1 ring-[#2B293D]"
                      />
                      <span className="text-primary text-sm font-medium">
                        Single Event
                      </span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <Field
                        type="radio"
                        name="eventType"
                        value="recurring"
                        className="appearance-none h-3 w-3 rounded-full border border-[#2B293D] checked:bg-[#2B293D] checked:ring-2 checked:ring-offset-1 ring-[#2B293D]"
                      />
                      <span className="text-primary text-sm font-medium">
                        Recurring Event
                      </span>
                    </label>
                  </div>
                  <FormError name="eventType" />
                </div>
              </div>

              <div className="md:flex gap-4 pt-2">
                <label className="w-40 text-right whitespace-nowrap text-sm font-normal text-primary">
                  Session(s) <span className="text-red-500 font-bold">*</span>
                </label>
                <div>
                  <label className="text-sm text-primary">
                    Start Date <span className="text-red-500 font-bold">*</span>
                  </label>
                  <Field
                    name="eventSession"
                    type="date"
                    className="input flex-1"
                    placeholder="Enter name of your event"
                  />
                  <FormError name="eventSession" />
                </div>
                <div>
                  <label className="text-sm text-primary">
                    Start Time <span className="text-red-500 font-bold">*</span>
                  </label>
                  <Field
                    name="eventStarttime"
                    type="time"
                    className="input flex-1"
                    placeholder="Enter name of your event"
                  />
                  <FormError name="eventStarttime" />
                </div>
                <div>
                  <label className="text-sm text-primary">End Time</label>
                  <Field
                    name="eventEndtime"
                    type="time"
                    className="input flex-1"
                    placeholder="Enter name of your event"
                  />
                  <FormError name="eventEndtime" />
                </div>
              </div>

              <div className="pt-5">
                <h4 className="text-xl text-primary md:pl-44 pb-1">Address</h4>
                <div className="md:flex items-center gap-4">
                  <label className="w-40 text-right text-sm font-normal text-primary">
                    Where will your event take place
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="w-full md:flex-1">
                    <Field
                      name="eventAddress"
                      type="text"
                      className="input"
                      placeholder="Enter your event address location"
                    />
                    <FormError name="eventAddress" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={disabled}
                  className="btn btn-primary font-bold"
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
