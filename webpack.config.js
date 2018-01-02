const path = require('path')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const dirJs = path.resolve(__dirname, 'src')
const dirHtml = path.resolve(__dirname, 'html')
const dirBuild = path.resolve(__dirname, 'build')

module.exports = {
  entry: path.resolve(dirJs, 'index.js'),
  output: {
    path: dirBuild,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: dirBuild
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: dirJs,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: dirHtml } // to: output.path
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
