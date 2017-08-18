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

const openDir = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(output, { encoding: "utf8" }, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};

const getDirStats = fd => {
  return new Promise((resolve, reject) => {
    fs.fstat(fd, (err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};

const openFile = (path, file) => {
  return new Promise((resolve, reject) => {
    fs.open(`${path}/${file}`, "r", (err, fd) => {
      if (err) reject(err);
      resolve(fd);
    });
  });
};

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

cleanupOutput().then(() => {
  compile(compiler)
    .then(async stats => {
      // console.log(JSON.stringify(stats, null, 2));
      // const files = await openDir(output);
      // const fileSizes = await Promise.all(
      //   files.map(async fileName => {
      //     const file = await openFile(output, fileName);
      //     const fileStats = await getDirStats(file);
      //     return {
      //       fileName,
      //       size: fileStats.size
      //     };
      //   })
      // );
      // const data = {};
      // data.totalModules = stats.modules.length;
      // data.assetsByChunkName = stats.assetsByChunkName;
      // data.entrypoints = Object.keys(
      //   stats.entrypoints
      // ).reduce((acc, val, key) => {
      //   const files = stats.entrypoints[val].assets.map(entryFile => {
      //     const min = fileSizes.filter(file => {
      //       return (
      //         file.fileName.includes(entryFile) &&
      //         !file.fileName.includes(".gz")
      //       );
      //     });
      //     return {
      //       min
      //     };
      //   });
      //   acc[val] = {
      //     files
      //   };
      //   return acc;
      // }, {});
      // data.buildTime = stats.time;
      // await writeFile("build_stats.json", JSON.stringify(data, null, 2));
    })
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
