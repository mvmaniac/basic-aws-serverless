const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'none',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  entry: {
    // 따로 js 파일로 나오는 방식으로 사용
    'whatwg-fetch': 'whatwg-fetch',
    bundle: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: '[name][ext]?[hash]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10KB
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      // https://github.com/browserslist/browserslist 참고
                      browsers: ['defaults']
                    },
                    useBuiltIns: 'usage',
                    corejs: {version: 3, proposals: true}
                  }
                ]
              ],
              plugins: []
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['.js']
    })
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
