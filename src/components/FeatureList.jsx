import {
  FaCalendarAlt,
  FaUserPlus,
  FaChartBar,
  FaMobileAlt,
} from "react-icons/fa";
import FeatureItem from "./FeatureItem";

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
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  );
};

export default FeatureList;
