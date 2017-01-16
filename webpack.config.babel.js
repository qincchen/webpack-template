import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const config = {

  entry: {
    app: PATHS.app
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
    // sourceMapFilename: '[file].map'
  },

  plugins: [

    new HtmlWebpackPlugin({
      title: 'Webpack template',
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      mobile: true,
      inject: false
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules')
    ]),

    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     eslint: {
    //       formatter: require("eslint-friendly-formatter")
    //     }
    //   }
    // }),

    // new ExtractTextPlugin("style.css")
  ],

  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }

    // hotOnly: true,
    // stats: 'errors-only',
    // contentBase: './build'
  },

  performance: {
    hints: false
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // include: PATHS.app,
        enforce: 'pre', // preloaders
        loader: 'eslint-loader',
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.scss$/,

        // loader: ExtractTextPlugin.extract({
        //   loader: './node_modules/css-loader?sourceMap!./node_modules/sass-loader?sourceMap'
        // }),

        // loader: ExtractTextPlugin.extract({
        //   fallbackLoader: {
        //     loader: 'style-loader',
        //     query: {
        //       sourceMap: true
        //     }
        //   },
        //   loader: [
        //     {
        //       loader: 'css-loader',
        //       query: {
        //         sourceMap: true
        //       }
        //     },
        //     {
        //       loader: 'sass-loader',
        //       query: {
        //         sourceMap: true
        //       }
        //     }
        //   ]
        // })

        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  // devtool: 'source-map', // production
  devtool: 'eval-source-map',
  // devtool: 'module-inline-source-map'

};

export default (env) => {

  return config;
};
