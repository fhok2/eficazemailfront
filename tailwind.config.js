/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(9 182 162)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FAF9FC",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "border-primary": "rgb(9 182 162 /50%)",
        accent1: "#B1AFBF",
        accent2: "#5D5A72",
        "custom-bg": "#0B0F16",
        "background-main": "#f9fafb",
        "background-secondary": "#ffffff",
        "text-main": "#111827",
        "text-secondary": "#6b7280",
        "button-secondary": "#e5e7eb",
        "brand-dark": "rgb(4 157 142)",
        "brand-dark-600": "rgb(4 157 142 / 60%)",
        "brand-dark-700": "rgb(4 157 142 / 70%)",
        "brand-dark-800": "rgb(4 157 142 / 80%)",
        "brand-dark-900": "rgb(4 157 142 / 90%)",
        "brand-light": "rgb(4 157 142)",
        "brand-light-600": "rgb(4 157 142 / 60%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-accent-gbv": "linear-gradient(90.1deg, rgb(9 182 162 /10%), rgb(9 182 160 /20%))",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slide: "slide 10s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-accent-gbv": {
          "background-image": "linear-gradient(90.18deg, #60d5c4, #6a9fcb 50.85%, #bb84cc)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    require("tailwindcss-animate"),
  ],
}