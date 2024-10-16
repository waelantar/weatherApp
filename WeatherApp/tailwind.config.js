/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",},

      screens: {
        sm: "640px",
        md: "768px", 
        lg: "960px",
        xl: "1200px",
      },
      fontFamily: {
        primary: "var(--font-jebrainsMono)", 
      
    },
    
    extend: {
      colors: {
        primary: "#070450",
        accent: {
          DEFAULT: "#FFFFFF", 
          hover: "#E8E8E8",    
        },
      },
      backgroundImage: {
        'custom-bg': "url('/WeatherApp/public/assets/2_3.jpg')",
      },
      
    },
  },
  plugins: [],
}

