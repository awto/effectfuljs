const path = require("path");
const fs = require("fs");
const debuggerConfig = { ...require("../deriveConfig") };
const { normalizePath } = require("../../state");
const cache = require("../cacheId");
const NODE_MODULES = fs.realpathSync(
  path.join(debuggerConfig.packageRoot, "node_modules")
);
debuggerConfig.hot = false;

const cacheIdentifier = cache.key;

const { targetResolve } = require("../targetResolve");

const webpack = require("webpack");

if (path.sep === "\\")
  Object.assign(debuggerConfig, {
    srcRoot: normalizePath(debuggerConfig.srcRoot)
  });

const Module = module.constructor;

const Mp = Module.prototype;

const savedCompile = Mp._compile;

const BABEL_PRESET_PATH = targetResolve("next/dist/build/babel/preset");

const WEBPACK_CONFIG_PATH = targetResolve("next/dist/build/webpack-config");
const compile = require("../node/compile");
const DEBUGGER_DIR = path.resolve(__dirname, "..", "..");

const { runtime, srcRoot, timeTravel } = debuggerConfig;

const rt = require.resolve(runtime);

const preInstrumentedLibs = path.join(
  DEBUGGER_DIR,
  timeTravel ? "deps-t" : "deps-n"
);

const sharedCompilerConfig = require("@effectful/core/v2/config").default;
const defaultCompilerConfig = require("@effectful/core/v2/compiler")
  .defaultConfig;

function blackbox(filename) {
  filename = normalizePath(filename);
  if (!debuggerConfig.blackbox.test(filename)) {
    return false;
  }
  return true;
}

const SKIP = [
  path.join(NODE_MODULES, "next", "dist", "build"),
  path.join(NODE_MODULES, "next", "dist", "compiled"),
  path.join(NODE_MODULES, "next", "dist", "telemetry"),
  path.join(NODE_MODULES, "next", "dist", "server", "hot-middleware"),
  path.join(NODE_MODULES, "next", "dist", "server", "lib"),
  path.join(NODE_MODULES, "next", "dist", "bin"),
  path.join(NODE_MODULES, "next", "dist", "lib"),
  path.join(NODE_MODULES, "@babel"),
  path.join(NODE_MODULES, "@next", "react-refresh-utils"),
  path.join(NODE_MODULES, "@next", "react-dev-overlay", "node_modules"),
  path.join(NODE_MODULES, "ally.js"),
  path.join(NODE_MODULES, "ajv"),
  path.join(NODE_MODULES, "webpack"),
  path.join(NODE_MODULES, "acorn"),
  path.join(NODE_MODULES, "util"),
  path.join(NODE_MODULES, "process"),
  path.join(NODE_MODULES, "platform"),
  path.join(NODE_MODULES, "tapable"),
  path.join(NODE_MODULES, "node-libs-browser"),
  path.join(NODE_MODULES, "next", "node_modules", "@babel"),
  path.join(NODE_MODULES, "next", "dist", "client", "dev"),
  path.join(NODE_MODULES, "base64-js"),
  path.join(NODE_MODULES, "ieee754"),
  path.join(NODE_MODULES, "isarray"),
  path.join(NODE_MODULES, "next", "node_modules"),
  path.resolve(__dirname, "..", ".."),
  path.join(debuggerConfig.packageRoot, ".next"),
  path.join(NODE_MODULES, "css-loader"),
  path.join(NODE_MODULES, "css"),
  path.join(NODE_MODULES, "style-loader"),
  path.join(NODE_MODULES, "strip-ansi"),
  path.join(NODE_MODULES, "ansi-regex"),
  path.join(NODE_MODULES, "caniuse-lite"),
  path.join(NODE_MODULES, "watchpack"),
  path.join(NODE_MODULES, "chalk"),
  path.join(NODE_MODULES, "lodash"),
  path.join(NODE_MODULES, "graceful-fs"),
  path.join(NODE_MODULES, "enhanced-resolve"),
  path.join(NODE_MODULES, "mkdirp"),
  path.join(NODE_MODULES, "json-parse-better-errors"),
  path.join(NODE_MODULES, "escape-string-regexp"),
  path.join(NODE_MODULES, "color-convert"),
  path.join(NODE_MODULES, "source-map"),
  path.join(NODE_MODULES, "source-list-map"),
  path.join(NODE_MODULES, "loader-runner"),
  path.join(NODE_MODULES, "fast-json-stable-stringify"),
  path.join(NODE_MODULES, "json-schema-traverse"),
  path.join(NODE_MODULES, "fast-deep-equal"),
  path.join(NODE_MODULES, "mkdirp"),
  path.join(NODE_MODULES, "data-uri-to-buffer"),
  path.join(NODE_MODULES, "schema-utils"),
  path.join(NODE_MODULES, "loader-utils"),
  path.join(NODE_MODULES, "emojis-list"),
  path.join(NODE_MODULES, "postcss"),
  path.join(NODE_MODULES, "supports-color"),
  path.join(NODE_MODULES, "line-column"),
  path.join(NODE_MODULES, "picomatch"),
  path.join(NODE_MODULES, "anymatch"),
  path.join(NODE_MODULES, "normalize-path"),
  path.join(NODE_MODULES, "glob-parent"),
  path.join(NODE_MODULES, "is-extglob"),
  path.join(NODE_MODULES, "prop-types"),
  path.join(NODE_MODULES, "resolve"),
  path.join(NODE_MODULES, "babel-plugin"),
  path.join(NODE_MODULES, "semver"),
  path.join(NODE_MODULES, "browserslist"),
  path.join(NODE_MODULES, "regexpu-core"),
  path.join(NODE_MODULES, "regenerator"),
  path.join(NODE_MODULES, "core-js"),
  path.join(NODE_MODULES, "styled-jsx"),
  path.join(NODE_MODULES, "esutils"),
  debuggerConfig.runtimePackages
]
  .filter(Boolean)
  .map(normalizePath);

function exclude(filename) {
  filename = normalizePath(filename);
  for (const i of SKIP)
    if (filename.startsWith(i)) {
      return true;
    }
  if (!debuggerConfig.include.test(filename)) return true;
  if (debuggerConfig.exclude && debuggerConfig.exclude.test(filename))
    return true;
  return false;
}

const refreshLoader = targetResolve("@next/react-refresh-utils/loader");

const compilerConfig = {
  ...defaultCompilerConfig,
  rt,
  blackbox,
  exclude,
  staticBundler: true,
  timeTravel,
  preInstrumentedLibs,
  srcRoot
};

const nodeCompilerConfig = { ...compilerConfig, staticBundler: false };

const CONFIG_PATH = path.resolve(__dirname, "..", "..", "config.js");

const isWebpack5 = parseInt(webpack.version) === 5;

function wrapWebPack(orig) {
  return {
    ...orig,
    default: async function(dir, opts) {
      const cacheDir = path.join(opts.config.distDir, "cache-debug");
      const webpackConfig = await orig.default(dir, opts);
      const origExternals = webpackConfig.externals;
      webpackConfig.resolveLoader.alias[
        "next-client-pages-loader"
      ] = require.resolve("./next-client-pages-loader");
      if (!opts.isServer) {
        if (isWebpack5)
          Object.assign(webpackConfig.resolve.alias, {
            fs: false
          });
        else
          webpackConfig.node = Object.assign({}, webpackConfig.node, {
            fs: "empty"
          });
      }
      const nextLoader = webpackConfig.module.rules[0];
      let nextBabelLoader = null;
      if (opts.isServer) {
        if (
          typeof nextLoader.use !== "object" ||
          nextLoader.use.loader !== "next-babel-loader"
        )
          throw new Error("Unsupported webpack config");
        nextBabelLoader = nextLoader.use.options;
      } else {
        const origEntry = webpackConfig.entry;
        if (
          !debuggerConfig.reactFastRefresh &&
          typeof origEntry === "function"
        ) {
          webpackConfig.entry = async function() {
            const res = await origEntry.apply(webpackConfig, arguments);
            if (typeof res === "object" && "react-refresh" in res)
              delete res["react-refresh"];
            return res;
          };
        }
        if (
          !Array.isArray(nextLoader.use) ||
          nextLoader.use[0] !== refreshLoader ||
          nextLoader.use[1].loader !== "next-babel-loader"
        )
          throw new Error("Unsupported webpack config");
        nextBabelLoader = nextLoader.use[1].options;
        nextLoader.use.shift();
        nextBabelLoader.hasReactRefresh = debuggerConfig.reactFastRefresh;
      }
      nextBabelLoader.cacheDirectory = cacheDir;
      nextBabelLoader.cacheIdentifier =
        cache.key +
        (opts.isServer ? "-server" : "") +
        (opts.isModern ? "-modern" : "") +
        (opts.hasModern ? "-has-modern" : "") +
        "-new-polyfills" +
        (opts.development ? "-development" : "-production") +
        (opts.hasReactRefresh ? "-react-refresh" : "") +
        (opts.hasJsxRuntime ? "-jsx-runtime" : "");
      if (
        Array.isArray(origExternals) &&
        typeof origExternals[0] === "function"
      ) {
        //TODO: correct prefix
        webpackConfig.externals = [
          isWebpack5
            ? function({ context, request }, origCallback) {
                if (
                  context.startsWith(DEBUGGER_DIR) ||
                  request.startsWith(DEBUGGER_DIR) ||
                  context.startsWith("@effectful/debugger") ||
                  request.startsWith("@effectful/debugger")
                ) {
                  return origCallback(undefined, `commonjs ${request}`);
                }
                return origExternals[0]({ context, request }, origCallback);
              }
            : function(context, request, origCallback) {
                if (
                  context.startsWith(DEBUGGER_DIR) ||
                  request.startsWith(DEBUGGER_DIR) ||
                  context.startsWith("@effectful/debugger") ||
                  request.startsWith("@effectful/debugger")
                ) {
                  return origCallback(undefined, `commonjs ${request}`);
                }
                return origExternals[0](context, request, origCallback);
              }
        ];
      }
      const oneOf = webpackConfig.module.rules.find(i => "oneOf" in i).oneOf;
      if (!opts.isServer)
        oneOf.unshift({
          test: CONFIG_PATH,
          loader: require.resolve("babel-loader"),
          options: {
            babelrc: false,
            configFile: false,
            plugins: [
              [require.resolve("@effectful/core/configure"), debuggerConfig]
            ]
          }
        });
      oneOf.unshift({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [/node_modules/],
        exclude: [
          /@babel(?:\/|\\{1,2})runtime/,
          /@effectful(?:\/|\\{1,2})/,
          /css-loader/,
          /style-loader/,
          /next[\\/]dist[\\/]next-server[\\/]lib/,
          /next[\\/]dist[\\/]client/,
          /next[\\/]dist[\\/]pages/,
          exclude
        ],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          passPerPreset: true,
          presets: [[require.resolve("../babel/preset"), compilerConfig]],
          cacheDirectory: cacheDir,
          cacheIdentifier,
          cacheCompression: false,
          sourceMaps: false
        }
      });
      webpackConfig.module.rules.unshift({ parser: { amd: false } });
      webpackConfig.devtool = false;
      webpackConfig.profile = false;
      return webpackConfig;
    }
  };
}

function babelPresetWrap(origPresest) {
  return function babelPreset(api, options = {}) {
    const envOption = options["preset-env"] || {};
    const newOptions = {
      ...options,
      "preset-env": {
        ...envOption,
        exclude: [
          "transform-async-to-generator",
          "transform-arrow-functions",
          "transform-block-scoped-functions",
          "transform-block-scoping",
          "transform-for-of",
          "transform-new-target",
          "transform-regenerator",
          "transform-template-literals",
          "proposal-async-generator-functions"
        ],
        include: [
          "transform-classes",
          "transform-computed-properties",
          "transform-destructuring",
          "transform-function-name",
          "transform-object-super",
          "transform-property-literals",
          "transform-shorthand-properties",
          "transform-spread",
          "proposal-optional-chaining",
          "proposal-class-properties",
          "proposal-logical-assignment-operators",
          "proposal-nullish-coalescing-operator",
          "proposal-object-rest-spread",
          "proposal-optional-catch-binding",
          "proposal-private-methods",
          "transform-parameters"
        ]
      }
    };
    const orig = origPresest(api, newOptions);
    orig.plugins.push(
      require.resolve("@babel/plugin-transform-property-mutators"),
      require.resolve("@babel/plugin-transform-modules-commonjs")
    );
    if (process.env.EFFECTFUL_PROGRESS_ID) {
      orig.plugins.unshift(
        new webpack.ProgressPlugin(function(percentage, title) {
          const prefix = `${process.env.EFFECTFUL_PROGRESS_ID}${Math.ceil(
            100 * percentage
          )}:`;
          if (title === "building") {
            console.log(`${prefix}`);
            return;
          }
          console.log(`${prefix}${title}`);
        })
      );
    }
    return {
      passPerPreset: true,
      presets: [
        orig,
        {
          plugins: [
            [
              require.resolve("../../transform"),
              options["effectful-debugger"] || compilerConfig
            ]
          ]
        }
      ]
    };
  };
}

// TODO: this hack can be avoided if all external deps are pre-compiled
Mp._compile = function _compile(content, filename) {
  if (filename === BABEL_PRESET_PATH) {
    savedCompile.call(this, content, filename);
    this.exports = babelPresetWrap(this.exports);
    return;
  }
  if (filename === CONFIG_PATH) {
    this.exports = debuggerConfig;
    return;
  }
  if (filename === WEBPACK_CONFIG_PATH) {
    const ret = savedCompile.call(this, content, filename);
    this.exports = wrapWebPack(this.exports);
    return ret;
  }
  if (!exclude(filename)) {
    try {
      Object.assign(sharedCompilerConfig, nodeCompilerConfig);
      content = compile(content, filename, this) || content;
    } catch (e) {
      throw e;
    }
  }
  return savedCompile.call(this, content, filename);
};

require(targetResolve("next/dist/cli/next-dev")).nextDev([process.cwd()]);
