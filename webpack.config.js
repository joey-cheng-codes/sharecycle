const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  plugins: [new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "index.html")
  })],
  performance: {
    hints: false
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        router: () => 'http://localhost:3000',
        logLevel: 'debug'
      },
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: "file-loader"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
};
