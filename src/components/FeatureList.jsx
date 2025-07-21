import {
  FaCalendarAlt,
  FaUserPlus,
  FaChartBar,
  FaMobileAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaCalendarAlt className="text-primary-500" />,
    title: "Create Events",
    description: "Easily set up and customize your events in minutes.",
  },
  {
    icon: <FaUserPlus className="text-primary-500" />,
    title: "Invite Attendees",
    description: "Send personalized invitations and manage guest lists.",
  },
  {
    icon: <FaChartBar className="text-primary-500" />,
    title: "Track Performance",
    description: "Get insights on attendance and engagement.",
  },
  {
    icon: <FaMobileAlt className="text-primary-500" />,
    title: "Mobile Experience",
    description: "Manage events on the go with our mobile app.",
  },
];

const FeatureList = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((feature, i) => {
        return (
          <motion.div
            key={i}
            className="flex items-start p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeatureList;
