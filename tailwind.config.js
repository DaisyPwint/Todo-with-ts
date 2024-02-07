// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Josefin Sans']
    },
    extend: {
      backgroundImage: {
        'my-gradient': 'linear-gradient(to right,hsl(192, 100%, 67%),hsl(280, 87%, 65%))'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
