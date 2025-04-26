// eslint.config.js ─ ESM (albo zmień rozszerzenie na .mjs)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

import unusedImports from 'eslint-plugin-unused-imports'; // ← nowa wtyczka

export default tseslint.config(
  /* 1. Ignorowane katalogi -------------------------------- */
  { ignores: ['dist'] },

  /* 2. Bazowe presety ESLint + TS ------------------------- */
  js.configs.recommended,
  tseslint.configs.recommended,

  /* 3. Konfiguracja plików projektu ----------------------- */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      'unused-imports': unusedImports, // ← dodane
    },
    rules: {
      /* React --------------------------------------------- */
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* Prettier ------------------------------------------ */
      'prettier/prettier': 'error',

      /* Usuwanie nieużywanych ------------------------------ */
      // wyłączamy stare reguły (bez autofixu)…
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // …i włączamy nowe z autofiksem:
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // zostaw zmienne/parametry zaczynające się od _
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  /* 4. Na końcu: wyłącz kolidujące stylistyki ------------- */
  eslintConfigPrettier,
);
