const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function() {
  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        }
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ],
      extensions: ['.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: "public", to: "./" },
        ],
      }),
    ],
  }
}
