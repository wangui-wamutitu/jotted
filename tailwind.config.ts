import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary_pink: '#F72585',
        dark_pink: '#B5179E',
        primary_purple: '#7209B7',
        dark_purple: '#560BAD',
        // darker_purple: '#390099',
        darker_purple: '#bbb',
        primary_blue: '#4CC9F0',
        dark_blue: '#4895EF'
      }
    },
  },
  plugins: [],
} satisfies Config;

// ['F72585','b5179e','7209B7','560BAD','480CA8','3A0CA3','3F37C9', '4361EE', '4895EF','4CC9F0']