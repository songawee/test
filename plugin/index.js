const fs = require("fs");

class BuildStatsPlugin {
  constructor(options = {}) {
    this.buildStatsFile = options.buildStatsFile || "build_stats.json";
  }

  apply(compiler) {
    compiler.plugin("done", rawStats => {
      const stats = rawStats.toJson();

      const assets = stats.assets;
      const assetsByChunkName = stats.assetsByChunkName;
      const entrypoints = stats.entrypoints;
      // console.log(assetsByChunkName);
      // console.log(entrypoints);
      // console.log(assets);

      const entrypointsOutput = Object.keys(entrypoints).reduce((acc, val) => {
        const files = entrypoints[val].assets.map(asset => {
          return {
            fileName: asset,
            size: assets.find(rawAsset => rawAsset.name === asset).size
          };
        });

        acc[val] = {
          files
        };
        return acc;
      }, {});

      const output = {
        assetsByChunkName,
        buildTime: stats.time,
        entrypoints: entrypointsOutput,
        totalModules: stats.modules.length
      };

      fs.writeFileSync(this.buildStatsFile, JSON.stringify(output, null, 2));
    });
  }
}

module.exports = BuildStatsPlugin;
