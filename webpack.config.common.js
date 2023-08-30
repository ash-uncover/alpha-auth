/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const DIR_BUILD = path.resolve(__dirname, 'dist')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')
const pathToReact = path.resolve(DIR_NODE_MODULES, 'react/dist/react.min.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(DIR_SRC, 'index.js'),

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      ALPHA_AUTH_REST_URL: 'http://localhost:8090'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '_redirects'), },
      ],
    }),
  ],

  output: {
    path: DIR_BUILD,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            url: {
              filter: (url, resourcePath) => {
                // Don't handle `images` urls
                if (url.includes('images/')) {
                  return false;
                }
                return true;
              },
            },
          } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        },
      },
      {
        test: /\.(_redirects)$/i,
        type: 'asset/resource',
      },
    ],
    noParse: [pathToReact],
  },
}
