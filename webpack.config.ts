import * as path from 'path';
import * as webpack from 'webpack';

import { loadData, countiesByWeight } from './src/data_loader';
import { staticURL } from './src/charts/county_cases';
import { summary } from './src/charts/summary_text';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const data = loadData();
const counties = countiesByWeight(data.county_stats);

const config: webpack.Configuration = {
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
      filename: 'index.html',
      template: 'src/assets/index.html',
      image: staticURL(data.county_stats, counties),
      description: summary(data.state_stats)
    }),
    new HtmlWebpackPlugin({
      filename: 'index_old.html',
      template: 'src/assets/index_old.html',
      chunks: [],
    }),
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

export default config;