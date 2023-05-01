import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import path from 'path';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  name: 'youTIL',
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  entry: {
    app: ['./pages/client'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader', // tsx 파일을 ts-loader를 사용해서 맞는 문법으로 변경
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './dist/public/',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  //
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};
export default config;
