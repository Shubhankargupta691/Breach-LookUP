/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom utilities
      scrollbarHide: {
        "::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none", // IE and Edge
        "scrollbar-width": "none", // Firefox
      },
      screens: {
        xs: '600px',
      },
      boxShadow: {
        'glow-blue': '0 0 10px 2px rgba(59, 130, 246, 0.7)', // Blue glow
        'glow-red': '0 0 10px 2px rgba(220, 38, 38, 0.7)',   // Red glow
        'glow-white': '0 0 10px 3px rgba(255, 255, 255, 0.7)', // White glow
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari, and Opera */ "-webkit-overflow-scrolling":
            "touch",
          "scrollbar-width": "none",
          /* For Firefox */ "-ms-overflow-style":
            "none" /* For Internet Explorer and Edge */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },
      });
    },
  ],
};
