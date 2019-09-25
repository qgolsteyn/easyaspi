/**
 * This file specifies the configuration for webpack
 */

module.exports = {
    entry: ['./src/index.ts'],
    mode: 'development',
    target: 'node',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        library: 'shared',
        libraryTarget: 'umd',
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
};
