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
      API_URL: JSON.stringify(
        'https://j2bus311n1.execute-api.ap-northeast-2.amazonaws.com/dev'
      )
    }),

    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      filename: 'index.html',
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
