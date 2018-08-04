module.exports = {
  entry: {
    index: "./main.js"
  },
  mode: process.env.WEBPACK_SERVE ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
