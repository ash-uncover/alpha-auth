/* eslint-disable */

const path = require('path')

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const transformPlugin = (buffer) => {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = 'http://localhost:8080'
  return JSON.stringify(plugin, null, 2)
}

module.exports = merge(common, {
  mode: 'development',

  output: {
    clean: true,
    path: DIR_DIST,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/logo_48.png',
      template: './src/index.html',
      title: 'Manage your Alpha Account',
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'plugin.json'),
        to: '.',
        transform: transformPlugin
      }],
    }),
  ],

  devtool: 'eval-source-map',

  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: DIR_PUBLIC,
    },
  },
})
