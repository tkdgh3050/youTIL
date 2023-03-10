const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
import common from "./webpack.common";

const config = merge(common, {
  mode: "production", //production //development
  devtool: "hidden-source-map", // hidden-source-map //eval
  plugins: [new HtmlWebpackPlugin({ template: `./index.html` }), new CleanWebpackPlugin()],
});
export default config;
