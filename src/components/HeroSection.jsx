import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormWrapper from "../Auth/FormWrapper";
import FeatureList from "./FeatureList";
import Logo from "./Logo";

const HeroSection = () => {
  return (
    <div className="relative flex-1 flex flex-col md:flex-row">
      <Link
        to="/"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3"
      >
        <Logo />
      </Link>

      <motion.div
        className="w-full md:w-1/2 bg-primary-50 p-6 md:p-12 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Event Management{" "}
            <span className="text-primary-600">Simplified</span>
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600">
            Create, manage, and grow your events with a powerful platform that
            handles everything from invitations to registrations.
          </p>
          <FeatureList />
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 bg-white p-6 md:p-12 flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="w-full max-w-md">
          <FormWrapper />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
