import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { formatApiError, FormError } from "../../Utils/EventUtils";
import { BsCloudArrowUp } from "react-icons/bs";
import { MdImage, MdOutlinePublic, MdLock } from "react-icons/md";
import { toast } from "react-toastify";

const bannerSizeLimit = 5 * 1024 * 1024; // 5 MB

const UploadEventImage = ({
  previouStep,
  nextStep,
  eventData,
  updateEventData,
}) => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const initialValues = {
    eventBanner: eventData.eventBanner,
    eventVisibility: eventData.eventVisibility || "public",
  };

  const validationSchema = Yup.object().shape({
    eventBanner: Yup.string().required("An image is required"),
    eventVisibility: Yup.string()
      .oneOf(["public", "private"], "Please select event visibility")
      .required("Please select event visibility"),
  });

  const handleBannerUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    if (file.size > bannerSizeLimit) {
      toast.error("File must not exceed 5MB");
      return;
    }

    const previewBanner = URL.createObjectURL(file);
    setPreviewUrl(previewBanner);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "event_banner_upload");
      formData.append("folder", "eventBanners");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      console.log("Cloudinary response:", data);

      if (!data.secure_url) {
        throw new Error(data.error?.message || "Upload failed");
      }

      setFieldValue("eventBanner", data.secure_url);
      updateEventData({ eventBanner: data.secure_url });

      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateData = (values) => {
    if (isUploading) {
      toast.info("Please wait for the image to finish uploading.");
      return;
    }
    const finalValues = {
      ...values,
      eventBanner: eventData.eventBanner || values.eventBanner,
    };
    localStorage.setItem(
      "eventData",
      JSON.stringify({ ...eventData, ...finalValues }),
    );
    updateEventData(finalValues);
    nextStep();
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-sm mb-2">{formatApiError(error)}</div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdateData}
      >
        {({ values, setFieldValue }) => {
          const disabled =
            !values.eventBanner || !values.eventVisibility || isUploading;

          return (
            <Form className="mt-8 max-w-2xl mx-auto space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdImage className="text-lg" />
                  Event Banner
                </h4>

                <div className="space-y-3">
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

                  {previewUrl || values.eventBanner ? (
                    <div className="relative group">
                      <img
                        src={previewUrl || values.eventBanner}
                        alt="Event Banner"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <label
                        htmlFor="eventBanner"
                        className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      >
                        <span className="text-white text-sm font-semibold">
                          Change Image
                        </span>
                      </label>
                      {isUploading && (
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary px-3 py-1 rounded-full">
                          Uploading...
                        </div>
                      )}
                    </div>
                  ) : (
                    <label
                      htmlFor="eventBanner"
                      className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm cursor-pointer hover:border-primary hover:bg-primary/5 transition"
                    >
                      <BsCloudArrowUp className="text-3xl text-gray-400 mb-2" />
                      <span className="text-gray-500 font-medium">
                        Click to upload banner image
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        Max size: 5MB &middot; JPG, PNG, GIF
                      </span>
                    </label>
                  )}

                  {fileName && !previewUrl && !values.eventBanner && (
                    <p className="text-xs text-gray-400">{fileName}</p>
                  )}
                  <FormError name="eventBanner" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                  <MdOutlinePublic className="text-lg" />
                  Event Visibility
                </h4>

                <div className="flex items-center gap-4">
                  <label className="flex-1 relative cursor-pointer">
                    <Field
                      type="radio"
                      name="eventVisibility"
                      value="public"
                      className="peer sr-only"
                    />
                    <div className="p-4 rounded-xl border border-gray-200 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition">
                      <MdOutlinePublic className="text-2xl mx-auto mb-1 text-gray-400 peer-checked:text-primary" />
                      <p className="text-sm font-semibold text-gray-600">
                        Public
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Anyone can join
                      </p>
                    </div>
                  </label>
                  <label className="flex-1 relative cursor-pointer">
                    <Field
                      type="radio"
                      name="eventVisibility"
                      value="private"
                      className="peer sr-only"
                    />
                    <div className="p-4 rounded-xl border border-gray-200 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition">
                      <MdLock className="text-2xl mx-auto mb-1 text-gray-400 peer-checked:text-primary" />
                      <p className="text-sm font-semibold text-gray-600">
                        Private
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Invite only
                      </p>
                    </div>
                  </label>
                </div>
                <FormError name="eventVisibility" />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={previouStep}
                  className="px-6 py-2.5 text-sm font-semibold border border-gray-200 text-primary rounded-xl hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={disabled}
                  className="btn btn-primary font-bold px-8"
                >
                  {isUploading ? "Uploading..." : "Continue"}
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
