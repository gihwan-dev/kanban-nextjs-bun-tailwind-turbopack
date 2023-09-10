import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "--Main-Purple": "#635FC7",
      "--main-purple-hover": "#A8A4FF",
      "--Black": "#000112",
      "--very-dark-grey-dart-bg": "#20212C",
      "--Dark-Grey": "#2BC37",
      "--lines-dark": "#3E3F4E",
      "--Medium-Grey": "#828FA3",
      "--lines-light": "#E4EBFA",
      "--light-grey-light-bg": "#F4F7FD",
      "--White": "#FFFFFF",
      "--Red": "#EA5555",
      "--red-hover": "#FF9898",
    },
    boxShadow: {
      "task-card": "0px 4px 6px 0px rgba(54, 78, 126, 0.10)",
    },
  },
  plugins: [],
};
export default config;
