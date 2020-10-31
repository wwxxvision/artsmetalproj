const path = require("path");
const STATIC = {
  ENTRY_APP: "/js/index.js",
  OUTPUT_PATH: path.resolve(__dirname, "dist"),
  OUTPUT_FILENAME: "bundle.js",
  BUILD_DIR: "dist",
  DEVELOPMENT_DIR: "src",
};

module.exports = STATIC;
