module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 60px rgba(99, 102, 241, 0.25)',
      },
      colors: {
        primary: '#6366f1',
        accent: '#22d3ee',
      },
    },
  },
  plugins: [],
}
