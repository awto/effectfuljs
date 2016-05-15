util = require "util"
esprima = require "esprima"
escodegen = require "escodegen"
config = require "./config"
kit = require "./kit"
{Scope} = require "./scope"
require "./stmt"
require "./par"
fs = require "fs"
root = module.exports
findup = require("findup").sync
path = require("path")
 
defaults =
    loc: true
    range: true
    token: true
    comment: true

root.FILE_EXTENSIONS =
  ".mjs": {profile: "minimal"}
  ".json": false

defaults =
  parser:
    loc: true
    range: true
    token: true
    comment: true
  transform: {}

CONFIG_NAME = "mfjs-config.json"

convOptions = (v,fn) ->
  v = {} unless v?
  v = {} if v is true
  v = {profile:v} if v.substr?
  v = kit.merge {}, defaults, v
  fn ?= v.transform.filename
  if fn?
    v.parser.source = v.transform.filename = fn
    try
      f = findup(path.dirname(fn), CONFIG_NAME)
      console.log('using config #{f}') if config.versbose
    catch e
      if config.verbose
        console.log('looking for #{CONFIG_NAME} failed: #{e}')
    kit.merge(v, require(path.join(f,CONFIG_NAME))) if f?
  v

root.compile = compile = (str, opts) ->
  opts = convOptions opts
  ast = esprima.parse str, opts.parser
  nast = transform(ast,opts)
  escodegen.generate nast, opts.printer

root.compileFile = (fn, opts) ->
  txt = fs.readFileSync fn, "utf8"
  opts = convOptions(opts,fn)
  opts.parse ?= {}
  compile(txt, opts)

root.parse = (str, opts) ->
  esprima.parse str, opts

root.print = (str) ->
  ast = root.parse str
  @pretty ast

root.pretty = (ast, opts) ->
  escodegen.generate ast, convOptions(opts).printer

root.transform = transform = (ast,opts) ->
  oldConfig = kit.merge({}, config)
  opts ?= {}
  try
    kit.merge(config, opts.transform) if opts.transform?
    ctx = new Scope()
    res = ctx.prog(ast,opts)
    res.type = "Program"
    return res
  finally
    for i of config
      delete config[i]
    kit.merge(config,oldConfig)

