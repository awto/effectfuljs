process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
// require("react-scripts/config/env");
const path = require("path");
const { paths } = require("./cra");

const appPackageJson = paths.appPackageJson
  ? require(path.appPackageJson)
  : {
      name: paths.appIndexJs
    };

const {
  choosePort,
  prepareProxy,
  prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");
const defaults = require("../defaults");

async function main() {
  const port = await choosePort(defaults.host, defaults.port);
  if (port == null) return;
  const protocol = process.env.HTTPS === "true" ? "https" : "http";
  const appName = appPackageJson.name;
  const urls = prepareUrls(protocol, defaults.host, port);
  const compiler = webpack(webpackConfig);
  const proxySetting = appPackageJson.proxy;
  const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
  const devServerOptions = {
    hot: true,
    stats: { colors: true },
    progress: false,
    open: !!process.env.EFFECTFUL_DEBUGGER_OPEN,
    port: defaults.port,
    publicPath: "/",
    https: protocol === "https",
    host: defaults.host,
    overlay: false,
    proxy: proxyConfig,
    public: urls.lanUrlForConfig
  };
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(port, HOST, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening on ${urls.lanUrlForTerminal}`);
  });
}
main();
