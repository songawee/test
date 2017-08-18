const fs = require("fs");
const rimraf = require("rimraf");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");

const compiler = webpack(webpackConfig);
const output = webpackConfig.output.path;

const cleanupOutput = () => {
  return new Promise((resolve, reject) => {
    rimraf(output, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

const compile = compiler => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      resolve(stats.toJson());
    });
  });
};

cleanupOutput().then(() => {
  compile(compiler)
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
