const path = require('path')
const glob = require('glob')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: path.resolve('./index.js'),
        'global': glob.sync('./assets/scss/_global.scss'),
        'component': glob.sync('./components/**/*.scss'),
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `
                                @import "./assets/scss/_bundle.scss";
                            `,
                        },
                    },
                ],
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.mp4$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'mp4/[name][ext]',
                },
            },

            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },

    output: {
        assetModuleFilename: 'img/[name][ext]',
        publicPath: '/',
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'components',
                    filter: (resourcePath) => resourcePath.endsWith('.html'),
                    to: '[name][ext]',
                },
            ],
        }),

        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    'gifsicle',
                    ['mozjpeg', { quality: 68 }],
                    'optipng',
                ],
            },
        }),

        new MiniCssExtractPlugin(),
    ],

    resolve: {
        alias: {
            '/fonts': path.resolve(__dirname, './static/fonts'),
            '/img': path.resolve(__dirname, './static/img'),
            '/mp4': path.resolve(__dirname, './static/mp4'),
        },
    },
}
