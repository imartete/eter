module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    EXPERIMENTAL_useProjectService: true,
  },
  plugins: ["react-refresh", "lingui"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "lingui/no-unlocalized-strings": [
      "error",
      {
        ignore: ["ETER"],
        ignoreAttribute: ["download", "query", "pt"],
        ignoreFunction: ["useMediaQuery", "Error"],
      },
    ],
    "lingui/t-call-in-function": "error",
    "lingui/no-single-variables-to-translate": "error",
    "lingui/no-expression-in-message": "error",
    "lingui/no-single-tag-to-translate": "error",
    "lingui/no-trans-inside-trans": "error",
  },
};
