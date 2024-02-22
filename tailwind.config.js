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
    colors: {
      bgColor: 'var(--bgColor)',
      cardColor: 'var(--cardColor)',
      textColor: 'var(--textColor)',
      darkTextColor: 'var(--darkTextColor)'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

