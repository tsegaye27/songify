import js from "@eslint/js";
import react from "eslint-plugin-react";
import ts from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: ts,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react,
      "@typescript-eslint": tsPlugin,
    },
    env: {
      browser: true, // This allows browser globals like document, localStorage
      node: true, // Allows Node.js globals like fetch, setTimeout, etc.
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
