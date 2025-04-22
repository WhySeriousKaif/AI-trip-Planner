// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        keyframes: {
          colorFade: {
            '0%, 100%': { color: '#000000' }, // Black
            '50%': { color: '#ffffff' }, // White
          },
        },
        animation: {
          'color-pulse': 'colorFade 2s infinite ease-in-out',
        },
      },
    },
  };