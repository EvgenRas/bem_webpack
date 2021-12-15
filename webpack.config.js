const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, path.basename(__dirname))
};
const PAGES = {
  index: path.resolve(PATHS.src, 'pages', 'index'),
  color: path.resolve(PATHS.src, 'pages', 'color'),
};
module.exports = {
  entry: {
    index: path.resolve(PAGES.index, 'index.js'),
    color: path.resolve(PAGES.color, 'color.js')
  },
  output: {
    filename: 'js/[name][contenthash].js',
    path: PATHS.dist
    // clean: true
  },
  devServer: {
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PAGES.index}/index.pug`,
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES.color}/color.pug`,
      filename: 'color.html',
      chunks: ['color'],
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash].css',
      chunkFilename: 'index',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash].css',
      chunkFilename: 'color',
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cleanCssMinify
        ],
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          compress: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          'group-css-media-queries-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // type: 'asset/resource',
        // generator: {
        //   filename: 'img/[hash][ext]',
        // },
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      }
    ]
  }
}