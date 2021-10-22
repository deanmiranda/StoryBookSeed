module.exports = {
    collectCoverage: true,

    moduleFileExtensions: [
        'js',
        'json',
    ],

    moduleNameMapper: {
        '^.+.(css|scss)$': 'jest-transform-stub',
    },

    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.js$': 'babel-jest',
    },
}
