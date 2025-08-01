import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../Auth/Firebase";
import { formatApiError, FormError } from "../Utils/EventUtils";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ResetPassword = ({ closeModal }) => {
  const [error, setError] = useState("");

  const handleResetPassword = async (values, { setSubmitting, resetForm }) => {
    setError("");
    const ref = query(
      collection(db, "users"),
      where("email", "==", values.email)
    );

    const actionCodeSettings = {
      url: "https://eventmanagementhub.netlify.app",
      handleCodeInApp: false,
    };

    try {
      const snapshot = await getDocs(ref);

      if (snapshot.empty) {
        setError("No account found with that email address.");
        setSubmitting(false);
        return;
      }

      const auth = getAuth();
      await sendPasswordResetEmail(auth, values.email, actionCodeSettings);
      toast.success("Password reset link sent to your email");

      setTimeout(() => {
        resetForm();
        closeModal();
      }, 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {formatApiError(error)}
              </div>
            )}
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="input"
                placeholder="your_email@example.com"
              />
              <FormError name="email" />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary font-bold"
              disabled={!values.email || isSubmitting}
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
                "Reset Password"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
