const webpack = require('webpack');

module.exports = {

    entry:  './verifier.js',
    
    mode: 'production', // 或者 'development'

    // 输出
    output: {
        // 带五位hash值的js
        // filename: '[name].[fullhash:5].js',
        filename: 'dvf.[hash:5].js',
        libraryTarget: 'var',
        library: 'dvf',
    },

    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],

    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        }
    },
}