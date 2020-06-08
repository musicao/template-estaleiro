const fs = require("fs");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require("webpack");
var path = require("path");

// Remove old static resources
childProcess.execSync(`rm -Rf ./dist`);

module.exports = {
  entry: {
    polyfills: "./src/polyfills.js",
    tema: "./src/temaStyle.js",
    scripts: "./src/scripts.js",
    fonts: "./src/fonts.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "./assets/fonts",
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/images", to: "./src/assets/images" },
        { from: "./src/assets/img", to: "./src/assets/img" },
        { from: "./src/assets/barra", to: "./src/assets/barra" },
        { from: "./src/assets/vlibras", to: "./src/assets/vlibras" },
        { from: "./src/assets/fonts", to: "./src/assets/fonts" },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index-producao.html",
      title: "Titulo do Sistema",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: "./src/404.html",
    }),
  ],
};
