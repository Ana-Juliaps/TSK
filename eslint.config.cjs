import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{js,mjs,cjs}"],
  plugins: { js },
  extends: ["js/recommended", "eslint:recommended"],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  rules: {
    // suas regras aqui
  }
});
