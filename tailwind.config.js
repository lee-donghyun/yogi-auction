module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Serif KR']
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}