import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth, db } from "../Auth/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { formatError, generateCode } from "../Utils/EventUtils";
import { useNavigate } from "react-router-dom";
import { useCountdownTimer } from "../hook/useCountdownTimer";
import { FormError } from "../Utils/FormError";
import { send } from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const VerifyEmail = () => {
  const [error, setError] = useState("");
  const { formattedTime, isExpired, reset } = useCountdownTimer(300);
  const navigate = useNavigate();

  const emailVerification = async (values, { setSubmitting }) => {
    setError("");
    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      const savedCode = snap.data().code;

      if (values.code === savedCode) {
        await updateDoc(ref, {
          emailVerified: true,
          code: "",
        });
        toast.success("Email verified!");
        navigate("/dashboard");
      } else {
        setError("Invalid verification code");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isExpired) {
      const clearCode = async () => {
        try {
          const ref = doc(db, "users", auth.currentUser.uid);
          await updateDoc(ref, { code: "" });
        } catch (e) {
          console.log(e);
        }
      };
      clearCode();
    }
  }, [isExpired]);

  const handleResendCode = async () => {
    setError("");
    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      const userData = snap.data();
      const code = generateCode();

      await updateDoc(ref, { code });

      await send(
        serviceId,
        templateId,
        {
          user_name: userData.fullname,
          user_email: userData.email,
          code,
        },
        publicKey
      );
      toast.success("Verification code resent to your email!");
      reset();
    } catch (e) {
      setError("Failed to resend code.");
    }
  };

  return (
    <Formik
      initialValues={{ code: "" }}
      validationSchema={Yup.object({
        code: Yup.string().length(6).required("Code is required"),
      })}
      onSubmit={emailVerification}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {formatError(error)}
            </div>
          )}
          <div>
            <label className="label">Enter 6-digit Code</label>
            <Field name="code" className="input" />
            <FormError name="code" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
          <p className="text-sm text-gray-600 text-center">
            {isExpired ? (
              <button
                type="button"
                className="w-full text-primary-600 hover:text-primary-700 focus:outline-none"
                onClick={handleResendCode}
              >
                Resend Code
              </button>
            ) : (
              `Resend code in: ${formattedTime}`
            )}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyEmail;
