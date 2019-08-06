const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const outputPath = path.resolve(__dirname, 'demo_dist')

module.exports = ({ mode = 'production' } = {}) => {
  const productionOnlyPlugins = [
    new MiniCssExtractPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
  ]

  const devOnlyPlugins = [new webpack.HotModuleReplacementPlugin()]

  const extraPlugins =
    mode === 'production' ? productionOnlyPlugins : devOnlyPlugins

  const devOnlyConfig = {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: outputPath,
      hot: true,
    },
  }

  const productionOnlyConfig = {
    // could be removed in webpack 5 if they add a CSS minifier
    optimization: {
      minimizer: [
        // new UglifyJsPlugin({
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true, // set to true if you want JS source maps
        // }),
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  }

  const extraConfig =
    mode === 'production' ? productionOnlyConfig : devOnlyConfig

  return {
    entry: path.resolve(__dirname, 'demo/index.js'),
    mode,
    output: {
      path: outputPath,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },

    ...extraConfig,

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'demo/index.html'),
      }),
      ...extraPlugins,
    ],
  }
}
