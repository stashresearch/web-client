module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react",
        "jest"
    ],
    "rules": {
        "padded-blocks": [0],
        "no-unused-vars": [1],
        'standard/no-callback-literal': 'off'
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    parser: "babel-eslint"
};