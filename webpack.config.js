const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry file
  entry: [
    './src/js/index.js'
  ],

  // Output file
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist') // Add output path
  },

  // Source maps for easier debugging
  devtool: "source-map",

  module: {
    rules: [
      // Transpile js with babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },

      // Compile SCSS to CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },

      // Include fonts from css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },

      // Include images from css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    // Include html file, styles and scripts will be automatically injected
    new HtmlWebpackPlugin({
      title: 'Webpack 5 Starter',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      }
    }),

    // Extract styles to a separate file
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    // Copy images
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/img',
          to: 'img',
        },
      ]
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Updated from contentBase
    compress: true,
    port: 9000,
    hot: true, // Enable Hot Module Replacement
    watchFiles: {
      paths: ['src/**/*'], // Watch for changes in source files
    },
    client: {
      overlay: true // Show errors and warnings in the browser
    }
  },
};
