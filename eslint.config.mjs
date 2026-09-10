import cypressPlugin from 'eslint-plugin-cypress';

export default [
  {
    ignores: [
      'node_modules/',
      '.git/',
      'cypress/videos/',
      'cypress/screenshots/',
      'cypress/fixtures/',
      'coverage/',
      'dist/',
    ],
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
    },
  },

  {
    files: ['cypress/**/*.cy.js', 'cypress/support/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,

      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-async-tests': 'error',

      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  {
    files: ['cypress.config.js', '*.config.js', '.*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Globales de Node
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },
];