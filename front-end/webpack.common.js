const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'none',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  entry: {
    bundle: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: '',
              name: '[name].[ext]?[hash]',
              limit: 10000 // 10KB
            }
          }
        ]
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
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
