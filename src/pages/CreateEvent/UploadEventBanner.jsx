import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormError } from "../../Utils/EventUtils";
import { toast } from "react-toastify";
import { BsCloudArrowUp } from "react-icons/bs";

const bannerSizeLimit = 5 * 1024 * 1024; // 5 MB

const UploadEventImage = ({
  previouStep,
  nextStep,
  eventData,
  updateEventData,
}) => {
  const [fileName, setFileName] = useState("");

  const initialValues = {
    eventBanner: eventData.eventBanner,
  };

  const validationSchema = Yup.object().shape({
    eventBanner: Yup.string().required("An image is required"),
  });

  const handleBannerUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    if (file.size > bannerSizeLimit) {
      toast.error("File must not exceeds 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("eventBanner", reader.result);
      updateEventData({ eventBanner: reader.result });
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateData = (values) => {
    localStorage.setItem(
      "eventData",
      JSON.stringify({ ...eventData, ...values })
    );
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
          const disabled = !values.eventBanner;

          return (
            <Form className="mt-8 max-w-4xl mx-auto space-y-3">
              <h4 className="text-lg text-primary md:pl-44 font-medium">
                Additional Information
              </h4>
              <div className="md:flex gap-4">
                <label className="w-40 text-right font-normal text-base text-primary whitespace-nowrap">
                  Upload Banner
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="md:flex-1 flex items-center gap-3">
                  <input
                    id="eventBanner"
                    type="file"
                    name="eventBanner"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      handleBannerUpload(e, setFieldValue);
                      if (e.target.files.length > 0) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="eventBanner"
                    className="flex items-center w-full justify-center h-36 rounded-md border border-dashed border-primary bg-white text-sm cursor-pointer hover:bg-gray-50 transition"
                  >
                    {fileName ? (
                      <>
                        {fileName} -
                        <span className="text-blue-600 font-semibold ml-1 hover:underline">
                          CHANGE IMAGE
                        </span>
                      </>
                    ) : values.eventBanner ? (
                      <span className="text-blue-600 font-semibold hover:underline">
                        CHANGE IMAGE
                      </span>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <BsCloudArrowUp className="text-3xl text-gray-500 mb-2" />
                        <span className="text-gray-500">
                          Click to upload image (Max size: 5MB, JPG/PNG/GIF)
                        </span>
                      </div>
                    )}
                  </label>

                  <FormError name="eventBanner" />
                </div>
              </div>
              {values.eventBanner && (
                <div className="mt-2 md:pl-44">
                  <img
                    src={values.eventBanner}
                    alt="Event Banner"
                    className="max-w-[200px] max-h-[200px] object-contain rounded-md border border-yellow"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-5">
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
