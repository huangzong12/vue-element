module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  'extends': [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'after-used'
    }],
    'no-console': 'off',
    'no-undef': 'off',
    'camelcase': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
