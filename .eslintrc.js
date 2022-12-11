module.exports = {
  ignorePatterns: ['build/', 'lib/', 'node_modules/', 'typings/', '.eslintrc.js'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-perf/recommended',
    'prettier',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: process.cwd(),
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'deprecation',
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'import',
    'prettier',
    'jest',
    'jest-dom',
    'testing-library',
  ],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': 'off',
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
      typescript: {},
    },
  },
};
