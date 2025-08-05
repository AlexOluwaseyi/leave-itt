import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "dist/",
      "coverage/",
      ".env*", // matches .env, .env.local, etc.
      "public/",
      "**/generated/",
      "prisma/migrations/",
      "*.config.js",
      "*.config.ts",
      "temp/",
      "logs/",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:@next/next/recommended",
    "next/typescript",
    "next/core-web-vitals"
  ),
];

export default eslintConfig;
