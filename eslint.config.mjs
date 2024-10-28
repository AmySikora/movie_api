import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js", "**/*.jsx"], // Include both .js and .jsx files
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: globals.node,
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
