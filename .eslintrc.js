module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },

    extends: [
        'eslint:recommended',
    ],

    parser: '@babel/eslint-parser',

    parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
    },

    root: true,

    rules: {
        'arrow-parens': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        curly: ['error', 'multi-line', 'consistent'],
        'import/named': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'operator-linebreak': ['error', 'before'],
        'no-console': 0,
        'no-use-before-define': 0,
        'space-before-function-paren': ['error', { named: 'never' }],
        'space-in-parens': 0,
        'template-curly-spacing': ['error', 'always'],
        'unicorn/escape-case': 0,
    },
}
