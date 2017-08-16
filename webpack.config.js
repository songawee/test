const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./demo/index.js"
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
    new CompressionPlugin({
      asset: "[file].gz",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 2,
      minRatio: 0.8
    })
  ]
};
