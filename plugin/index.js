const fs = require("fs");

class BuildStatsPlugin {
  constructor(options = {}) {
    this.buildStatsFile = options.buildStatsFile || "build_stats.json";
  }

  apply(compiler) {
    compiler.plugin("done", rawStats => {
      const stats = rawStats.toJson();

      const assets = stats.assets;
      const computedAssets = assets.map(asset => {
        return {
          fileName: asset.name,
          size: asset.size
        };
      });
      const assetsByChunkName = Object.keys(
        stats.assetsByChunkName
      ).reduce((acc, val) => {
        if (typeof stats.assetsByChunkName[val] === "object") {
          acc[val] = stats.assetsByChunkName[val];
        } else {
          acc[val] = [stats.assetsByChunkName[val]];
        }
        return acc;
      }, {});
      const entrypoints = stats.entrypoints;

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
        assets: computedAssets,
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
