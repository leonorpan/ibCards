
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
})

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: 'css-loader!sass-loader!postcss-loader',
                    fallbackLoader: 'style-loader',
                })
            },
            {
                loader: 'vue-loader',
                test: /\.vue$/,
            },
        ]
    },
    plugins: [
        extractSass,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'components': path.resolve(__dirname, './src/components'),
            'directives': path.resolve(__dirname, './src/directives'),
            'services': path.resolve(__dirname, './src/services'),
            'src': path.resolve(__dirname, './src'),
        }
    }
};