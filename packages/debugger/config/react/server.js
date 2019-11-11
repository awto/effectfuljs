process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
// require("react-scripts/config/env");
const { paths } = require("./cra");

const appPackageJson = paths.appPackageJson
  ? require(paths.appPackageJson)
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
  const urls = prepareUrls(protocol, defaults.host, port);
  const compiler = webpack(webpackConfig);
  const proxySetting = appPackageJson.proxy;
  const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
  const devServerOptions = {
    hot: true,
    stats: { colors: false },
    progress: false,
    open: defaults.open,
    port,
    publicPath: "/",
    contentBase: paths.appPublic,
    watchContentBase: true,
    https: protocol === "https",
    host: defaults.host,
    overlay: false,
    proxy: proxyConfig,
    public: `${protocol}://${urls.lanUrlForConfig}:${port}`,
    clientLogLevel: "silent"
  };
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(port, defaults.host, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.error(`Listening on ${urls.localUrlForBrowser}`);
  });
}
main();
