const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "client", "index.js"),
  devServer: {
    contentBase: path.join(__dirname, "client"),
    compress: true,
    hot: true,
    port: 9000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
    }),
  ],
};
