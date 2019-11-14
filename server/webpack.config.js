/**
 * This file specifies the configuration for webpack
 */

const path = require('path');

const WebpackShellPlugin = require('webpack-shell-plugin');
const Dotenv = require('dotenv-webpack');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const watch = process.argv[2] === '--watch';

const distPackage = {
    name: 'dist-server',
    private: true,
    version: '1.0.0',
    main: './index.js',
    scripts: {
        start: 'node index.js',
    },
};

const config = {
    entry: ['./src/index.ts'],
    mode: 'development',
    target: 'node',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@server': path.resolve(__dirname, 'src'),
            '@shared': path.resolve(__dirname, '../client/src/shared'),
        },
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
        new Dotenv({
            path: path.resolve(__dirname, '.env'),
        }),
        new GeneratePackageJsonPlugin(
            distPackage,
            path.resolve(__dirname, './package.json'),
        ),
    ],
    externals: [
        { mongoose: 'commonjs mongoose' },
        { express: 'commonjs express' },
    ],
};

if (watch) {
    config.plugins.push(
        new WebpackShellPlugin({
            onBuildEnd: ['nodemon dist/index.js --watch dist'],
        }),
    );
}

module.exports = config;
