import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";
import { toast } from "react-toastify";
import {
  formatApiError,
  generateCode,
  FormError,
  togglePassword,
} from "../Utils/EventUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import { send } from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";

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
  const { show, toggle } = togglePassword();

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
              {formatApiError(error)}
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
              placeholder="e.g Ibrahim Tanko"
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
              placeholder="your_email@example.com"
            />
            <FormError name="email" />
          </div>

          <div className="relative">
            <label htmlFor="password" className="label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type={show ? "text" : "password"}
              className="input"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={toggle}
              className="absolute right-3 top-10 text-primary hover:text-primary-hover text-[16px]"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
            <FormError name="password" />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary font-bold"
            disabled={isSubmitting}
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
              "Sign Up"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
