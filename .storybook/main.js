const path = require('path')

module.exports = {
    stories: [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx|)',
        '../pages/**/*.stories.@(js|jsx|ts|tsx|)',
    ],

    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: false,
            },
        },
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-links',
    ],

    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            include: path.resolve(__dirname, '../'),

            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        additionalData: `
                            @import "./assets/scss/global.scss";
                        `,
                    }
                }
            ],
        });

        config.resolve.alias = {
            '/fonts': path.resolve(__dirname, '..', 'static', 'fonts'),
            '/img': path.resolve(__dirname, '..', 'static', 'img'),
        }

        // Return the altered config
        return config;
    },
}