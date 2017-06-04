const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCss = new ExtractTextPlugin({
  filename: 'style.[contenthash].css',
  allChunks: true,
});

const config = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash].js',
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, 'src')],
        use: extractCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { autoprefixer },
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
            loader: 'react-hot-loader/webpack',
          },
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
    extractCss,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  console.log(`${process.env.NODE_ENV} mode.`);

  config.devtool = 'source-map';

  config.plugins.push(
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
    })
  );
} else {
  console.log(`${process.env.NODE_ENV} mode.`);

  // config.devtool = 'inline-source-map';
  config.devtool = 'eval';

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    host: '127.0.0.1',
    hot: true,
  };
}

module.exports = config;
