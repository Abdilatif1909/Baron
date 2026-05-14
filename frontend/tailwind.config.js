export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#0f172a',
        accent: '#0ea5a4',
      },
      boxShadow: {
        glass: '0 10px 35px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top, rgba(37,99,235,0.35), transparent 45%), radial-gradient(circle at right, rgba(14,165,164,0.25), transparent 35%)',
      },
    },
  },
  plugins: [],
};
