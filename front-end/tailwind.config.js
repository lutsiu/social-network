/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "576px" },
        md: { min: "768px" },
        lg: { min: "992px" },
        xl: { min: "1200px" },
        "2xl": { min: "1400px" },
      },
    },
  },
  plugins: [],
};
