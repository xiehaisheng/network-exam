const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const isDev = process.env.NODE_ENV === "development";
const env = process.argv
  .find((item) => item.indexOf("--env=") > -1)
  .replace("--env=", "");

const publicPath = "/dingding";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: isDev ? "/" : publicPath,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                targets: {
                  chrome: "49",
                  ios: "10",
                },
              },
            ],
          ],
          plugins: [
            [
              "import",
              {
                libraryName: "antd-mobile",
                libraryDirectory: "es/components",
                style: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.less$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
        include: /\.module\.less$/,
      },
      {
        test: /\.less$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
        exclude: /\.module\.less$/,
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|webp)$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": resolvePath("src"),
    },
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, "./dist"),
    proxy: {
      // 配置代理（只在本地开发有效，上线无效）
      "/user": {
        target: "http://kaoshi.jishu666.com/",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env),
      __PATH__: JSON.stringify(isDev ? "/" : publicPath),
    }),
  ],
};
