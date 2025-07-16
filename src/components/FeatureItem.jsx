import { motion } from 'framer-motion';

const FeatureItem = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="flex items-start p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureItem;