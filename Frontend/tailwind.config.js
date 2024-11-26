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
