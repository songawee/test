const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const BuildStatsPlugin = require("./plugin");

module.exports = {
  entry: {
    app: "./app/index.js",
    other: "./app/other.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./lib")
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["runtime"],
      minChunks: Infinity
    }),
    new BuildStatsPlugin()
  ]
};
