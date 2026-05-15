import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: [".next/**", "node_modules/**"],
    languageOptions: {
      parser: tsParser,
    },
  },
];
