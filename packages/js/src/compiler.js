import defaults from "./config"
import generate from "babel-generator"
import {parse} from "babylon"
import {produce,consume,kit} from "estransducers"
import * as Kit from "./kit"
import * as path from "path"
import * as T from "./transform"
import * as Policy from "./policy"

/** 
 * convers transform description into babel preset 
 * 
 *  transform: (opts: Config) => { syntaxPlugins: string[], 
 *                                 options: Config, 
 *                                 main: (t: Tokens) => void }
 */
export function babelPreset(transform) {
  return function (b,ropts) {
    const opts = transform(opts)
    return {
      plugins: [
        function (t) {
          return {
            manipulateOptions(mopts, parserOpts) {
              if (opts.syntaxPlugins)
                parserOpts.plugins.push(...opts.syntaxPlugins)
            },
            visitor:{
              Program(path,state) {
                path.skip()
                Kit.optsScope(function babelPreset(f) {
                  Kit.setOpts(opts)
                  Kit.babelBridge(transform.main,path,state)
                })
              }
            }
          }
        }
      ]
    }
  }
}

/** applies transform description to `ast` from babylon */
export function run(ast, transform) {
  return T.applyPass(ast, transform.main, transform.options)
}

/** 
/** default always transforming transform with `options: Config` */
export function defaultTransform(options) {
  return {
    syntaxPlugins: [],
    options:Object.assign({},defaults,options),
    main: T.run
  }
}
