import {
  FaCalendarAlt,
  FaUserPlus,
  FaChartBar,
  FaMobileAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaCalendarAlt />,
    title: "Create Events",
    description: "Easily set up and customize your events in minutes.",
  },
  {
    icon: <FaUserPlus />,
    title: "Invite Attendees",
    description: "Send personalized invitations and manage guest lists.",
  },
  {
    icon: <FaChartBar />,
    title: "Track Performance",
    description: "Get insights on attendance and engagement.",
  },
  {
    icon: <FaMobileAlt />,
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
            <div className="flex-shrink-0">
              <div className="w-8 h-8 flex items-center rounded-2xl bg-background justify-center">
                {feature.icon}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-background">
                {feature.title}
              </h3>
              <p className="mt-1 text-white">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeatureList;
