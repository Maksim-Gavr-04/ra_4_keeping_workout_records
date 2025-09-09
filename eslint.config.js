import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/** @type { import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile } */
export default tsEslint.config([
  globalIgnores([ 'dist', '*.json' ]),
  {
    files: [ '**/*.{ts,tsx}' ],
    extends: [
      js.configs.recommended,
      tsEslint.configs.recommendedTypeChecked,
      tsEslint.configs.stylisticTypeChecked,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true, globalReturn: false },
        sourceType: 'module',
        project: [ './tsconfig.node.json', './tsconfig.app.json' ],
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: { '@typescript-eslint': tsEslint.plugin },
    settings: { react: { version: 'detect' } },
    rules: {
      '@typescript-eslint/consistent-type-imports': [ 'error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' } ],
      '@typescript-eslint/no-unused-vars': [ 'error', { varsIgnorePattern: '^[A-Z_]' } ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/array-type': 'error',
      'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
      'react/self-closing-comp': [ 'error', { component: true, html: true } ],
      'react/jsx-curly-spacing': [ 2, 'never' ],
      'react-hooks/exhaustive-deps': 'error',
      'react/react-in-jsx-scope': 'off',
      'arrow-body-style': [ 'error', 'as-needed' ]
    }
  },
  {
    files: [ '**/*.js' ],
    extends: [ tsEslint.configs.disableTypeChecked ],
    rules: {
      'other-plugin/typed-rule': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/no-console': 'off',
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/semi': [ 'error', 'always' ],
      '@stylistic/max-len': [ 'error', { code: 125 } ],
      '@stylistic/quotes': [ 'error', 'single' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/array-bracket-newline': [ 'error', { multiline: true, minItems: 4 } ],
      '@stylistic/object-curly-spacing': [ 'error', 'always' ],
      '@stylistic/object-curly-newline': [ 'error', { 'ObjectExpression': { multiline: true, minProperties: 4 } } ],
      '@stylistic/no-multi-spaces': [
        'error', {
          exceptions: {
            'Property': false,
            'BinaryExpression': true,
            'VariableDeclarator': true,
            'ImportDeclaration': true
          }
        }
      ],
      '@stylistic/key-spacing': [ 'error', { mode: 'strict' } ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 1 } ]
    }
  }
]);