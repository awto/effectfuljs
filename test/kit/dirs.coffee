fs = require "fs"
path = require "path"

module.exports =
  read: (dir) ->
    walk = (dir,res) ->
      res.$dirPath = dir
      try
        files = fs.readdirSync(dir)
      catch e
        console.log "couldn't read dir",dir
      for i in files
        continue if i[i.length-1] is "~"
        f = path.join(dir,i)
        try 
          s = fs.statSync(f)
        catch
          continue
        if s.isDirectory()
          sub = res[i] = {}
          walk(f,sub)
          continue
        if s.isFile()
          base = null
          try
            res[i] = fs.readFileSync f, "utf-8"
          catch e
            console.warn "couldn't read #{f}", e
      return res
    walk(dir, {})

