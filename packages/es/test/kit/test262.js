const fs = require("fs")
const path = require("path")
const test262Parser = require("test262-parser")
const glob = require("glob").sync

const test262Root = path.join(__dirname,"..","deps","test262")
const harnessDir = path.join(test262Root,"harness")
const root = path.join(test262Root,"test")
const dst = path.join(__dirname,"..","samples","src","test262")

const ignore = [
  // the tests are in global scope but we inject them into a function
  // however for the purposes it is not important, that's for parser
  "**/await-BindingIdentifier-in-global.js",
  "**/await-in-function.js",
  "**/await-in-nested-function.js",
  "**/await-in-generator.js",
  "**/await-in-nested-generator.js",
  "**/await-in-global.js",
  // some babylon problems?
  "**/async-func-decl-dstr-array-rest-nested-obj*.js",
  "**/async-gen-decl-dstr-array-rest-nested-obj*.js",
  "**/*rest-ary*.js",
  "**/*rest-obj*.js"
]

const includes = glob("*.js",{cwd:harnessDir})
      .map(i => fs.readFileSync(path.join(harnessDir,i),"utf-8"))

mochaBDD(`language/
          expressions/
          {async-*,yield,await}
          /*.js`.replace(/\s/g,""),
         "expressions")

mochaBDD(`language/
          statements/
          {async-*,for-await-of,generators}
          /*.js`.replace(/\s/g,""),
         "statements")

/**
 * converts files returned by glob `pat` and `opts` into mocha BDD test case
 *  
 */
function mochaBDD(pat,suite) {
  const tests = {}
  const res = [...includes]
  for(const i of glob(pat,{cwd:root,ignore})) {
    const ext = path.extname(i)
    if (ext !== ".js")
      continue
    const file = path.join(root,i)
    const contents = fs.readFileSync(file,"utf-8")
    const result = {file, contents}
    test262Parser.parseFile(result)
    if (result.attrs.negative && result.attrs.negative.phase === "early")
      continue
    const dirs = []
    for(let j = i; (j = path.dirname(j)) !== ".";)
      dirs.unshift(path.basename(j))
    
    let dir = tests
    for(const j of dirs)
      dir = dir[j] || (dir[j] = {});
    (dir.$ || (dir.$ = [])).push(result)
  }
  function walkDirs(obj,name) {
    res.push(`describe("${name}",function() {`)
    for(const i in obj)
      if (i !== "$")
          walkDirs(obj[i],i)
    if (obj.$) {
      for(const i of obj.$) {
        const descr = !process.env.TEST262_NO_DESCR
              && i.attrs.description || path.basename(i.file,".js")
        if (!process.env.TEST262_NO_STRICT)
          if (i.attrs.flags.raw || i.attrs.flags.noStrict)
            continue
        res.push(`it("${trim(descr).replace(/"/g,"\\\"")}",
                     function(${i.async ? "$DONE" : ""}) {`)
        if (process.env.TEST262_NO_STRICT && i.attrs.strictOnly)
          res.push(`"use strict;"`)
        if (!process.env.TEST262_NO_DESCR) {
          res.push("/*")
          res.push(JSON.stringify(i.attrs,(i) => i !== "description" && i !== "info" && i,2))
          res.push(`PATH:${path.relative(test262Root,i.file)}`)
          res.push(i.copyright)
          res.push(i.attrs.info)
          res.push("*/")
        }
        res.push(i.contents)
        res.push(`})/*${path.basename(i.file,".js")}*/`)
      }
    }
    res.push(`})/*${name}*/`)
  }
  walkDirs(tests,`test262 ${suite}`)
  console.log(`generated test262 suite ${suite} at ${dst}`)
  fs.writeFileSync(path.join(dst,suite+".js"),res.join("\n"))
}

function trim(str) {
  return str.trim().replace(/(\r\n|\n|\r)/gm,"");
} 
