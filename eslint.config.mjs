import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  {
    ignores: [
      "**/.git/**",
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**",
      "**/public/**",
    ],
  },
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Prettier integration
      "prettier/prettier": "error",
    },
  },
]);
