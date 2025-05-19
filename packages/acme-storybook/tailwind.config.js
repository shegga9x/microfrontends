module.exports = {
  content: [
    // your Storybook stories and components
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    // only scan the SOURCE dirs of your shared packages
    '../acme-design-system/src/**/*.{js,jsx,ts,tsx}',
    '../acme-components/src/**/*.{js,jsx,ts,tsx}',
    '../acme-shared/src/**/*.{js,jsx,ts,tsx}',
    '../acme-utils/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
