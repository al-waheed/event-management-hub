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
      className="text-red-500 text-[12px]"
    />
  );
};

export const togglePassword = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return { show, toggle };
};

export const listOfEvent = [
  { value: "", label: "Please select one" },
  { value: "music", label: "Music" },
  { value: "conference", label: "Conference" },
  { value: "seminar", label: "Seminar" },
  { value: "webinar", label: "Webinar" },
  { value: "workshop", label: "Workshop" },
  { value: "networking", label: "Networking" },
  { value: "fundraiser", label: "Fundraiser" },
  { value: "sports", label: "Sports" },
  { value: "festival", label: "Festival" },
  { value: "religious", label: "Religious" },
  { value: "wedding", label: "Wedding" },
  { value: "carnival", label: "Carnival" },
  { value: "exhibition", label: "Exhibition" },
  { value: "theater", label: "Theater" },
  { value: "comedy", label: "Comedy" },
  { value: "art", label: "Art" },
  { value: "food", label: "Food" },
  { value: "fashion", label: "Fashion" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];
