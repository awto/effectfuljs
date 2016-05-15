compiler = require "../../src/compiler"
config = require "../../src/config"

isQUnit = typeof QUnit isnt "undefined"

run = (s,opts) ->
  opts ?= {}
  opts = {verbose:opts} if opts is true or opts is false
  opts.verbose ?= config.verbose
  if opts.verbose
    console.group("run") if console.group? 
    console.log s
  s = s.toString()
  if opts.verbose
    console.log s
  unless opts.default
    opts.transform ?= {}
    opts.transform.start = "defaultFull"
    opts.transform.packageVar = "M"
  res = compiler.compile s, opts
  console.log res if opts.verbose
  if opts.verbose
    console.log res
    console.groupEnd() if console.groupEnd?
  res

pretty = (s) ->
  tr = compiler.print(s.toString())

assert = require('assert')

exprEqual = (l, r) ->
  blockEqual "(#{l});", "(#{r});"

blockEqual = (l,r,opts) -> equal(run(l,opts),pretty(r),"same semantics")

equal = if isQUnit
  (l,r,d) -> expect(l).to.equal(r,d)
else
  (l,r,d) -> assert.equal(l,r)

exprSame = (l, r) ->
  it "should not change semantics", ->
    exprEqual l, r

blockSame = (l, r) ->
  it "should not change semantics", ->
    exprEqual l, r

module.exports = {run, pretty, compiler, exprEqual, exprSame,
  blockEqual, blockSame, equal}
