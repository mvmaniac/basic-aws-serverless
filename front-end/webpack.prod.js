const webpack = require('webpack');
const {merge} = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(
        'https://56a0cbdhxd.execute-api.ap-northeast-2.amazonaws.com/dev'
      )
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      filename: 'index.html',
      template: './src/index.html',
      templateParameters: {
        MODE: ''
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsWebpackPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
});
