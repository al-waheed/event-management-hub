import { useState } from "react";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { send } from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { db } from "../Auth/Firebase";
import { FaTimes, FaPlus } from "react-icons/fa";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import {
  serviceInviteId,
  templateInviteId,
  publicKey,
} from "../Utils/EmailJsService";
import { formatApiError, FormError } from "../Utils/EventUtils";
import { useUserData } from "../queries/DataQueries";
import { useQueryClient } from "@tanstack/react-query";

const InviteUserSchema = Yup.object().shape({
  emails: Yup.array()
    .of(
      Yup.string().email("Invalid email format").required("Email is required"),
    )
    .min(1, "At least one email is required"),
});

const InviteUserModal = ({ openInviteModal, toggleModal, event }) => {
  const { data: userDetails } = useUserData();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const handleInviteUser = async (values, { resetForm, setSubmitting }) => {
    setError("");
    setSubmitting(true);

    const existingEmails = (event?.invites || []).map((inv) => inv.email.toLowerCase());
    const duplicates = values.emails.filter((email) =>
      existingEmails.includes(email.toLowerCase())
    );

    if (duplicates.length > 0) {
      setError(`Already invited: ${duplicates.join(", ")}`);
      setSubmitting(false);
      return;
    }

    const newInvites = values.emails.map((email) => ({
      email,
      status: "pending",
      invitedAt: Timestamp.now(),
    }));

    const updatedInvites = event?.invites
      ? [...event.invites, ...newInvites]
      : newInvites;

    try {
      const ref = doc(db, "events", event.id);
      await updateDoc(ref, { invites: updatedInvites });

      for (const email of values.emails) {
        await send(
          serviceInviteId,
          templateInviteId,
          {
            to_email: email,
            event_title: event.eventTitle,
            inviter_name: userDetails?.fullname,
            event_date: event.eventDate,
            event_address: event.eventAddress,
          },
          publicKey,
        );
      }
      await queryClient.invalidateQueries({ queryKey: ["userEvents"] });
      toast.success(
        `Invites sent successfully to ${values.emails.length} user(s)!`,
      );
      resetForm();
      toggleModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {openInviteModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={toggleModal}
              className="absolute top-5 right-3 text-primary hover:text-red-600 transition"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-semibold mb-2 text-primary">
              Invite Users to{" "}
              <span className="text-primary font-bold">
                {event?.eventTitle}
              </span>
            </h2>
            <p className="text-gray-500 mb-4 text-sm">
              Add one or more email addresses to invite participants.
            </p>

            <Formik
              initialValues={{ emails: [""] }}
              validationSchema={InviteUserSchema}
              onSubmit={handleInviteUser}
              validateOnBlur={true}
              validateOnChange={false}
            >
              {({ values, errors, touched, isSubmitting }) => {
                const allEmpty = values.emails.every((e) => e.trim() === "");

                return (
                  <Form className="space-y-4">
                    {error && (
                      <div className="text-red-500 text-sm mb-4">
                        {formatApiError(error)}
                      </div>
                    )}

                    <FieldArray name="emails">
                      {({ push, remove }) => (
                        <div className="space-y-3">
                          {values.emails.map((email, i) => (
                            <div
                              key={i}
                              className="flex flex-col gap-1 border rounded-lg p-2"
                            >
                              <div className="flex items-center gap-2">
                                <Field
                                  name={`emails[${i}]`}
                                  type="email"
                                  placeholder="Enter email"
                                  className="flex-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                                />
                                {values.emails.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(i)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTimes size={14} />
                                  </button>
                                )}
                              </div>
                              {touched.emails?.[i] && errors.emails?.[i] && (
                                <FormError error={errors.emails[i]} />
                              )}
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => push("")}
                            className="flex items-center text-primary hover:text-primary-hover text-sm font-medium"
                          >
                            <FaPlus className="mr-1" /> Add another
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    <button
                      type="submit"
                      className="w-full btn btn-primary font-bold focus:outline-none"
                      disabled={allEmpty || isSubmitting}
                    >
                      {isSubmitting ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="25"
                          radius="9"
                          color="#ffffff"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "Send Invites"
                      )}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InviteUserModal;
