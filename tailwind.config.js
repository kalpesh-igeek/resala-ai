/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmsans: "DM Sans",
        Poppins: "Poppins"
      },
      zIndex: {
        max: 2147483647,
      },
      colors: {
        lightgray: "#F9F9FB",
        lightgray1: "#E1E4F0",
        lightgray2: "#B1BED2",
        graywhite:'#FFFFFF',
        gray: '#DFE4EC',
        gray1: '#8C90A5',
        gray2: '#6D77A0',
        gray3:'#F3F3F3',
        darkgray: '#848182',
        darkgray1: '#5F6583',
        darkBlue: '#19224C',
        lightblue: '#D3E7FF',
        lightblue1: '#EEF6FF',
        lightblue2: '#BFD6F2',
        primaryBlue: '#1678F2',
        red: "#FF0000",
        yellow: "#FFB200",
        green: "#23B339"
      },
    },
  },
  plugins: [],
};
