var autoprefixer = require('autoprefixer')
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './app')
];

module.exports = {
    debug: true,

    entry: "./app/main.js",

    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },

    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
            // Exclude the resource sass files that are going to be compiled in single file
            exclude: /^\_.*scss$/
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=image/svg+xml'
        }, {
            test: /\.png$/,
            loader: 'url-loader?limit=100000&mimetype=image/png'
        }, {
            test: /\.jpg$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.sass'],
        modulesDirectories: [
            'node_modules',
            'app/vendor'
        ]
    }
};
