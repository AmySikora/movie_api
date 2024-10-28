import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: globals.node, // Use Node.js globals
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      indent: ["error", 2],
    },
  },
];
