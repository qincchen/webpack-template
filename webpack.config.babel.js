import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

export default {

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
    })
  ]

};
