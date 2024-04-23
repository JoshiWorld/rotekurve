/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
};

export default config;
