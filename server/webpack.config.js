/**
 * This file specifies the configuration for webpack
 */

const path = require('path');

const WebpackShellPlugin = require('webpack-shell-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ['./src/index.ts'],
    mode: 'development',
    target: 'node',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
        ],
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['nodemon dist/index.js --watch dist'],
        }),
        new Dotenv({
            path: path.resolve(__dirname, '.env'),
        }),
    ],
    externals: [
        { mongoose: 'commonjs mongoose' },
        { express: 'commonjs express' },
    ],
};
