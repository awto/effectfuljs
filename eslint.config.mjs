// @ts-check
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/src/**/*.ts"],
    ignores: ["**/node_modules/**", "**/testdata/**", "**/.vscode-test/**"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-inner-declarations": "off",
      "no-case-declarations": "off",
      "no-fallthrough": "off",
      "no-empty": "off",
      "prefer-rest-params": "off",
      "prefer-spread": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
    },
  },
  {
    files: ["src/**/*.js", "main.js"],
    ignores: [
      "**/node_modules/**",
      "**/testdata/**",
      "**/out/**",
      "**/lib/**",
      "**/test/samples/**",
      "**/.vscode-test/**",
      "**/core-js.js",
      "**/links/**",
    ],
    extends: [eslint.configs.recommended],
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-inner-declarations": "off",
      "no-case-declarations": "off",
      "no-fallthrough": "off",
      "no-empty": "off",
      "prefer-spread": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
);
