/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        offbit: 'OffBit',
      },
      boxShadow({ colors }) {
        return {
          brutal: `5px 5px 0px ${colors.zinc[900]}`,
        }
      },
    },
  },
  plugins: [],
}
