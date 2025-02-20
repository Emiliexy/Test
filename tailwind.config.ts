import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#B8860B',
        'deep-gold': '#A67C00',
        'light-gold': '#FFF8DC',
        'dark-brown': '#5D3A1A',
        'burgundy': '#800020',
        'bg-cream': '#FAF9F6',
        'text-gray': '#333333',
        'scroll-gold': '#D4AF37',
      },
      backgroundImage: {
        'lotus-pattern': "url('/images/lotus-pattern.png')",
        'paper-texture': "url('/images/paper-texture.png')",
        'cloud-pattern': "url('/images/cloud-pattern.png')",
      },
      fontFamily: {
        'kai': ['KaiTi', 'SimKai', 'serif'],
        'song': ['SimSun', 'Source Han Serif CN', 'serif'],
        'sans': ['Microsoft YaHei', 'Source Han Sans CN', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
