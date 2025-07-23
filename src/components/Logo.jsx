const Logo = ({ color }) => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-md bg-primary-500 flex items-center justify-center text-white font-bold text-2xl">
        EH
      </div>
      <span
        className={`ml-2 text-2xl font-bold ${
          color ? "text-primary-50" : "text-neutral-900"
        }`}
      >
        EventHub
      </span>
    </div>
  );
};

export default Logo;
