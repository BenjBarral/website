const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ENV = process.env.NODE_ENV || "production";

module.exports = {
  context: path.resolve(__dirname, "./app"),
  entry: {
    app: "./index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  devtool: ENV === "development" ? "eval-source-map" : false,
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat"
    },
    modules: [path.join(__dirname, "./app"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "./app"),
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["es2015", "react"] }
          }
        ]
      },
      {
        test: /\.(png|eot|svg|ttf|woff|woff2|otf)$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new HtmlWebpackPlugin({
      title: "Benjamin Barral",
      favicon: "benj.jpg",
      template: "index.ejs"
    })
  ]
};
