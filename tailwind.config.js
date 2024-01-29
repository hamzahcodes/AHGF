/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    // themes: ["emerald","pastel","winter","acid","fantasy","garden","luxury","retro","halloween","wireframe","synthwave"],
    // themes: false,
    themes: [
      {
        mytheme: {
          "secondary": "#6366f1",
          "primary": "rgba(243,244,246,0.75)",
          "accent": "#6366f1",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {
      
    },
  },
  plugins: [require("daisyui")],
}
