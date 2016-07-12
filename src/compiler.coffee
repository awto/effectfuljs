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
esmangle = require("esmangle")
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

pipeline = [
    # "pass/hoist-variable-to-arguments",
    #"pass/transform-dynamic-to-static-property-access",
    #"pass/transform-dynamic-to-static-property-definition",
    #"pass/transform-immediate-function-call",
    #"pass/transform-logical-association",
    #"pass/reordering-function-declarations",
    "pass/remove-unused-label",
    "pass/remove-empty-statement",
    "pass/remove-wasted-blocks",
    "pass/transform-to-compound-assignment",
    # "pass/transform-to-sequence-expression",
    #"pass/transform-branch-to-expression",
    #"pass/transform-typeof-undefined",
    #"pass/reduce-sequence-expression",
    # "pass/reduce-branch-jump",
    #"pass/reduce-multiple-if-statements",
    #"pass/dead-code-elimination",
    # "pass/remove-side-effect-free-expressions",
    # "pass/remove-context-sensitive-expressions",
    # "pass/tree-based-constant-folding",
    # "pass/concatenate-variable-definition",
    "pass/drop-variable-definition"
    #    "pass/remove-unreachable-branch",
    # "pass/eliminate-duplicate-function-declarations"
  ]

pipeline = [pipeline.map(esmangle.pass.require)]

###
pipeline.push({
  once: true,
  pass: [
    # "post/transform-static-to-dynamic-property-access",
    "post/transform-infinity"
    # "post/rewrite-boolean",
    # "post/rewrite-conditional-expression",
    # "post/omit-parens-in-void-context-iife"
    ].map(esmangle.pass.require)
  })
###

root.mangle = (ast) ->
  return esmangle.optimize(ast,pipeline)

root.compile = compile = (str, opts, fn) ->
  opts = convOptions opts, fn
  ast = esprima.parse str, opts.parser
  nast = transform(ast,opts)
  if opts.mangle is true
    nast = root.mangle(nast)
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

