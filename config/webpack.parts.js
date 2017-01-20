import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';
import StyleLint from 'stylelint';

export const lintCss = () => {
  const rules = {
    'color-hex-case': 'lower',
  };

  return {
    module: {
      rules: [
        {
          test: /\.css$|\.scss$/,
          enforce: 'pre',

          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: function () {
              return [
                StyleLint({
                  rules: rules,
                  // Ignore node_modules CSS
                  ignoreFiles: 'node_modules/**/*.css',
                }),
              ];
            },
          },
        },
      ],
    },
  };
};

export const extractBundles = (bundles, options) => {
  const entry = {};
  const names = [];

  // Set up entries and names.
  bundles.forEach(({name, entries}) => {
    if (entries) {
      entry[name] = entries;
    }

    names.push(name);
  });

  return {
    // Define an entry point needed for splitting.
    entry,
    plugins: [
      // Extract bundles.
      new webpack.optimize.CommonsChunkPlugin({
        ...options,
        names
      })
    ]
  };
};

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
      new ExtractTextPlugin('[name].[contenthash].css')
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
