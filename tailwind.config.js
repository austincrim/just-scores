/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      boxShadow({ colors }) {
        return {
          brutal: `5px 5px 0px ${colors.zinc[900]}`
        }
      }
    }
  }
}
