/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function transformPlugin (buffer) {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = 'https://ash-uncover.github.io/alpha-auth'
  return JSON.stringify(plugin, null, 2)
}

module.exports = merge(common, {
  mode: 'production',

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/logo_48.png',
      template: './src/index_github.html',
      title: 'Alpha Account',
      publicPath: '/alpha-auth'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'plugin.json'),
        to: '.',
        transform: transformPlugin
      }, {
        from: DIR_PUBLIC,
        to: '.',
      }],
    }),
    new webpack.EnvironmentPlugin({
      ALPHA_AUTH_REST_URL: "https://alpha-auth-api.onrender.com",
      ALPHA_AUTH_PLUGIN: 'https://ash-uncover.github.io/alpha-auth/plugin.json',
      ALPHA_AUTH_PUBLIC: '/alpha-auth',
      ALPHA_AUTH_ENVIRONMENT: 'github',
    }),
  ]
})