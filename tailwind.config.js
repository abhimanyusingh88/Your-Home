/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FFFFFF',   // Pure white
          100: '#F9FAFB',   // Soft white
          200: '#F3F4F6',   // Light gray background
          300: '#E5E7EB',   // Border gray
          400: '#D1D5DB',   // Muted gray
          500: '#9CA3AF',   // Neutral gray
          600: '#6B7280',   // Medium gray text
          700: '#4B5563',   // Dark text
          800: '#374151',   // Heading color
          900: '#111827',   // Deep black
          950: '#0B0F19',   // Accent black
        },
        accent: {
          50:  '#FFF8F5',   // Warm white tint
          100: '#FFEFE6',   // Very light peach
          200: '#FFD7CC',   // Soft coral
          300: '#FFBFA3',   // Light orange
          400: '#FFA67A',   // Bright accent orange
          500: '#FF6B3D',   // Main accent (Airbnb-like coral)
          600: '#E0562C',   // Darker coral
          700: '#B84725',   // Deep orange
          800: '#8A321C',   // Rich orange-brown
          900: '#5C2414',   // Dark tone
          950: '#3A170C',   // Very dark tone
        },
      },
    },
  },
  plugins: [],
};
