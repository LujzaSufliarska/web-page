import { s } from "framer-motion/client";
const { BREAKPOINTS } = require('./src/config/breakpoints');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable dark mode support
  // https://tailwindcss.com/docs/dark-mode

  theme: {
    // https://tailwindcss.com/docs/theme#configuration-reference

    extend: {
      // ---------------------------------------- C O L O R S ----------------------------------------
      colors: {
        // Background Colors
        bcg: "var(--bcg)",
        "bcg-text": "var(--bcg-text)",

        // Primary Colors
        primary: "var(--primary)",
        "primary-text": "var(--primary-text)",

        // General Colors
        white: "#FFFFFF",
        black: "#000000",
      },

      // ---------------------------------------- T Y P O G R A P H Y ----------------------------------------
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: "60px",
        h2: "48px",
        h3: "40px",
        h4: "32px",
        h5: "24px",
        default: "18px",
        p1: "16px",
        p2: "12px",
        p3: "14px",
      },

      // ---------------------------------------- S P A C I N G ----------------------------------------
      // spacing: { gap: {}, padding{}, }// spacing does not allow nested objects

      // Gap Sizes
      gap: {
        default: "6px",
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        5: "40px",
        button: "12px",
        medium: "80px",
      },
      // Padding Sizes
      padding: {
        big: "120px",
        wrapper: "24px",
        default: "16px",
        small: "8px",
        sm_screen: "40px",
        md_screen: "80px",
        lg_screen: "160px",
      },

      // ---------------------------------------- I C O N S ----------------------------------------
      spacing: {
        "icon-xxs": "16px",
        "icon-xs": "24px",
        "icon-s": "32px",
        "icon-m": "40px",
        "icon-l": "48px"
      },

      // ---------------------------------------- B O R D E R ----------------------------------------
      // borderColor: theme => ({
      //   default: theme('colors.bcg.600'), // Set default border color to bcg-600
      // }),
      borderWidth: {
        1: "1px",
        2: "2px",
      },
      borderRadius: {
        small: "5px",
        default: "10px",
        round: "20px",
      },

      // ---------------------------------------- B R E A K P O I N T S ----------------------------------------
      // defined in src/config/breakpoints.ts
      screens: {
        xs: `${BREAKPOINTS.xs}px`,
        sm: `${BREAKPOINTS.sm}px`,
        md: `${BREAKPOINTS.md}px`,
        lg: `${BREAKPOINTS.lg}px`,
        xl: `${BREAKPOINTS.xl}px`,
      },
    },
  },
  plugins: [],
};
