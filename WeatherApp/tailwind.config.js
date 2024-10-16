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
      keyframes: {
        weatheria: {
          '0%, 100%': { color: '#3b82f6', textShadow: '0px 0px 20px rgba(59, 130, 246, 0.5)' }, // Blue color for clear sky
          '50%': { color: '#facc15', textShadow: '0px 0px 30px rgba(234, 179, 8, 0.8)' }, // Yellow for sunlight
        },
      },
      animation: {
        weatheria: 'weatheria 3s infinite alternate',
      },
    },
  },
  plugins: [],
}

