import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginLingui from "eslint-plugin-lingui";

export default tseslint.config(
  { ignores: ["dist", "src/locales"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: { allowDefaultProject: ["lingui.config.ts"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      lingui: pluginLingui,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "lingui/no-unlocalized-strings": [
        "error",
        {
          ignore: ["^(?![A-Z])\\S+$", "(Reac)|(Tally)"],
          ignoreNames: ["download", "query"],
          ignoreFunctions: ["useMediaQuery"],
          useTsTypes: true,
        },
      ],
      "lingui/t-call-in-function": "error",
      "lingui/no-single-variables-to-translate": "error",
      "lingui/no-expression-in-message": "error",
      "lingui/no-single-tag-to-translate": "error",
      "lingui/no-trans-inside-trans": "error",
    },
  },
  eslintConfigPrettier,
);
