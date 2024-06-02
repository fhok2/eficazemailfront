/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-accent-gbv': 'linear-gradient(90.1deg, rgb(9 182 162 /10%), rgb(9 182 160 /20%))',
      },
      colors: {
        primary: 'rgb(9 182 162)', 
        'border-primary': 'rgb(9 182 162 /50%)', 
        secondary: '#FAF9FC',
        accent1: '#B1AFBF',
        accent2: '#5D5A72',
        'custom-bg': '#0B0F16',
        'background-main': '#f9fafb', // Fundo Principal
        'background-secondary': '#ffffff', // Fundo Secundário
        'text-main': '#111827', // Texto Principal
        'text-secondary': '#6b7280', // Texto Secundário
      
       
        'button-secondary': '#e5e7eb', // Botão Secundário
        border: '#d1d5db', // Borda
        'brand-dark': 'rgb(4 157 142)', 
        'brand-dark-600': 'rgb(4 157 142 / 60%)',
        
      },
      animation: {
        slide: 'slide 10s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.gradient-accent-gbv': {
          'background-image': 'linear-gradient(90.18deg, #60d5c4, #6a9fcb 50.85%, #bb84cc)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
      require("tailwindcss-animate")
],
}
