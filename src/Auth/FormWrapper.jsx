import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import VerifyEmail from "./VerifyEmail";

const FormWrapper = () => {
  const [step, setStep] = useState("signup");
  const [userEmail, setUserEmail] = useState("");

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {step === "signup"
            ? "Create your account"
            : step === "verification"
            ? "Verify Your Email"
            : "Welcome back"}
        </h2>

        <p className="text-gray-600 text-center mb-6">
          {step === "signup"
            ? "Sign up to start managing your events"
            : step === "verification"
            ? "Check your email and enter the 6-digit code"
            : "Log in to access your events dashboard"}
        </p>

        {step === "signup" && (
          <SignUpForm onSwitch={setStep} setEmail={setUserEmail} />
        )}
        {step === "verification" && <VerifyEmail email={userEmail} />}
        {step === "login" && (
          <SignInForm onSwitch={setStep} setEmail={setUserEmail} />
        )}

        {/* {step !== "verification" && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-social"
              >
                <FaGoogle className="mr-2" />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-social"
              >
                <FaFacebook className="mr-2" />
                Facebook
              </motion.button>
            </div>
          </div>
        )} */}

        {step !== "verification" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {step === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={() => setStep(step === "signup" ? "login" : "signup")}
                className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
              >
                {step === "signup" ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FormWrapper;
