module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'indent': ["error", "tab"],
    'no-tabs': 0,
    'handle-callback-err': 0,
    // require trailing commas
    'comma-dangle': ["error", "always-multiline"],
    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    // enforce variables to be declared either together or separately in functions
    'one-var': ["error", "never"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // do not allow console.logs etc...
    'no-console': 2
  },
  globals: {
    'use': true
  }
}
