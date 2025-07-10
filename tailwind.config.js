/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require("nativewind/preset")],
  darkMode: ["class"],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A9B8E",
        secondary: "#6BB6AB",
        accent: "#8FD5CC",
        success: "#48BB78",
        warning: "#ED8936",
        error: "#F56565",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
