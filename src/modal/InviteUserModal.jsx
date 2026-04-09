import { useState } from "react";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { send } from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { db } from "../Auth/Firebase";
import { FaTimes, FaPlus } from "react-icons/fa";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

    try {
      if (!event?.id) {
        setError("Invalid event selected");
        return;
      }

      const normalizedEmails = values.emails
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

      if (!normalizedEmails.length) {
        setError("Please enter at least one valid email.");
        return;
      }

      // 🔹 STEP 1: Check existing invites from collection (NOT event.invites)
      const existingQuery = query(
        collection(db, "invites"),
        where("eventId", "==", event.id),
      );

      const existingSnap = await getDocs(existingQuery);

      const existingEmails = existingSnap.docs.map((doc) =>
        doc.data().email.toLowerCase(),
      );

      // 🔹 STEP 2: Check duplicates
      const duplicates = normalizedEmails.filter((email) =>
        existingEmails.includes(email),
      );
      const emailsToInvite = normalizedEmails.filter(
        (email) => !existingEmails.includes(email),
      );

      if (!emailsToInvite.length) {
        setError(`Already invited: ${duplicates.join(", ")}`);
        return;
      }

      // 🔹 STEP 3: Create invites in collection (IMPORTANT CHANGE)
      for (const email of emailsToInvite) {
        await addDoc(collection(db, "invites"), {
          eventId: event.id, // 🔥 LINK TO EVENT
          email,
          status: "pending",
          invitedAt: Timestamp.now(),
          invitedBy: userDetails?.id || null,
        });
      }

      // 🔹 STEP 4: Send emails (unchanged)
      for (const email of emailsToInvite) {
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

      // 🔹 STEP 5: Refresh queries
      await queryClient.invalidateQueries({ queryKey: ["userEvents"] });
      await queryClient.invalidateQueries({ queryKey: ["userInvites"] });

      toast.success(
        `Invites sent successfully to ${emailsToInvite.length} user(s)!`,
      );
      if (duplicates.length) {
        toast.info(
          `${duplicates.length} email(s) skipped because they were already invited.`,
        );
      }

      resetForm();
      toggleModal();
    } catch (err) {
      if (err?.code === "permission-denied") {
        setError(
          "Missing or insufficient Firestore permissions for invites. Please update rules for the invites collection.",
        );
      } else {
        setError(err.message);
      }
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
