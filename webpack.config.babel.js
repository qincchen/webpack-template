import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack template'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules')
    ])
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
  }

};

export default (env) => {

  return config;
}
