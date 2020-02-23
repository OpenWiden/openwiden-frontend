module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {},
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
  },
};
