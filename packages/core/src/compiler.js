import defaults from "./config"
import * as Kit from "./kit"
import * as path from "path"
import * as T from "./transform"
import * as Policy from "./policy"
import * as RT from "./policy"

export const config = defaults
export {Policy, T as Transform, Kit, RT}
export const Tag = Kit.Tag

/** 
 * convers transform description into babel preset 
 * 
 *  transform: (opts: Config) => { syntaxPlugins: string[], 
 *                                 options: Config, 
 *                                 main: (t: Tokens) => void }
 */
export function babelPreset(transform) {
  const res = function (b,ropts) {
    const opts = transform(ropts)
    return {
      plugins: [
        function (babel) {
          return {
            manipulateOptions(mopts, parserOpts) {
              if (opts.syntaxPlugins)
                parserOpts.plugins.push(...opts.syntaxPlugins)
            },
            visitor:{
              Program(path,state) {
                path.skip()
                Kit.optsScope(function babelPreset(f) {
                  Kit.setOpts(opts.options)
                  Kit.babelBridge(Kit.pipe(Kit.prepare,opts.main),path,state)
                })
                babel.traverse.cache.clearScope()
                babel.traverse.clearNode(path.node)
                state.file.scope.path.traverse({Identifier() {}})
              }
            }
          }
        }
      ]
    }
  }
  res.options = (opts) => babelPreset(iopts => transform(Object.assign({},opts,iopts)))
  res.rebind = map => babelPreset(opts => map(opts,transform))
  res.modify = map => babelPreset(opts => transform(map(opts)))
  return res
}

/** applies transform description to `ast` from babylon */
export function run(ast, transform) {
  return T.applyPass(ast, transform.main, transform.options)
}

/** default always transforming transform with `options: Config` */
export function defaultTransform(options) {
  return {
    syntaxPlugins: [],
    options:Object.assign({},defaults,options),
    main: T.run
  }
}
