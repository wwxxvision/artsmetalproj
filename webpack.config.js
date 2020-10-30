const path = require("path");
const STATIC = require("./params/webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, STATIC.DEVELOPMENT_DIR) + STATIC.ENTRY_APP,
  output: {
    path: path.resolve(__dirname, STATIC.BUILD_DIR),
    filename: STATIC.OUTPUT_FILENAME,
  },
  
  resolve: {
    extensions: [".js"],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./src",
    compress: true,
    port: 3000,
    hot: true,
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: __dirname + "/postcss/postcss.config.js",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/fonts/[name].[ext]",
              outputPath: "[filename]/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceMap: true,
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
