const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');

module.exports = {
  context: path.resolve('src'),

  mode: 'production',

/*   optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }, */

  resolve: {
    alias: {
      store: path.resolve(__dirname, 'src/js/store'),
      utils: path.resolve(__dirname, 'src/js/utils'),
      graphQLClient: path.resolve(__dirname, 'src/js/graphQLClient')
    },
    extensions: ['.js', '.jsx', '.json']
  },

  entry: {
    app: ['@babel/polyfill', './js/index.jsx', './js/store/index.js', './sass/common.sass']
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve('src/bundle')
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer'), require('cssnano')]
              }
            },
            {
              loader: 'sass-loader',
              query: { outputStyle: 'expanded'}
            }
          ]
        })
      },
      {
        test: /\.js$/&&/\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('../css/[name].min.css'),
    new BrowserSyncPlugin({
      server: { baseDir: ['src'], middleware: [ historyApiFallback() ] },
      files: ['src/**/*.html'],
      notify: false
    })
  ]
}