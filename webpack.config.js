const path = require('path');
module.exports = {
    mode: "development",
    devtool: "source-map", // Enable source map for debugging
    devServer: {
        contentBase: './public',
        filename: 'webAudioCompressedEncode.js',
        index: 'index.html',
        publicPath: '/dist/',
        liveReload: true,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        writeToDisk: true
    },
    entry: ['babel-polyfill', './index.js'],  // Entry file

    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: 'webAudioCompressedEncode.js',
    },
    module: {
        rules: [
            { // model for sass
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        publicPath: './dist/'
                    }
                }
            }
        ]
    },
};