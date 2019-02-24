import defaults from "./config"
import * as Kit from "./kit"
import * as path from "path"
import * as T from "./transform"
import * as Policy from "./policy"
import * as RT from "./policy"
import defunctPreset from "./presets/defunct"

export const config = defaults

export {Policy, T as Transform, Kit, RT}
export const Tag = Kit.Tag

const helpers = {Tag,Policy,Transform:T,RT,
                 presets:{defunct:defunctPreset}}

const rescopeVisitor = {Identifier() {}}

export function makePlugin(transform) {
  return function effectfulPlugin(babel, opts) {
    const descr = transform(opts,helpers)
    return {
      name: descr.name || "effectful",
      manipulateOptions(mopts, parserOpts) {
        if (descr.syntaxPlugins)
          parserOpts.plugins.push(...descr.syntaxPlugins)
      },
      visitor:{
        Program(path,state) {
          state.file.scope.path.traverse(rescopeVisitor)
          Kit.optsScope(function effectfulPreset(f) {
            Kit.setOpts({...defaults,...descr.options})
            Kit.babelBridge(Kit.pipe(Kit.prepare,getHandler(descr)),path,state)
          })
          babel.traverse.cache.clearScope()
          babel.traverse.clearNode(path.node)
          state.file.scope.path.traverse(rescopeVisitor)
        }
      }
    }
  }
}

export function babelPlugin(transform) {
  const res = makePlugin(transform,transform.opts)
  res.options = opts => {
    const res = babelPlugin(
      iopts => transform(Object.assign({},opts,iopts),helpers))
    res.opts = opts
    return res
  }
  res.rebind = map => babelPlugin(opts => map(opts,transform))
  res.modify = map => babelPlugin(opts => transform(map(opts),helpers))
  res.transform = transform
  res.macro = () => babelMacro(res)
  return res
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
  const res = function (b,ropts) {
    return {
      plugins:[makePlugin(transform,Object.assign({},transform.opts,ropts))]}
  }
  res.options = opts => {
    const res = babelPreset(
      iopts => transform(Object.assign({},opts,iopts),helpers))
    res.opts = opts
    return res
  }
  res.rebind = map => babelPreset(opts => map(opts,transform))
  res.modify = map => babelPreset(opts => transform(map(opts),helpers))
  res.transform = transform
  res.macro = babelMacro(res)
  return res
}

function getHandler(opts) {
  return function(s) {
    if (opts.configure || opts.preproc)
      s = preprocConfig(s)
    if (opts.configure) {
      opts.configure(Kit.auto(s))
      if (s[0].value.transform === false)
        return
      Policy.propagateOpts(s)
    }
    s = opts.preproc ? opts.preproc(Kit.auto(s)) : defaultPreproc(s)
    s = Policy.propagateOpts(s)
    opts.main ? opts.main(s) : T.run(s)
    return
  }
  function defaultPreproc(s) {
    s = Policy.propagateBlockDirs(s)
    return s
  }
  function preprocConfig(s) {
    s = Kit.scope.assignBody(s)
    s = Policy.setQNames(s)
    s = Kit.scope.collectBlockDirectives(s)
    return Kit.toArray(s)
  }
}

/** 
 * returns "babel-plugin-macros" default export for given transform,
 * it transforms the result of `babelPreset` into a function suitable
 * for supplying to "babel-plugin-macros" `createMacro` call
 */
function babelMacro(plugin) {
  const {createMacro,MacroError} = require("babel-plugin-macros")
  const opts = plugin.opts || {}
  const configName = plugin.name
  return createMacro(
    function effectfulMacro({references, state, babel, config}) {
      let opts = {...config}
      if (references.default && references.default.length)
        opts.preprocNS = references.default[0].node.name
      opts = plugin.transform(opts,helpers)
      const path = state.file.path
      Kit.optsScope(function effectfulMacroRun(f) {
        const eopts = opts.options
        if (eopts.macroAdapt !== false) {
          if (eopts.detectRT) {
            if (!eopts.importRT)
              eopts.importRT = eopts.detectRT
            eopts.detectRT = null
          }
          if (eopts.preprocNS)
            eopts.ns = eopts.preprocNS
        }
        Kit.setOpts({...defaults,...eopts})
        Kit.babelBridge(Kit.pipe(Kit.prepare,getHandler(opts)),path,state)
        babel.traverse.cache.clearScope()
        babel.traverse.clearNode(path.node)
        /** I don't know why but this prevents crashes in babel sometimes */
        state.file.scope.path.traverse(rescopeVisitor)
      })
    },{configName})
}

/** applies transform description to `ast` from babylon */
export const run = (ast, descr) =>
  T.applyPass(ast, getHandler(descr),
              Object.assign({},defaults,descr.options))

/** default always transforming transform with `options: Config` */
export const defaultTransform = options =>
  ({
    syntaxPlugins: [],
    options:Object.assign({},defaults,options),
    main: T.run
  })

