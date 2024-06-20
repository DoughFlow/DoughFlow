import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'dfyellow': '#FFBB84',
      'dfbrown': '#996F4F',
      'dfwhite': '#FFE4D1',
      'dfgray': '#36312e',
      'dfYellow': '#996F4F',
    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [],
};
export default config;
