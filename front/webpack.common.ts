const path = require("path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
//TODO: mode, devtool 배포시 변경
const config: Configuration = {
  name: "youTIL",
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
  entry: {
    app: ["./pages/client"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader", //tsx 파일을 ts-loader를 사용해서 맞는 문법으로 변경
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshPlugin(), new ForkTsCheckerWebpackPlugin()],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
export default config;
