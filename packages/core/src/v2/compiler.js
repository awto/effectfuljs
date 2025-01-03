import config from "./config";
import * as context from "./context";
import * as CFG from "./cfg";
import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Optimization from "./optimization";
import * as Emit from "./emit";
import * as Meta from "./meta";
import * as Operations from "./operations";
import * as path from "path";

export const defaultConfig = { ...config };

const helpers = {
  context,
  CFG,
  Kit,
  Scope,
  Optimization,
  Emit,
  Meta,
  Operations
};

const rescopeVisitor = { Identifier() {} };

export function run(transform, state) {
  state.file.scope.path.traverse(rescopeVisitor);
  const { babel } = config;
  const path = state.file.path;
  config.babelFile = state.file;
  const ast = state.file.ast;
  let ret;
  if (config.debug) {
    ret = transform(ast, helpers);
  } else {
    try {
      ret = transform(state.file.ast, helpers);
    } catch (e) {
      if (e instanceof SyntaxError) throw e;
      if (config.verbose) console.log(e);
      throw state.file.buildCodeFrameError(e.esNode || ast, e.message);
    }
  }
  babel.traverse.cache.clearScope();
  babel.traverse.clearNode(path.node);
  /** I don't know why but this prevents crashes in babel sometimes */
  state.file.scope.path.traverse(rescopeVisitor);
  return ret;
}

function fileOpts(state) {
  const file = state.file;
  if (file) {
    const opts = file.opts;
    let root = config.srcRoot;
    if (!root || !root.substr)
      root = config.srcRoot = opts.root || opts.cwd || ".";
    root = path.resolve(root);
    config.filename = opts.filename || "file.js";
    let rel = path.relative(root, config.filename);
    if (Kit.isWindows) rel = rel.replace(/\\/g, "/");
    config.relativeName = rel;
  } else {
    config.srcRoot = ".";
    config.relativeName = config.filename = "file.js";
  }
}

/** returns babel's plugin definition suitable for assigning to `module.exports` */
export function babelPlugin(transform, mainConfig = {}) {
  const res = function effectfulPlugin(babel, args) {
    return {
      name: config.pluginName || transform.name || "effectful",
      manipulateOptions(_opts, parserOpts) {
        if (config.syntaxPlugins)
          parserOpts.plugins.push(...config.syntaxPlugins);
      },
      visitor: {
        Program(_path, state) {
          Object.assign(config, defaultConfig, mainConfig, args, { babel });
          fileOpts(state);
          run(transform, state);
        }
      }
    };
  };
  res.macro = () => babelMacro(transform, mainConfig);
  res.run = function (ast, opts) {
    Object.assign(config, opts);
    transform(ast, helpers);
    return ast;
  };
  res.config = (mainConfig) => babelPlugin(transform, mainConfig);
  return res;
}

/**
 * returns "babel-plugin-macros" default export for given transform,
 * it transforms the result of `babelPreset` into a function suitable
 * for supplying to "babel-plugin-macros" `createMacro` call
 */
function babelMacro(transform, mainConfig = {}) {
  const configName = transform.name;
  return createMacro(
    function effectfulMacro({ references, state, source, babel, config: args }) {
      Object.assign(config, mainConfig, args, { babel, macroReferences: references });
      fileOpts(state);
      config.macroSource = source;
      run(transform, state);
    },
    { configName }
  );
}

/** copied from "babel-plugin-macros" to remove it as a dependency */
function createMacro(macro, options = {}) {
  if (options.configName === "options") {
    throw new Error(
      `You cannot use the configName "options". It is reserved for babel-plugin-macros.`
    );
  }
  macroWrapper.isBabelMacro = true;
  macroWrapper.options = options;
  return macroWrapper;

  function macroWrapper(args) {
    const { source, isBabelMacrosCall } = args;
    if (!isBabelMacrosCall) {
      throw new Error(
        `The macro you imported from "${source}" is being executed outside the context of compilation with babel-plugin-macros. ` +
          `This indicates that you don't have the babel plugin "babel-plugin-macros" configured correctly. ` +
          `Please see the documentation for how to configure babel-plugin-macros properly: ` +
          "https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md"
      );
    }
    return macro(args);
  }
}
