/**
 * adapted copy of webpack.config.js from "react-scripts" but for "development"
 */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const resolve = require("resolve");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const config = require("../defaults");
const cacheIdentifier = require("../cacheId");
const preset = require("../babel/preset-zero-config");
const { paths, modules, getClientEnvironment } = require("./cra");
const postcssNormalize = require("postcss-normalize");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const appPackageJson = paths.appPackageJson
  ? require(paths.appPackageJson)
  : false;
const { normalizeDrive } = require("../../state");

const { backend, cache, srcRoot, timeTravel } = config;

const importRT = `@effectful/debugger/backends/${backend}`;

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
);

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const publicPath = "/";
const publicUrl = "";

const env = getClientEnvironment(publicUrl);

const useTypeScript = fs.existsSync(paths.appTsConfig);

const prependModules = [];

const debuggerPath = normalizeDrive(
  fs.realpathSync(path.resolve(__dirname, "..", "..", ".."))
);

prependModules.push(path.resolve(debuggerPath, "debugger", "node_modules"));

if (process.env.EFFECTFUL_DEBUGGER_EXTENSION_ROOT)
  prependModules.push(
    path.resolve(
      fs.realpathSync(process.env.EFFECTFUL_DEBUGGER_EXTENSION_ROOT),
      "node_modules"
    )
  );

let configJS = config;
if (path.sep === "\\")
  configJS = {
    ...configJS,
    srcRoot: normalizeDrive(configJS.srcRoot.replace(/\\/g, "/"))
  };

const include = [paths.appSrc];

function isDebuggerPath(filename) {
  filename = path.resolve(normalizeDrive(filename));
  return (
    filename.startsWith(debuggerPath) && !filename.startsWith(paths.appSrc)
  );
}

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          }),
          postcssNormalize()
        ],
        sourceMap: true
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve("resolve-url-loader"),
        options: {
          sourceMap: true
        }
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true
        }
      }
    );
  }
  return loaders;
};

module.exports = {
  mode: "development",
  entry: [
    require.resolve("react-dev-utils/webpackHotDevClient"),
    paths.appIndexJs
  ],
  output: {
    pathinfo: true,
    filename: "static/js/bundle.js",
    futureEmitAssets: true,
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: publicPath,
    // devtoolModuleFilenameTemplate: info =>
    //  path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    // jsonpFunction: `webpackJsonp${appPackageJson ? appPackageJson.name : ""}`,
    globalObject: "this"
  },
  resolve: {
    // this may break something, avoiding loading transpiled modules
    // the safer way would be an explicit list of all used library
    // or pre-transpiled libs
    modules: prependModules.concat(
      ["node_modules", paths.appNodeModules],
      modules.additionalModulePaths || []
    ),
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`)
      .filter(ext => useTypeScript || !ext.includes("ts")),
    plugins: [
      PnpWebpackPlugin,
      new ModuleScopePlugin(
        paths.appSrc,
        appPackageJson ? [paths.appPackageJson] : []
      )
    ]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: imageInlineSizeLimit,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /eff.+debugger(?:\/|\\{1,2})config.js$/,
            loader: require.resolve("babel-loader"),
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /(webpack|css-loader|style-loader)/
            ],
            options: {
              babelrc: false,
              configFile: false,
              plugins: [
                [require.resolve("@effectful/core/configure"), configJS]
              ]
            }
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include,
            exclude: [isDebuggerPath, /node_modules/],
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              passPerPreset: true,
              presets: [
                [
                  preset,
                  {
                    importRT,
                    timeTravel,
                    preInstrumentedLibs: true,
                    expInject: 0,
                    expInline: false,
                    srcRoot
                  }
                ]
              ],
              cacheDirectory: cache,
              cacheIdentifier,
              sourceMaps: false
            }
          },
          {
            test: /\.(js|mjs)$/,
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /@effectful(?:\/|\\{1,2})/,
              /css-loader/,
              /style-loader/,
              isDebuggerPath
            ],
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              passPerPreset: true,
              presets: [
                [
                  preset,
                  {
                    blackbox: true,
                    importRT,
                    timeTravel,
                    expInject: 0,
                    expInline: false,
                    srcRoot
                  }
                ]
              ],
              cacheDirectory: cache,
              cacheIdentifier,
              sourceMaps: false
            }
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true
            }),
            sideEffects: true
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            })
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: true
              },
              "sass-loader"
            ),
            sideEffects: true
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: true,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              },
              "sass-loader"
            )
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx|ejs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      paths.appHtml && {
        inject: true,
        template: paths.appHtml
      }
    ),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new ModuleNotFoundPlugin(paths.appPath),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: publicPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith(".map")
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  devtool: "hidden-source-map",
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  performance: false
};
