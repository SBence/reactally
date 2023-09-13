module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "lingui"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "lingui/no-unlocalized-strings": [
      "error",
      {
        ignore: ["(Reac)|(Tally)"],
        ignoreAttribute: ["download", "query"],
      },
    ],
    "lingui/t-call-in-function": "error",
    "lingui/no-single-variables-to-translate": "error",
    "lingui/no-expression-in-message": "error",
    "lingui/no-single-tag-to-translate": "error",
    "lingui/no-trans-inside-trans": "error",
  },
};
