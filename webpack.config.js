var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            sinon: 'sinon/pkg/sinon'
        }
    },
    
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin()
  ],
  module: {
      noParse: [
      /node_modules\/sinon\//,
    ],
    preLoaders: [
        {
          test: /.spec.js\.js$/,
          include: /src/,
          exclude: /tests/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
        {
          test: /\.js?$\*.spec.js$/,
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
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}