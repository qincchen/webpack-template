import webpack from 'webpack';
import merge from 'webpack-merge';

import common from './webpack.common';
import * as parts from './webpack.parts';

export default (options) => {

  const {
    paths: {
      app,
      build
    },
  } = options;

  const config = {

    entry: [
     'react-hot-loader/patch',
      app
    ],

    output: {
      path: build,
      filename: '[name].js',
      pathinfo: true
      // sourceMapFilename: '[file].map'
    },

    performance: {
      // hints: false
    },

    plugins: [

      parts.htmlWebpackPlugin(true),

      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

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

    devtool: 'eval-source-map',

  };

  return merge(
    common(options),
    parts.lintCss(),
    parts.loadScss(),
    config
  );
}
