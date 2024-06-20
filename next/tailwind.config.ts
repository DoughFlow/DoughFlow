import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'dfyellow': '#FFBB84', // legacy-code support
      'dfBrown': '#99775E',
      'dfWhite': '#FFE4D1',
      'dfWhiteTwo':'#FFEBDD',
      'dfGray': '#877B74',
      'dfYellow': '#FFBB84',
      'dfOrange':'#FF9151',
      'dfRed':'#510015',
      'dfGold':'#FFB702',
      'dfBlack':'#09030F',
      'dfGreen': '#058907',
    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [],
};
export default config;
