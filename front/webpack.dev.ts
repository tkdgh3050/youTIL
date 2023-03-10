const { merge } = require("webpack-merge");
const path = require("path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
import common from "./webpack.common";

const config = merge(common, {
  mode: "development", //production //development
  devtool: "eval", // hidden-source-map //eval
  module: {
    rules: [
      {
        loader: "babel-loader",
        options: { plugins: ["react-refresh/babel"] },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-report.json",
    }),
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    historyApiFallback: true, //reloading 했을 때 react-router 가 404 뜨는 거 방지
  },
});
export default config;
