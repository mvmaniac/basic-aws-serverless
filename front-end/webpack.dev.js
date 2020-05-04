const childProcess = require('child_process');

const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('')
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        MODE: '(개발용)'
      }
    })
  ],
  devServer: {
    port: 9000,
    hot: true
  }
});