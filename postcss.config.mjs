const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
        content: [
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
      }
    },
  },
};

export default config;
