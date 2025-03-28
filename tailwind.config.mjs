/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      fontFamily: {
        contractica: ["tbcContracticaCAPS", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        book: 450,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
      colors: {
        primary: {
          50: "#F7F6FC",
          100: "#EEEDFA",
          200: "#D9D4F3",
          300: "#C4BCEC",
          400: "#A493E3",
          500: "#8471D9",
          600: "#6449CF",
          700: "#4C31B3",
          800: "#382686",
          900: "#251A58",
          orange: "#FDB927",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: "#F2F3F4",
          100: "#E4E6E8",
          200: "#C9CDD2",
          300: "#ADB3BB",
          400: "#757E89",
          500: "#434A53",
          600: "#3B4249",
          700: "#30363C",
          800: "#24292E",
          900: "#181C1F",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        white: "#FFFFFF",
        background: "#F9FAFB",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1392px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
