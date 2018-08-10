module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-trailing-spaces': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }] // iview 错误提示
  },
  plugins: ['html'],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
