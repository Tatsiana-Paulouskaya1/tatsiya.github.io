const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: [
        './app.js'
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/assets/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node-modules/
            }
        ]
    },
    devtool: "eval",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
}