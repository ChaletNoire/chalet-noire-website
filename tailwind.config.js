/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        lyon: ['Lyon', 'serif'],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
