import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";
import { toast } from "react-toastify";
import { formatError, generateCode } from "../Utils/EventUtils";
import { FormError } from "../Utils/FormError";
import { send } from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const signInValues = { email: "", password: "" };

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const SignInForm = ({ onSwitch }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignInSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");
    try {
      const { email, password } = values;
      const userDetails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userDetails.user;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const userData = snap.data();

      if (!userData?.emailVerified) {
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
        onSwitch("verification");
        toast.info("Please verify your email to continue.");
        return;
      }
      navigate("/dashboard");
      toast.success("Logged in successfully!");
      resetForm();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={signInValues}
      validationSchema={SignInSchema}
      onSubmit={handleSignInSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {formatError(error)}
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
              placeholder="you@example.com"
            />
            <FormError name="email" />
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
            />
            <FormError name="password" />
          </div>

          <div className="flex justify-end">
            <a
              href="#forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
