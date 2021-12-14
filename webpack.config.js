const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, path.basename(__dirname))
};
const PAGES = {
  index: path.resolve(PATHS.src, 'pages', 'index'),
};
module.exports = {
  mode: 'development',
  entry: path.resolve(PATHS.src, 'pages', 'index.js'),
  output: {
    filename: '[name][contenthash].js',
    path: PATHS.dist,
    clean: true
  },
  devServer: {
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PAGES.index}/index.pug`,
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'bemdecl-to-fs-loader',
            options: { levels: [`${PATHS.src}/desktop`], extensions: ['css', 'scss', 'js'] } // Add css and js files of BEM entities to bundle
          },
          'html2bemdecl-loader' // First, convert HTML to bem DECL format
        ]
      },
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}