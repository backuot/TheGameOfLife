var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin()
  ],

  module: {
    preLoaders: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /tests/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
        {
          test: /\.js?$/,
          include: /src/,
          exclude: /tests/,
          loader: 'babel-istanbul',
          query: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.js$/,
          loaders: ['eslint'],
          include: [
            path.resolve(__dirname, "src"),
          ],
        }
    ],
    loaders: [
      {
        test: /sinon\/pkg\/sinon\.js/,
        loader: 'legacy!imports?define=>false,require=>false',
      },
      {
        loaders: ['react-hot', 'babel-loader'],
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2|ico)$/,
        loader: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.scss$/,
        loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'resolve-url',
            'sass?sourceMap',
        ]
      },
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}
