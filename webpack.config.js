const webpack = require('webpack');
var path = require("path");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
    dest: path.join(__dirname, 'dist')
  };

module.exports = {
    context: __dirname,
    entry: "./entry.jsx",
    output: {
        path: path.dest,
        filename: "app.js",
        devtoolModuleFilenameTemplate: '[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            },
        ]
    },
    devtool: 'source-maps',
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new LiveReloadPlugin(),
        new ExtractTextPlugin('index.css', {
            allChunks: true
        })
    ]
   
};
