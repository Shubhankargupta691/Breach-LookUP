/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom utilities
      scrollbarHide: {
        '::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',  // IE and Edge
        'scrollbar-width': 'none',  // Firefox
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',  // Firefox
        },
      });
    },
  ],
}
