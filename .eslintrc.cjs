module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['eslint-plugin-import', 'prettier'],
  rules: {
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
};
