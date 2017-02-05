import * as fs from "fs"
import * as path from "path"
import * as kit from "./generators"
import {run,pretty} from "./core"
import * as dirs from "./dirs"
const defaults = require("../../src/config")
defaults.libs["./mfjscore"] = defaults.libs["@mfjs/core"]

function generateOuts(files) {
  function walk(d) {
    const results = [];
    for (const i of Object.getOwnPropertyNames(d)) {
      if (i[0] === "$")
        continue
      const v = d[i]
      if (v.$skip || v.qskip || (v.$opts != null) && v.$opts.qskip)
        continue
      if (v.$dirPath != null) {
        walk(v)
        continue
      }
      const code = v.inp
      if (code == null)
        continue
      let resCode
      const nopts = {profile:"full"}
      if (v.$opts != null) {
        for (const ix in v.$opts) {
          nopts[ix] = v.$opts[ix]
        }
      }
      nopts.filename = `${v.$basePath}-in.js`
      if (nopts.require == null)
        nopts.require = "./mfjscore"
      try {
        resCode = run(nopts,code)
      } catch (error) {
        console.error(error)
        continue
      }
      if (resCode !== v.exp) {
        const resName = `${v.$basePath}-out.js`
        console.log("writing", resName)
        try {
          results.push(fs.writeFileSync(resName, resCode))
        } catch (error) {
          results.push(console.log("coundn't write", resName, error))
        }
      } else {
        results.push(void 0)
      }
    }
    return results
  }
  return walk(kit.prepareList(files))
}

const files = dirs.read(path.join(__dirname, "..", "samples"))

generateOuts(files)
