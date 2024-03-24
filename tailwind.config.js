/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'canHover': { 'raw': '(hover: hover) and (pointer: fine)'},
        'cannotHover': { 'raw': '(hover: none) and (pointer: coarse)'}
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(10%)' },
          '50%': { transform: 'translateY(0%)' }
        }
      },
      animation: {
        float: '1.25s float infinite'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        purple: {
          "primary": "#b646ba",
          "primary-content": "#fff",
          "secondary": "#551a89", 
          "secondary-content": "#fff",
          "accent": "#b888e2",
          "neutral": "#ffffff",
          "base-100": "#292524",
          "base-content": "#fff",
          "info": "#7dd3fc",
          "success": "#bef264",
          "warning": "#fcd34d",
          "error": "#bf3b4a",
          "base-200": "#120056"
          },
      },
      "night"
    ],
    themeRoot: ':root',
  },
}
