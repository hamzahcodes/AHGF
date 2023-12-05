/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: ["emerald","pastel","winter","acid","fantasy","garden","luxury","retro","halloween","wireframe","synthwave"],
  },
  theme: {
    extend: {
      
    },
  },
  plugins: [require("daisyui")],
}
