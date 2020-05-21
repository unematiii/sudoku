const package = require("./package.json");
const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: {
        client: ['./src/index.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[local]--[hash:base64:5]',
                        },
                    },
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                include: /node_modules/,
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.png($|\?)|\.svg($|\?)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                },
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    allowTsInNodeModules: true,
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, '.'), 'node_modules'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: package.description,
            template: './index.html'
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                },
            },
        },
    },
    stats: {
        moduleTrace: true,
        errorDetails: true,
    },
};

module.exports = (env, argv) => {
    // Development
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.devServer = {
            publicPath: '/',
            historyApiFallback: true,
            host: '0.0.0.0',
            port: 8080,
            disableHostCheck: true,
        }
    }

    // Production
    if (argv.mode === 'production') {
        config.plugins = config.plugins.concat([
            new CleanWebpackPlugin(),
        ]);
    }

    return config;
};
