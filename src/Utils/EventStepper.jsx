const EventStepper = ({ currentStep }) => {
  const steps = ["Event Info", "Upload Banner", "Review Info"];

  return (
    <div className="flex justify-between items-center w-full max-w-3xl mx-auto my-6 px-4">
      {steps.map((label, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Line before the step */}
            {index !== 0 && (
              <div
                className={`absolute left-4 top-2 h-0.5 z-0 w-full ${
                  isCompleted ? "bg-[#2B293D]" : "bg-gray-300"
                }`}
              />
            )}

            {/* Step Dot */}
            <div
              className={`z-10 w-4 h-4 rounded-full flex items-center justify-center ${
                isCompleted
                  ? "bg-[#2B293D] text-white"
                  : isActive
                  ? "border-2 border-[#2B293D] bg-white"
                  : "border border-gray-300 bg-white"
              }`}
            ></div>

            {/* Label below the dot */}
            <div
              className={`mt-2 text-sm ${
                isActive ? "text-[#2B293D] font-semibold" : "text-gray-500"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventStepper;
