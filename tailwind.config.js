/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
   
      borderRadius: {
        'custom': '100% 30%',
       
      },
      animation: {
        ripple: "ripple 1.5s infinite",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(0.9)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(2.5)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
