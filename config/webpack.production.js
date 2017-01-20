import _ from 'lodash';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import common from './webpack.common';
import * as parts from './webpack.parts';


export default (options) => {

  const {
    paths: {
      app,
      build,
      rootPath
    },
    useSourceMap,
    dropConsole
  } = options;

  const plugins = [

    new CleanWebpackPlugin([build], {
      root: rootPath
    }),

    parts.prodHtmlWebpackPlugin(options),

    // https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: useSourceMap,
      compress: {
        warnings: false,
        drop_console: dropConsole
      },
    }),

    useSourceMap ? new webpack.SourceMapDevToolPlugin({
      append: `\n//# sourceMappingURL=[url]`
    }) : null,

  ];

  const config = {

    entry: {
      app: app
    },

    output: {
      path: build,
      filename: '[name].[hash].js',
      // sourceMapFilename: '[file].map'
    },

    performance: {
      hints: "warning"
    },

    plugins: _.compact(plugins),

    // devtool: useSourceMap ? 'source-map' : ''

    bail: true

  };

  return merge(
    common(options),
    parts.buildScss({
      useSourceMap
    }),
    config
  );
}
