module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adaptează dacă e în alt folder
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: '#8B4513',
        'light-blue': '#ADD8E6',
        pink: '#ff69b4',
        orange: '#f97316',
        red: '#ef4444',
        yellow: '#facc15',
        green: '#22c55e',
        'dark-blue': '#1e3a8a'
      }
    }
  },
  plugins: []
}
