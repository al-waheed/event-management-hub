import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError } from "../../Utils/EventUtils";
import { toast } from "react-toastify";

const bannerSizeLimit = 5 * 1024 * 1024; // 5 MB

const UploadEventImage = ({
  previouStep,
  nextStep,
  eventData,
  updateEventData,
}) => {
  const initialValues = {
    eventDescription: eventData.eventDescription,
    eventBanner: eventData.eventBanner,
  };

  const validationSchema = Yup.object().shape({
    eventDescription: Yup.string()
      .required("Event description is required")
      .min(10, "Description must be at least 10 characters"),
    eventBanner: Yup.string().required("An image is required"),
  });

  const handleBannerUpload = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    if (file.size > bannerSizeLimit) {
      toast.error("File exceeds 5MB");
      return;
    }

    setFieldValue("eventBanner", file);
    updateEventData({ eventBanner: file });
    toast.success("Image uploaded!");
  };

  const handleUpdateData = (values) => {
    updateEventData(values);
    nextStep();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateData}
      >
        {({ values, setFieldValue }) => {
          const disabled = !values.eventDescription || !values.eventBanner;
          return (
            <Form className="mt-8 max-w-4xl mx-auto space-y-3">
              <div className="pt-7">
                <h4 className="text-2xl text-primary md:pl-44 pb-3">
                  Aditional Information
                </h4>
                <div className="md:flex gap-4">
                  <label className="w-40 text-right text-base font-normal text-primary">
                    Event Description
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex-1 resize-none">
                    <Field
                      as="textarea"
                      name="eventDescription"
                      className="input h-40"
                      placeholder="Describe the event in detail..."
                    />
                    <FormError name="eventDescription" />
                  </div>
                </div>
              </div>

              <div className="md:flex items-center gap-4">
                <label className="w-40 text-right font-normal text-sm text-primary whitespace-nowrap">
                  Upload Banner{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="w-full md:flex-1">
                  <input
                    type="file"
                    name="eventBanner"
                    className="input"
                    accept="image/*"
                    onChange={(e) => handleBannerUpload(e, setFieldValue)}
                  />
                  <FormError name="eventBanner" />
                </div>
              </div>

              <div className="flex md:justify-end gap-4 pt-5">
                <button
                  type="button"
                  onClick={previouStep}
                  className="btn btn-yellow font-bold"
                >
                  Back
                </button>
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
export default UploadEventImage;
