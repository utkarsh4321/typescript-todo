const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.ts",
  devtool: "eval-source-map",

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // loader: "css-loader",
        // options: {
        //   modules: true,
        // },

        use: [
          "style-loader",
          "css-loader",

          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("node-sass"),
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        include: [path.resolve((__dirname, "src"))],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //   },
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    contentBase: "./public",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new MiniCssPlugin({
      filename: "[name].[hash].css",
    }),
    // new CleanWebpackPlugin(),
  ],
  output: {
    // publicPath: "public",
    filename: `[name].bundle.js`,
    path: path.resolve(__dirname, "public"),
  },
};
