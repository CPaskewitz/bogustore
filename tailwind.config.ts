import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown-800': '#4E3B31',
        'soft-coral': '#F28B82',
        'sage-green': '#A8C686',
      },
      spacing: {
        'card-width': '200px',
        'card-height': '250px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'scroll-hover': { 'raw': '(hover: hover)' },
      },
    },
  },
  plugins: [],
};
export default config;