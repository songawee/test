const moment = require("moment");

console.log("hai there");

import(/* webpackChunkName: "dynamic" */ "dynamic").then(module => {
  console.log(module);
});
