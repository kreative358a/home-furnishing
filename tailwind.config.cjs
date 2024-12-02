/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "DeepSkyBlue",
          secondary: "rgb(28, 210, 220)",
          accent: "Plum",
          error: "Crimson",
          neutral: "rgb(120, 140, 180)",
          info: "Bisque",
          // third: "Bisque",
        },
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          primary: "MidnightBlue",
          secondary: "rgb(10, 70, 90)",
          accent: "Purple",
          error: "Crimson",
          neutral: "rgb(20, 40, 80)",
          info: "RosyBrown",
          // third: "RosyBrown",
        },
      },
    ],
  },
};
