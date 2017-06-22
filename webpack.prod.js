const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const myPort = 9001;

const extractCSS = new ExtractTextPlugin({
  filename: 'style.[contenthash].css',
  allChunks: true,
});

const config = {
  entry: {
    app: './src/index.jsx',
    vendor: ['babel-polyfill', 'react-hot-loader/patch', 'whatwg-fetch'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, 'src')],
        use: extractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [require('autoprefixer')()],
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif|bmp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 65,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeEmptyAttrs: false,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/common',
        to: './common',
      },
      {
        from: './src/config.js',
        to: './config.js',
      },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[hash].js.map',
      exclude: ['vendor.js'],
    }),
    new UglifyJSPlugin({
      compress: {
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: false,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        cascade: true,
        side_effects: true,
        warnings: false,
      },
      mangle: true,
      sourceMap: true,
    }),
    extractCSS,
  ],
};

module.exports = config;
