const { merge } = require("webpack-merge");
import common from "./webpack.common";

const config = merge(common, {
  mode: "production", //production //development
  devtool: "hidden-source-map", // hidden-source-map //eval
});
export default config;
