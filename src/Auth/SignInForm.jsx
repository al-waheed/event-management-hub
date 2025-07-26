import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../Auth/Firebase";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordModal from "../modal/ForgotPasswordModal";
import {
  formatApiError,
  generateCode,
  FormError,
  togglePassword,
} from "../Utils/EventUtils";
import { send } from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";

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

const SignInForm = ({ onSwitch, setEmail }) => {
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { show, toggle } = togglePassword();
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

      try {
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
          setEmail(userData.email);
          toast.info("Please enter code sent to your email for verification.");
          return;
        }
      } catch (e) {
        console.log(e);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Formik
        initialValues={signInValues}
        validationSchema={SignInSchema}
        onSubmit={handleSignInSubmit}
      >
        {({ isSubmitting }) => (
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

            <div className="flex justify-end">
              <p
                className="text-sm text-primary hover:text-primary-hover cursor-pointer"
                onClick={toggleModal}
              >
                Forgot password?
              </p>
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
                "Log In"
              )}
            </button>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <ForgotPasswordModal isOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </>
  );
};

export default SignInForm;
