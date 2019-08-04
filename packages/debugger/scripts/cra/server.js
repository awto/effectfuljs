const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("./webpack.config.js");
const port = 8080;
const path = require("path");

const options = {
  hot: true,
  inline: true,
  contentBase: `${process.cwd()}/public`,
  stats: { colors: true }
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(port, "localhost", function(err) {
  if (err) {
    console.log(err);
  }
  console.log("WebpackDevServer listening at localhost:", port);
});
