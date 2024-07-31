/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ssm: "390px",
      sm: "480px",
      md: "768px",
      lg: "1060px",
      xl: "1280px",
      "1xl": "1380px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      headerUnderline: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
      languageShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      swiper: "0px 2px 8px 0 rgba(0, 0, 0, 0.25)",
      button: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
    },
    extend: {},
  },
  plugins: [],
}

