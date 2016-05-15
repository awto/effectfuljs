path = require "path"
kit = require "./generators"
dirs = require "./dirs"
fs = require "fs"
{run, pretty} = require "./core"

generateOuts = (files) ->
  walk = (d) ->
    for i in Object.getOwnPropertyNames(d) when i[0] isnt "$"
      v = d[i]
      continue if v.$skip or v.qskip or v.$opts? and v.$opts.qskip
      if v.$dirPath?
        walk(v)
        continue
      code = v.inp
      continue unless code?
      try
        resCode = run(code,{transform:{filename:"#{v.$basePath}-in.js"}})
      catch e
        console.error(e)
        continue
      if resCode isnt v.exp
        resName = "#{v.$basePath}-out.js"
        console.log "writing", resName
        try
          
          fs.writeFileSync(resName, resCode)
        catch e
          console.log "coundn't write", resName, e
  walk(kit.prepareList(files))

files = dirs.read(path.join(__dirname,"..","samples"))

generateOuts(files)

