/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B293D",
        "primary-hover": "#3A374F",
        background: "#F5F5F5",
        white: "#FFFFFF",
        yellow: "#FFE047",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      display: ["SF Pro Display", "Inter", "system-ui", "sans-serif"],
    },
    boxShadow: {
      soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      medium:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  },
  plugins: [],
};
