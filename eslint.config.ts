import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    languageOptions: {
      tolerant: true,
    },
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": ["warn", {
        available: "newly",
        allowSelectors: ["nesting"],
        allowProperties: ["user-select"],
      }],
      "css/no-invalid-properties": "off",
    },
  },

  prettier,
]);
