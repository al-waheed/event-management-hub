import { ErrorMessage } from "formik";
import { useState } from "react";

export const formatApiError = (error) => {
  const cleaned = error
    .replace("Firebase:", "")
    .replace("auth/", "")
    .replace(/[:\-()]/g, " ")
    .trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-[12px] mt-1"
    />
  );
};

export const togglePassword = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return { show, toggle };
};
