import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";
import { toast } from "react-toastify";
import { formatError, generateCode } from "../Utils/EventUtils";
import { FormError } from "../Utils/FormError";
import { Timestamp } from "firebase/firestore";
import { send } from "emailjs-com";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const signUpValues = {
  fullname: "",
  email: "",
  password: "",
};

const signUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const SignUpForm = ({ onSwitch, setEmail }) => {
  const [error, setError] = useState("");

  const handleSignUpSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");
    try {
      const { email, password, fullname } = values;
      const code = generateCode();
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          fullname,
          email,
          code,
          emailVerified: false,
          createdAt: Timestamp.now(),
        });

        await send(
          serviceId,
          templateId,
          {
            user_name: fullname,
            user_email: email,
            code,
          },
          publicKey
        );
        onSwitch("verification");
        setEmail(email);
        toast.success("Verification code sent to your email!");
      }
      resetForm();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={signUpValues}
      validationSchema={signUpSchema}
      onSubmit={handleSignUpSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {formatError(error)}
            </div>
          )}
          <div>
            <label htmlFor="fullname" className="label">
              Full Name
            </label>
            <Field
              id="fullname"
              name="fullname"
              type="text"
              className="input"
              placeholder="John Doe"
            />
            <FormError name="fullname" />
          </div>

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

          <button
            type="submit"
            className="w-full btn btn-primary py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
