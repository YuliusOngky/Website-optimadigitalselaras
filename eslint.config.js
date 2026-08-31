import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "dist/**",
      "public/**",
      "disk/**",
      "scripts/**",
      "config/**",
      "solutions/**",
      "1.Orisa_development/**",
      "3.Orisa-Nextjs/**",
      "AAA_*/**",
      "orisa-*/**",
      "_*/**",
      "*-image-audit/**",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.html",
      "**/*.json",
      "**/*.md",
      "**/*.css",
      "**/*.scss",
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.webp",
      "**/*.mp4",
      "**/*.zip",
      "**/*.ps1",
      "**/*.py",
      "**/*.bat",
      "**/*.cmd",
      "**/*.yml",
      "**/*.yaml",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
    },
  },
];
