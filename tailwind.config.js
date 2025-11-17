// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandGold: "#C9A14A",        // main gold
        brandGoldDark: "#B28F3F",    // hover / darker gold
        brandGoldSoft: "#E7D3A4",    // soft gold for text accents
        brandGoldPale: "#F5E7C0",    // very light gold (labels, secondary text)
      },
    },
  },
  plugins: [],
};