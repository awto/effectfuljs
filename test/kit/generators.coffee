path = require "path"
{blockEqual,run,pretty} = require "./core"
tags = require "./tags"

# arranges files taken from `read`
# it will create corresponding subobject for each matched file(field) name
# the base name is regexp matched string
groupByPat = (files,pats) ->
    walk = (d,res) ->
      for i, v of d
        if i[0] is "$"
          res[i] = v
          continue
        unless v.substr?
          res[i] = walk(v,{})
        tag = null
        for j,p of pats
          m = p.exec(i)
          continue unless m?
          base = null
          for k in m[1..] when k?
            base = k
            break
          unless base?
            res[j] = v
            break
          base = base.toLowerCase() if p.ignoreCase
          tag = j
          break
        continue unless tag?
        b = res[base] ?= {$basePath: path.join(d.$dirPath,base)}
        b[tag] = v
      return res
    walk(files,{})

getword = (t) ->
  m = /^\s*(\w+)\s*(.*)/.exec t
  return [m[1].toLowerCase(),m[2]] if m? and m.length is 3
  return []

addInfo = (d,ctx) ->
  ctx ?= []
  d.$ctx = ctx
  d.$info = info = []
  for i in Object.getOwnPropertyNames(d) when i[0] isnt "$"
    v = d[i]
    if v.substr?
      re = /\*-\s+(.+)\s+/g
      loop
        m = re.exec(v)
        break unless m? and m.length > 1
        info.push(m[1])
      minfo = info
    else
      addInfo(v, ctx.concat([i]))
      minfo = v.$info
    minfo.push(tags(ctx,i)...) unless minfo.length or fpats[i]?
  return d

options =
  profile: true
  default: true

interpretInfo = (d) ->
  if d.$info?
    for i in d.$info
      [s,t] = getword(i)
      if s is "qskip" and typeof(window) isnt 'undefined'
        s = "skip"
        d.$qskip = true
      if s is "only" or s is "skip" or s is "noskip"
        d["$#{s}"] = true
        i = t
        [s, t] = getword(i)
        continue unless t? and t.length
      switch s
        when "should" then d.$it = i
        when "if", "when", "with" then d.$context = i
        else
          if options[s]
            opts = d.$opts ?= {}
            t = true unless t? and t.length
            opts[s] = t
          else
            d.$describe = i
      if d.inp?
        d.$skip = true unless d.exp
  for i in Object.getOwnPropertyNames(d) when i[0] isnt "$"
    v = d[i]
    continue if v.substr?
    interpretInfo(v)
  return

mochaBddWalk = (d, ittxt, opts) ->
  opts ?= {}
  lst = []
  for i in Object.getOwnPropertyNames(d) when i[0] isnt "$"
    do (ittxt) ->
      v = d[i]
      ittxt = v.$it if v.$it?
      nopts = {}
      if opts?
        nopts[ix] = iv for ix, iv of opts 
      if v.$opts?
        nopts[ix] = iv for ix, iv of v.$opts
      if v.$dirPath?
        nxt = mochaBddWalk v, ittxt, nopts
      else if v.inp?
        ftxt = ittxt or
          "should have the same semantics (in #{path.join(v.$ctx...)})"
        {inp,exp} = v
        nopts.transform ?= {}
        nopts.transform.filename ?= "#{v.$basePath}-in.js"
        nopts.transform.packageName ?= "./mfjscore"
        nxt = -> blockEqual(inp,exp,nopts)
        fn = it
      else
        return
      if v.$context
        if fn?
          nxt = do (ftxt, fn, nxt) ->
            -> fn ftxt, nxt
        fn = context
        ftxt = v.$context
      if v.$describe
        if fn?
          nxt = do (ftxt, fn, nxt) ->
            -> fn ftxt, nxt
        fn = describe
        ftxt = v.$describe
      if fn?
        if v.$skip or v.qskip and typeof(window) isnt 'undefined'
          fn = fn.skip
        else if v.$only
          fn = fn.only
        lst.push -> fn ftxt, nxt
      else
        lst.push nxt
  
  ->
    i() for i in lst
    return

prepareList = (files) ->
  # dn = path.resolve(path.join(__dirname,".."),dirname)
  # files = dirs.read dn
  files = groupByPat files, fpats
  addInfo files
  interpretInfo files
  files

fpats = 
        inp:/(.+)-in.js/i
        exp:/(.+)-out.js/i
        info:/info.txt|(.+)-info.txt/i
        $only:/only|only.tmp|(.+)-only|(.+)-only.tmp/i
        $skip:/skip|skip.tmp|(.+)-skip|(.+)-skip.tmp/i
        $noskip:/noskip|noskip.tmp|(.+)-noskip|(.+)-noskip.tmp/i
        $qskip:/qskip|qskip.tmp|(.+)-qskip|(.+)-qskip.tmp/i

mochaBdd = (files) ->
  files = prepareList(files)
  f = mochaBddWalk files
  f()


qunit = (files) ->
  files = prepareList(files)
  walk = (d,skip,opts) ->
    for i in Object.getOwnPropertyNames(d) when i[0] isnt "$"
      do ->
        v = d[i]
        nopts = {}
        if opts?
          nopts[ix] = iv for ix, iv of opts 
        if v.$opts?
          nopts[ix] = iv for ix, iv of v.$opts
        nxtSkip = skip
        nxtSkip = true if v.$skip? or nopts.$qskip?
        nxtSkip = false if v.$noskip?
        if v.$dirPath
          if QUnit?
            QUnit.module(i, -> walk(v,nxtSkip,nopts))
          else
            console.log "QUnit.module('#{v.$ctx}');"
            walk(v,nxtSkip,nopts)
          return
        return unless v.inp?
        if QUnit?
          fn = if nxtSkip then "skip"
          else if v.$only then "only"
          else "test"
          nopts.transform ?= {}
          nopts.transform.filename ?= "#{v.$basePath}-in.js"
          nopts.transform.packageName ?= "./mfjscore"
          QUnit[fn](i, (a) ->
            res = run(v.inp,nopts)
            if v.exp?
              a.equal(res,pretty(v.exp),"should have the same semantics"))
        else
          console.log("QUnit.test", v.$ctx)
  walk(files)


module.exports = {mochaBdd, qunit, prepareList}

