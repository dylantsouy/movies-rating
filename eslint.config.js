import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import noInlineStylesPlugin from 'eslint-plugin-no-inline-styles';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '.vercel/**',
      '*.tsbuildinfo',
      'coverage/**',
      'public/**',
      '.env*',
      'eslint.config.js',
      'src/components/ui/**',
      'custom-cz-adapter.js'
    ]
  },

  // Base ESLint recommended rules
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        ...globals.jest,
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      'no-inline-styles': noInlineStylesPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        alias: {
          map: [
            ['@', './src'],
            ['@/', './src/'],
            ['~', './'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/ignore': [
        '@tailwindcss/vite',
        'tailwindcss',
        'node_modules',
      ],
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unused-vars': [
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false }
      ],

      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.jsx', '.tsx'] }
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'off',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      ...reactHooksPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      ...nextPlugin.configs.recommended.rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'off',

      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type'
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
          distinctGroup: false,
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-cycle': 'warn',
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      ...jsxA11yPlugin.configs.recommended.rules,

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',

      'max-len': [
        'warn',
        {
          code: 100,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],

      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: 'multiline-let', next: '*' },
        { blankLine: 'always', prev: 'multiline-var', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try', 'throw'] },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'any', prev: 'singleline-const', next: 'return' },
        { blankLine: 'any', prev: 'singleline-let', next: 'return' },
        { blankLine: 'any', prev: 'singleline-var', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'none',
          printWidth: 100,
          bracketSpacing: true,
          semi: true,
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'lf',
          bracketSameLine: false,
          proseWrap: 'preserve',
          htmlWhitespaceSensitivity: 'css',
          quoteProps: 'as-needed',
          embeddedLanguageFormatting: 'auto',
          insertPragma: false,
          requirePragma: false,
          arrowParens: 'always',
        },
      ],
      'no-inline-styles/no-inline-styles': 'warn',
    },
  },

  {
    files: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      'src/pages/**/*.{js,jsx,ts,tsx}',
      'src/app/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },

  {
    files: [
      'pages/api/**/*.{js,ts}',
      'app/api/**/*.{js,ts}',
      'src/pages/api/**/*.{js,ts}',
      'src/app/api/**/*.{js,ts}',
    ],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },

  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
    },
  },

  {
    files: [
      'next.config.{js,ts,mjs}',
      'tailwind.config.{js,ts}',
      'postcss.config.{js,ts}',
      '*.config.{js,ts}',
      'middleware.{js,ts}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/no-cycle': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/namespace': 'off',
      'import/no-duplicates': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
