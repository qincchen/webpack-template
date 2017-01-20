import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';

const commonHtmlWebpackPlugin = {
  title: 'Webpack template',
  template: HtmlWebpackTemplate,
  appMountId: 'root',
  mobile: true,
  inject: false,
  meta: {
    description: 'The bestest webpack configuration.'
  },
  inlineManifestWebpackName: 'webpackManifest',
};

export const prodHtmlWebpackPlugin = ({
  templateFilePath,
  jsCdn,
  cssCdn
}) => {

  return new HtmlWebpackPlugin({
    ...commonHtmlWebpackPlugin,
    template: templateFilePath,
    jsCdn,
    cssCdn

    // NOTE: minifying requires another module (html-minifier)
    // not worth it!!
    // minify: isDev ? false : {
    //   collapseWhitespace: true,
    //   conservativeCollapse: true
    // }
  });
};

export const htmlWebpackPlugin = () => {

  return new HtmlWebpackPlugin(commonHtmlWebpackPlugin);
};

export const buildScss = ({
  useSourceMap
}) => {

  return {

    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: {
              loader: 'style-loader',
              query: {
                sourceMap: useSourceMap
              }
            },
            loader: [
              {
                loader: 'css-loader',
                query: {
                  sourceMap: useSourceMap,
                  minimize: true
                }
              },
              {
                loader: 'sass-loader',
                query: {
                  sourceMap: useSourceMap
                }
              }
            ]
          })
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash].css')
    ]

  };
};

export const loadScss = () => {

  return {

    module: {
      rules: [
        {
          test: /\.scss$/,
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
    }

  }
};
