const Logo = ({ color, bg }) => {
  return (
    <div className="flex items-center">
      <div
        className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-2xl ${
          bg ? "bg-white text-primary" : "bg-primary text-white"
        }`}
      >
        EH
      </div>
      <span
        className={`ml-2 text-3xl font-bold italic ${
          color ? "text-yellow" : "text-primary"
        }`}
      >
        EventHub
      </span>
    </div>
  );
};

export default Logo;
