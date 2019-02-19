module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "amd": true
  },
  "extends": [
    "airbnb"
  ],
  "parserOptions": {
      "ecmaVersion": 2017
  },
  "rules": {
      "no-console": "off",
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "prettier/prettier": [
        "error",
        {
          "trailingComma": "es5",
          "singleQuote": true,
          "printWidth": 120
        }
      ],
  }
};
