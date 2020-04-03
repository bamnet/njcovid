const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index2.html',
      template: 'src/assets/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/assets/index_old.html',
      chunks: [],
    }),
    new MomentLocalesPlugin(),
    new FaviconsWebpackPlugin({
      favicons: {
        appName: 'njcovid.info',
        appDescription: 'New Jersey COVID19 Stats',
        developerName: 'bamnet',
        developerURL: 'https://twitter.com/bamnet',
        start_url: null,
        icons: {
          appleStartup: false,
          coast: false,
          windows: false,
          yandex: false,
        },
      }
    }),
  ]
};

module.exports = config;