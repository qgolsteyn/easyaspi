module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    alias: {
                        '@client': './src',
                        '@shared': '../shared/index',
                    },
                },
            ],
        ],
    };
};
