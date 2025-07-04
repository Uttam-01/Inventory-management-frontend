import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules to override or disable specific warnings/errors
  {
    rules: {
      // Turn off common Next.js / React warnings
      "import/no-anonymous-default-export": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",

      // TS-specific adjustments
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",

      // General JavaScript rules
      "prefer-const": "off",
    },
  },
];

export default eslintConfig;
