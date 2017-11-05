const fs = require("fs"),
      path = require("path")

const srcRoot = path.join(__dirname,"..")
const dstRoot = path.join(process.cwd(),"test") 
const deps = path.join(srcRoot,"deps")
const samplesSrc = path.join(srcRoot,"samples","src")
const regeneratorSrc = path.join(deps,"regenerator","test")

const allFiles = []
const allDirs = []
const suites = []

function source(root,suite) {
  if (suite !== ".")
    allDirs.push(suite)
  suites.push(suite)
  walk(root)
  function walk(inp) {
    for(const i of fs.readdirSync(inp)) {
      const src = path.join(inp,i)
      const dst = path.join(suite,path.relative(root,src))
      if (fs.statSync(src).isDirectory()) {
        allDirs.push(dst)
        walk(src)
      } else if (path.extname(i) === ".js") {
        allFiles.push({src,dst})
      }
    }
  }
}

const clean = process.argv.indexOf("clean") !== -1

function target(name) {
  // unfortunately on Windows hardlink for dirs is a problem
  // so the script links each file
  const dst = path.join(dstRoot,name,"links")
  function remove(dir) {
    try {
      for(const i of fs.readdirSync(dir)) {
        const p = path.join(dir,i)
        if (fs.statSync(p).isDirectory())
          remove(p)
        else
          fs.unlinkSync(p)
      }
      fs.rmdirSync(dir)
    } catch(e) {
      if (e.code !== "ENOENT")
        console.error(e)
    }
  }
  remove(dst)
  if (clean)
    return
  fs.mkdirSync(dst)
  for(const i of allDirs) {
    fs.mkdirSync(path.join(dst,i))
  }
  for(const {src,dst:i} of allFiles)
    fs.linkSync(src,path.join(dst,i))
}

source(samplesSrc,".")
source(regeneratorSrc,"regenerator")

for(const i of process.argv.filter(i => i[0] === "="))
  target(i.substr(1))

