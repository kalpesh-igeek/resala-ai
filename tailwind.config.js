/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmsans: 'DM Sans',
        Poppins: 'Poppins',
      },
      borderWidth: {
        30: '30px',
      },
      zIndex: {
        max: 2147483647,
      },
      colors: {
        lightgray: '#F9F9FB',
        lightgray1: '#E1E4F0',
        lightgray2: '#B1BED2',
        graywhite: '#FFFFFF',
        gray: '#DFE4EC',
        gray1: '#8C90A5',
        gray2: '#6D77A0',
        gray3: '#F3F3F3',
        gray4: '#F3F4F8',
        darkgray: '#848182',
        darkgray1: '#5F6583',
        darkBlue: '#19224C',
        lightblue: '#D3E7FF',
        lightblue1: '#EEF6FF',
        lightblue2: '#BFD6F2',
        lightblue3: '#D9EBFF',
        lightblue4: '#CED8E8',
        lightblue5: '#A2C9FA',
        primaryBlue: '#1678F2',
        red: '#FF0000',
        red1: '#FEE8E8',
        yellow: '#FFB200',
        green: '#23B339',
      },
    },
  },
  plugins: [],
};
