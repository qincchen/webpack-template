import path from 'path';
import webpack from 'webpack';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';

export default ({
  paths: {
    rootPath
  }
}) => {

  return {

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
          enforce: 'pre', // preloaders
          loader: 'eslint-loader',
          options: {
            formatter: require("eslint-friendly-formatter")
          }
        }
      ]
    },

    plugins: [
      new webpack.WatchIgnorePlugin([
        path.join(rootPath, 'node_modules')
      ]),

      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      })
    ]

  };
};
