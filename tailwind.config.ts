import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'sm': '640px',   // @media (min-width: 640px) { ... }
        'md': '768px',   // @media (min-width: 768px) { ... }
        'lg': '1024px',  // @media (min-width: 1024px) { ... }
        'xl': '1440px',  // @media (min-width: 1280px) { ... }
        '2xl': '3000px', // @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
} satisfies Config;
