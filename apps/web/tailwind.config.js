/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#121616",
        "hypercash-color": "#CDEA80",
      },
    },
  },
  plugins: [],
}
