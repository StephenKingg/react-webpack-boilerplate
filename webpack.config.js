const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'style.[contenthash].css',
  allChunks: true,
});

const config = {
  entry: {
    app: './src/index.jsx',
    vendor: ['babel-polyfill', 'whatwg-fetch', 'react-hot-loader/patch'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
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
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    extractCSS,
  ],
};

if (process.env.NODE_ENV === 'production') {
  console.log(`${process.env.NODE_ENV} mode.`);

  config.devtool = false;

  config.plugins.push(
    new CopyWebpackPlugin([
      {
        from: './src/common',
        to: './common',
      }, {
        from: './index.js',
        to: './index.js',
      }, {
        from: './start.bat',
        to: './start.bat',
      }, {
        from: './src/config.js',
        to: './config.js',
      }
    ]),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  );
} else {
  console.log(`${process.env.NODE_ENV} mode.`);

  config.devtool = 'eval';

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.devServer = {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    host: '127.0.0.1',
    inline: true,
    hot: true,
    open: true,
  };
}

module.exports = config;
