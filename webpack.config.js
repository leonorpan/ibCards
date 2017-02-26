
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
})

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },{
            test: /\.scss$/,
            use: extractSass.extract({
                use: "css-loader!sass-loader!postcss-loader",
                fallbackLoader: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};