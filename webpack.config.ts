import * as path from 'path';
import * as webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
      image: 'https://quickchart.io/chart?w=1200&h=630&c=%7B%22type%22%3A%22line%22%2C%22options%22%3A%7B%22legend%22%3A%7B%22position%22%3A%22right%22%7D%7D%2C%22data%22%3A%7B%22labels%22%3A%5B%22Mar%2030%22%2C%22Mar%2031%22%2C%22Apr%201%22%2C%22Apr%202%22%2C%22Apr%203%22%2C%22Apr%204%22%2C%22Apr%205%22%2C%22Apr%206%22%2C%22Apr%207%22%2C%22Apr%208%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Bergen%22%2C%22data%22%3A%5B2482%2C2909%2C3494%2C4099%2C4866%2C5760%2C6187%2C6862%2C7533%2C7874%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%233366cc%22%2C%22pointBackgroundColor%22%3A%22%233366cc%22%7D%2C%7B%22label%22%3A%22Unknown%22%2C%22data%22%3A%5B3847%2C3686%2C4512%2C4866%2C4808%2C3935%2C3821%2C3521%2C2220%2C1362%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23dc3912%22%2C%22pointBackgroundColor%22%3A%22%23dc3912%22%7D%2C%7B%22label%22%3A%22Essex%22%2C%22data%22%3A%5B1564%2C1900%2C2262%2C2617%2C3067%2C3584%2C4082%2C4493%2C5078%2C5598%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23ff9900%22%2C%22pointBackgroundColor%22%3A%22%23ff9900%22%7D%2C%7B%22label%22%3A%22Hudson%22%2C%22data%22%3A%5B1314%2C1606%2C1910%2C2270%2C2835%2C3491%2C3924%2C4395%2C4949%2C5437%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23109618%22%2C%22pointBackgroundColor%22%3A%22%23109618%22%7D%2C%7B%22label%22%3A%22Union%22%2C%22data%22%3A%5B1213%2C1418%2C1661%2C2010%2C2487%2C2916%2C3216%2C3685%2C4358%2C4831%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23990099%22%2C%22pointBackgroundColor%22%3A%22%23990099%22%7D%2C%7B%22label%22%3A%22Passaic%22%2C%22data%22%3A%5B1091%2C1294%2C1494%2C1750%2C2216%2C2856%2C3227%2C3756%2C4101%2C4372%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%230099c6%22%2C%22pointBackgroundColor%22%3A%22%230099c6%22%7D%2C%7B%22label%22%3A%22Middlesex%22%2C%22data%22%3A%5B1123%2C1277%2C1493%2C1766%2C2125%2C2578%2C2950%2C3263%2C3717%2C4156%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23dd4477%22%2C%22pointBackgroundColor%22%3A%22%23dd4477%22%7D%2C%7B%22label%22%3A%22Monmouth%22%2C%22data%22%3A%5B1030%2C1140%2C1301%2C1458%2C1743%2C2065%2C2354%2C2545%2C2770%2C3038%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2366aa00%22%2C%22pointBackgroundColor%22%3A%22%2366aa00%22%7D%2C%7B%22label%22%3A%22Ocean%22%2C%22data%22%3A%5B874%2C1022%2C1209%2C1371%2C1685%2C2003%2C2177%2C2374%2C2641%2C2856%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23b82e2e%22%2C%22pointBackgroundColor%22%3A%22%23b82e2e%22%7D%2C%7B%22label%22%3A%22Morris%22%2C%22data%22%3A%5B720%2C841%2C942%2C1082%2C1298%2C1618%2C1800%2C1956%2C2239%2C2468%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23316395%22%2C%22pointBackgroundColor%22%3A%22%23316395%22%7D%2C%7B%22label%22%3A%22Somerset%22%2C%22data%22%3A%5B349%2C413%2C472%2C549%2C641%2C765%2C833%2C902%2C1033%2C1189%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23994499%22%2C%22pointBackgroundColor%22%3A%22%23994499%22%7D%2C%7B%22label%22%3A%22Mercer%22%2C%22data%22%3A%5B249%2C268%2C333%2C386%2C484%2C586%2C654%2C740%2C837%2C992%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2322aa99%22%2C%22pointBackgroundColor%22%3A%22%2322aa99%22%7D%2C%7B%22label%22%3A%22Camden%22%2C%22data%22%3A%5B200%2C228%2C289%2C343%2C406%2C481%2C556%2C645%2C736%2C838%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23aaaa11%22%2C%22pointBackgroundColor%22%3A%22%23aaaa11%22%7D%2C%7B%22label%22%3A%22Burlington%22%2C%22data%22%3A%5B178%2C202%2C255%2C294%2C367%2C469%2C547%2C646%2C733%2C801%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%236633cc%22%2C%22pointBackgroundColor%22%3A%22%236633cc%22%7D%2C%7B%22label%22%3A%22Sussex%22%2C%22data%22%3A%5B113%2C132%2C158%2C179%2C210%2C236%2C267%2C292%2C331%2C357%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23e67300%22%2C%22pointBackgroundColor%22%3A%22%23e67300%22%7D%2C%7B%22label%22%3A%22Gloucester%22%2C%22data%22%3A%5B89%2C114%2C149%2C169%2C183%2C215%2C248%2C279%2C311%2C340%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%238b0707%22%2C%22pointBackgroundColor%22%3A%22%238b0707%22%7D%2C%7B%22label%22%3A%22Hunterdon%22%2C%22data%22%3A%5B79%2C97%2C117%2C130%2C148%2C171%2C189%2C211%2C234%2C255%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23651067%22%2C%22pointBackgroundColor%22%3A%22%23651067%22%7D%2C%7B%22label%22%3A%22Warren%22%2C%22data%22%3A%5B68%2C76%2C96%2C116%2C149%2C182%2C195%2C215%2C255%2C289%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23329262%22%2C%22pointBackgroundColor%22%3A%22%23329262%22%7D%2C%7B%22label%22%3A%22Atlantic%22%2C%22data%22%3A%5B29%2C31%2C40%2C50%2C72%2C98%2C121%2C132%2C144%2C168%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%235574a6%22%2C%22pointBackgroundColor%22%3A%22%235574a6%22%7D%2C%7B%22label%22%3A%22Cape%20May%22%2C%22data%22%3A%5B9%2C12%2C22%2C34%2C44%2C50%2C77%2C85%2C94%2C100%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%233b3eac%22%2C%22pointBackgroundColor%22%3A%22%233b3eac%22%7D%2C%7B%22label%22%3A%22Cumberland%22%2C%22data%22%3A%5B12%2C18%2C27%2C31%2C36%2C40%2C54%2C64%2C71%2C80%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%23b77322%22%2C%22pointBackgroundColor%22%3A%22%23b77322%22%7D%2C%7B%22label%22%3A%22Salem%22%2C%22data%22%3A%5B3%2C12%2C19%2C20%2C25%2C25%2C26%2C29%2C31%2C36%5D%2C%22fill%22%3Afalse%2C%22borderColor%22%3A%22%2316d620%22%2C%22pointBackgroundColor%22%3A%22%2316d620%22%7D%5D%7D%7D',
      description: 'Positive Cases: 47,437 (+3,021 / +7%), Confirmed Deaths: 1,504 (+272 / +22%) as of Apr 8'
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