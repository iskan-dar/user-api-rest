module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'func-names': 'off',
        'no-unused-vars': 'warn',
        'class-methods-use-this': 'off',
        'max-len': ['error', { code: 104 }],
        'no-console': 'warn',
        indent: ['error', 4],
        'consistent-return': 'off',
        'object-curly-newline': ['error', {
            ObjectPattern: { multiline: true },
        }],
        'arrow-body-style': ['error', 'always'],
    },
};
