const moment = require("moment");

console.log("hai there");
console.log("yo!");

import(/* webpackChunkName: "dynamic" */ "./dynamic").then(module => {
  console.log(module);
});
