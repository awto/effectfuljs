module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-inner-declarations": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-empty": "off"
  }
};
