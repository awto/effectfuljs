compiler = require "../compiler"
through = require "through2"
path = require "path"
kit = require "./kit"

module.exports = (filename,opts) ->
  opts ?= {}
  eopts = compiler.FILE_EXTENSIONS[path.extname filename]
  return through() if eopts is false
  eopts ?= {}
  opts = kit.merge {}, eopts, opts
  opts.transform ?= {}
  opts.transform.filename = filename
  chunks = []
  transform = (chunk, encoding, callback) ->
    chunks.push(chunk)
    callback()
  flush = (callback) ->
    source = Buffer.concat(chunks).toString()
    try
      if opts.timing
        console.time("transform #{filename}")
      res = compiler.compile(source, opts)
      if opts.timing
        console.timeEnd("transform #{filename}")
      if opts.transformDebug
        console.log "result:", res
      @push(res)
      callback()
    catch e
      callback(e)
  through(transform,flush)


