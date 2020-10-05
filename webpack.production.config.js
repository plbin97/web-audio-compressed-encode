const path = require('path');
let yourProductionFileName = require('./config').yourProductionFileName;

module.exports = {
    mode: "production",
    entry: ['babel-polyfill', './compressor/index.js'],  // Entry file

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: yourProductionFileName,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
};