/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "575px" }, //Mobile (iPhone 3 - iPhone XS max)
        sm: { min: "576px", max: "819px" }, // Mobile (matches max: iPhone Max)
        md: { min: "820px", max: "1199px" }, //Tablet (matches max: iPad Pro @1112px)
        lg: { min: "1200px" }, //Desktop smallest
        xl: { min: "1159px" }, //Desktop wide,
        xxl: { min: "1359px" }, // Desktop widescreen
      },
      width: {
        1600: "1600px",
        400: "400px",
        450: "450px",
        210: "210px",
        550: "550px",
        260: "260px",
        650: "650px",
      },
      height: {
        600: "600px",
        280: "280px",
        900: "900px",
        458: "458px",
      },
      top: {
        "50%": "50%",
      },
      backgroundColor: {
        primary: "#F1F1F2",
        blur: "#030303",
      },
      colors: {
        primary: "rgb(22, 24, 35)",
      },
      height: {
        "88vh": "88vh",
      },
    },
  },
  plugins: [],
};
