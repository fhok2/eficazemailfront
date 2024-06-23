/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-accent-gbv":
          "linear-gradient(90.1deg, rgb(9 182 162 /10%), rgb(9 182 160 /20%))",
        "radial-gradient-hero-title": "radial-gradient(70.71% 70.71% at 50% 50%, #fff 30%, hsla(0, 0%, 100%, .5) 84.77%)",
      },
      borderWidth: {
        'b': '1px',
      },
      backgroundColor: {
        "almostblack": "rgb(1 3 20 / var(--tw-bg-opacity))",
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
      colors: {
        primary: "rgb(9 182 162)",
        "border-primary": "rgb(9 182 162 /50%)",
        secondary: "#FAF9FC",
        accent1: "#B1AFBF",
        accent2: "#5D5A72",
        "custom-bg": "#0B0F16",
        "background-main": "#f9fafb",
        "background-secondary": "#ffffff",
        "text-main": "#111827",
        "text-secondary": "#6b7280",
        "button-secondary": "#e5e7eb",
        border: "#d1d5db",
        "brand-dark": "rgb(4 157 142)",
        "brand-dark-600": "rgb(4 157 142 / 60%)",
        "brand-dark-700": "rgb(4 157 142 / 70%)",
        "brand-dark-800": "rgb(4 157 142 / 80%)",
        "brand-dark-900": "rgb(4 157 142 / 90%)",
        "brand-light": "rgb(4 157 142)",
        "brand-light-600": "rgb(4 157 142 / 60%)",
      },
      animation: {
        slide: "slide 10s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-accent-gbv": {
          "background-image":
            "linear-gradient(90.18deg, #60d5c4, #6a9fcb 50.85%, #bb84cc)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
};
