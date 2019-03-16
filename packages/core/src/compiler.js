import defaults from "./config";
import * as Kit from "./kit";
import * as T from "./transform";
import * as Policy from "./policy";
import * as RT from "./rt";
import defunctPreset from "./presets/defunct";

export const config = defaults;

export { Policy, T as Transform, Kit, RT };
export const Tag = Kit.Tag;

const helpers = {
  Tag,
  Kit,
  Policy,
  Transform: T,
  RT,
  presets: { defunct: defunctPreset }
};

const rescopeVisitor = { Identifier() {} };

export function makePlugin(transform) {
  return function effectfulPlugin(babel, opts) {
    const descr = transform(opts, helpers);
    return {
      name: descr.name || "effectful",
      manipulateOptions(mopts, parserOpts) {
        if (descr.syntaxPlugins)
          parserOpts.plugins.push(...descr.syntaxPlugins);
      },
      visitor: {
        Program(path, state) {
          state.file.scope.path.traverse(rescopeVisitor);
          Kit.optsScope(function effectfulPreset() {
            Kit.setOpts({ ...defaults, ...descr.options });
            Kit.babelBridge(
              Kit.pipe(
                Kit.prepare,
                getHandler(descr)
              ),
              path,
              state
            );
          });
          babel.traverse.cache.clearScope();
          babel.traverse.clearNode(path.node);
          state.file.scope.path.traverse(rescopeVisitor);
        }
      }
    };
  };
}

export function babelPlugin(transform) {
  const res = makePlugin(transform, transform.opts);
  res.options = opts => {
    const res = babelPlugin(iopts =>
      transform(Object.assign({}, opts, iopts), helpers)
    );
    res.opts = opts;
    return res;
  };
  res.rebind = map => babelPlugin(opts => map(opts, transform));
  res.modify = map => babelPlugin(opts => transform(map(opts), helpers));
  res.transform = transform;
  res.macro = () => babelMacro(res);
  return res;
}

/**
 * convers transform description into babel preset
 *
 *  transform: (opts: Config, helpers:{Tag,Policy,Kit,Transform,RT})
 *     => { syntaxPlugins: string[],
 *          options: Config,
 *          main: (t: Tokens) => void }
 */
export function babelPreset(transform) {
  const res = function(b, ropts) {
    return {
      plugins: [makePlugin(transform, Object.assign({}, transform.opts, ropts))]
    };
  };
  res.options = opts => {
    const res = babelPreset(iopts =>
      transform(Object.assign({}, opts, iopts), helpers)
    );
    res.opts = opts;
    return res;
  };
  res.rebind = map => babelPreset(opts => map(opts, transform));
  res.modify = map => babelPreset(opts => transform(map(opts), helpers));
  res.transform = transform;
  res.macro = babelMacro(res);
  return res;
}

function getHandler(opts) {
  return opts.main ? opts.main : T.run;
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

/**
 * returns "babel-plugin-macros" default export for given transform,
 * it transforms the result of `babelPreset` into a function suitable
 * for supplying to "babel-plugin-macros" `createMacro` call
 */
function babelMacro(plugin) {
  // const {createMacro} = require("babel-plugin-macros")
  const popts = plugin.opts || {};
  const configName = plugin.name;
  return createMacro(
    function effectfulMacro({ references, state, babel, config }) {
      let opts = { ...config, ...popts };
      if (references.default && references.default.length)
        opts.preprocNS = references.default[0].node.name;
      opts = plugin.transform(opts, helpers);
      const path = state.file.path;
      Kit.optsScope(function effectfulMacroRun() {
        const eopts = opts.options;
        if (eopts.macroAdapt !== false) {
          if (eopts.detectRT) {
            if (!eopts.importRT) eopts.importRT = eopts.detectRT;
            eopts.detectRT = null;
          }
          if (eopts.preprocNS) eopts.ns = eopts.preprocNS;
        }
        Kit.setOpts({ ...opts, ...defaults, ...eopts });
        Kit.babelBridge(
          Kit.pipe(
            Kit.prepare,
            getHandler(opts)
          ),
          path,
          state
        );
        babel.traverse.cache.clearScope();
        babel.traverse.clearNode(path.node);
        /** I don't know why but this prevents crashes in babel sometimes */
        state.file.scope.path.traverse(rescopeVisitor);
      });
    },
    { configName }
  );
}

/** applies transform description to `ast` from babylon */
export const run = (ast, descr) =>
  T.applyPass(ast, getHandler(descr), {
    ...descr,
    ...defaults,
    ...descr.options
  });

/** default always transforming transform with `options: Config` */
export const defaultTransform = options => ({
  syntaxPlugins: [],
  options: Object.assign({}, defaults, options),
  main: T.run
});
