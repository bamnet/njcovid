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
      template: 'src/assets/index.html',
      image: 'https://quickchart.io/chart?w=1200&amp;h=630&amp;c=%7B%22type%22%3A%22line%22%2C%22options%22%3A%7B%22legend%22%3A%7B%22position%22%3A%22right%22%7D%7D%2C%22data%22%3A%7B%22labels%22%3A%5B%22Mar%2026%22%2C%22Mar%2027%22%2C%22Mar%2028%22%2C%22Mar%2029%22%2C%22Mar%2030%22%2C%22Mar%2031%22%2C%22Apr%201%22%2C%22Apr%202%22%2C%22Apr%203%22%2C%22Apr%204%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Unknown%22%2C%22data%22%3A%5B1478%2C1984%2C2478%2C3020%2C3847%2C3686%2C4512%2C4866%2C4808%2C3935%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%233366cc%22%2C%22pointBackgroundColor%22%3A%22%233366cc%22%7D%2C%7B%22label%22%3A%22Bergen%22%2C%22data%22%3A%5B1206%2C1505%2C1838%2C2169%2C2482%2C2909%2C3494%2C4099%2C4866%2C5760%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23dc3912%22%2C%22pointBackgroundColor%22%3A%22%23dc3912%22%7D%2C%7B%22label%22%3A%22Essex%22%2C%22data%22%3A%5B609%2C826%2C1086%2C1227%2C1564%2C1900%2C2262%2C2617%2C3067%2C3584%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23ff9900%22%2C%22pointBackgroundColor%22%3A%22%23ff9900%22%7D%2C%7B%22label%22%3A%22Hudson%22%2C%22data%22%3A%5B441%2C594%2C771%2C974%2C1314%2C1606%2C1910%2C2270%2C2835%2C3491%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23109618%22%2C%22pointBackgroundColor%22%3A%22%23109618%22%7D%2C%7B%22label%22%3A%22Union%22%2C%22data%22%3A%5B432%2C519%2C742%2C896%2C1213%2C1418%2C1661%2C2010%2C2487%2C2916%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23990099%22%2C%22pointBackgroundColor%22%3A%22%23990099%22%7D%2C%7B%22label%22%3A%22Middlesex%22%2C%22data%22%3A%5B505%2C640%2C808%2C938%2C1123%2C1277%2C1493%2C1766%2C2125%2C2578%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%230099c6%22%2C%22pointBackgroundColor%22%3A%22%230099c6%22%7D%2C%7B%22label%22%3A%22Passaic%22%2C%22data%22%3A%5B399%2C484%2C608%2C831%2C1091%2C1294%2C1494%2C1750%2C2216%2C2856%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23dd4477%22%2C%22pointBackgroundColor%22%3A%22%23dd4477%22%7D%2C%7B%22label%22%3A%22Monmouth%22%2C%22data%22%3A%5B501%2C634%2C781%2C870%2C1030%2C1140%2C1301%2C1458%2C1743%2C2065%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2366aa00%22%2C%22pointBackgroundColor%22%3A%22%2366aa00%22%7D%2C%7B%22label%22%3A%22Ocean%22%2C%22data%22%3A%5B389%2C484%2C624%2C759%2C874%2C1022%2C1209%2C1371%2C1685%2C2003%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23b82e2e%22%2C%22pointBackgroundColor%22%3A%22%23b82e2e%22%7D%2C%7B%22label%22%3A%22Morris%22%2C%22data%22%3A%5B315%2C391%2C442%2C566%2C720%2C841%2C942%2C1082%2C1298%2C1618%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23316395%22%2C%22pointBackgroundColor%22%3A%22%23316395%22%7D%2C%7B%22label%22%3A%22Somerset%22%2C%22data%22%3A%5B179%2C222%2C258%2C295%2C349%2C413%2C472%2C549%2C641%2C765%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23994499%22%2C%22pointBackgroundColor%22%3A%22%23994499%22%7D%2C%7B%22label%22%3A%22Mercer%22%2C%22data%22%3A%5B111%2C131%2C168%2C202%2C249%2C268%2C333%2C386%2C484%2C586%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2322aa99%22%2C%22pointBackgroundColor%22%3A%22%2322aa99%22%7D%2C%7B%22label%22%3A%22Camden%22%2C%22data%22%3A%5B73%2C95%2C123%2C163%2C200%2C228%2C289%2C343%2C406%2C481%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23aaaa11%22%2C%22pointBackgroundColor%22%3A%22%23aaaa11%22%7D%2C%7B%22label%22%3A%22Burlington%22%2C%22data%22%3A%5B64%2C88%2C115%2C142%2C178%2C202%2C255%2C294%2C367%2C469%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%236633cc%22%2C%22pointBackgroundColor%22%3A%22%236633cc%22%7D%2C%7B%22label%22%3A%22Sussex%22%2C%22data%22%3A%5B49%2C65%2C81%2C93%2C113%2C132%2C158%2C179%2C210%2C236%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23e67300%22%2C%22pointBackgroundColor%22%3A%22%23e67300%22%7D%2C%7B%22label%22%3A%22Gloucester%22%2C%22data%22%3A%5B33%2C40%2C51%2C72%2C89%2C114%2C149%2C169%2C183%2C215%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%238b0707%22%2C%22pointBackgroundColor%22%3A%22%238b0707%22%7D%2C%7B%22label%22%3A%22Hunterdon%22%2C%22data%22%3A%5B39%2C52%2C61%2C66%2C79%2C97%2C117%2C130%2C148%2C171%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23651067%22%2C%22pointBackgroundColor%22%3A%22%23651067%22%7D%2C%7B%22label%22%3A%22Warren%22%2C%22data%22%3A%5B31%2C38%2C51%2C56%2C68%2C76%2C96%2C116%2C149%2C182%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23329262%22%2C%22pointBackgroundColor%22%3A%22%23329262%22%7D%2C%7B%22label%22%3A%22Atlantic%22%2C%22data%22%3A%5B10%2C14%2C17%2C24%2C29%2C31%2C40%2C50%2C72%2C98%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%235574a6%22%2C%22pointBackgroundColor%22%3A%22%235574a6%22%7D%2C%7B%22label%22%3A%22Cape%20May%22%2C%22data%22%3A%5B6%2C7%2C7%2C9%2C9%2C12%2C22%2C34%2C44%2C50%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%233b3eac%22%2C%22pointBackgroundColor%22%3A%22%233b3eac%22%7D%2C%7B%22label%22%3A%22Cumberland%22%2C%22data%22%3A%5B4%2C9%2C11%2C11%2C12%2C18%2C27%2C31%2C36%2C40%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23b77322%22%2C%22pointBackgroundColor%22%3A%22%23b77322%22%7D%2C%7B%22label%22%3A%22Salem%22%2C%22data%22%3A%5B2%2C3%2C3%2C3%2C3%2C12%2C19%2C20%2C25%2C25%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2316d620%22%2C%22pointBackgroundColor%22%3A%22%2316d620%22%7D%5D%7D%7D',
      description: 'Positive Cases: 34,124 (+4,229 / +14%), Confirmed Deaths: 846 (+204 / +32%) as of Apr 4'
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