import generate from "babel-generator"
import {produce,consume,kit} from "estransducers"
import * as Kit from "./kit"
import * as path from "path"
import * as T from "./transform"
import * as Policy from "./policy"

export function preset(transform) {
  return function (b,ropts) {
    const opts = transform(opts)
    return {
      plugins: [
        function (t) {
          return {
            manipulateOptions(mopts, parserOpts) {
              if (opts.babelSyntaxPlugins)
                parserOpts.plugins.push(...opts.babelSyntaxPlugins)
            },
            visitor: {
              Program(path,state) {
                path.skip()
                Kit.optsScope(function babelPreset(f) {
                  Kit.setOpts(opts.init)
                  Kit.babelBridge(opts.main,path,state)
                })
              }
            }
          }
        }
      ]
    }
  }
}
