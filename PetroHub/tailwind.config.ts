import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/primeng/**/*.{js,ts,jsx,tsx}' // Add PrimeNG content
  ],
  theme: {
    extend: {
      colors: {
        // Custom emerald/green palette for Future Horses branding
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // PrimeNG color mappings to our emerald theme
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
