compiler = require './compiler'
path = require 'path'
mkdirp = require 'mkdirp'
fs = require 'fs'

opt = require('optimist')
  .boolean('help')
  .alias('h','help').describe('h','show this usage')
  .describe('output','output folder')
  .string('output')
  .alias('o','output')
  .describe('dest','output file name')
  .string('filename')
  .describe('filename','filename when reading from stdin')
  .usage('Usage: $0 [options] files...')
argv = opt.argv
if argv.help
  opt.showHelp()
  process.exit 1

outputResult = (res,inpfn) ->
  if not argv.output and not argv.dest
    console.log(res)
    return
  p = if argv.output?
    path.resolve(argv.output)
  else
    process.cwd()
  fn = argv.dest or inpfn? and path.basename(inpfn)
  fn = path.resolve(p, fn)
  if fn is inpfn
    console.error("output to same file #{fn}")
    process.exit 1
  fs.writeFileSync(fn,res)

compileStdIn = (opts) ->
  inp = ''
  process.stdin.setEncoding("utf8")
  process.stdin.on 'readable', ->
    chunk = process.stdin.read()
    if chunk?
      inp += chunk
  process.stdin.on 'end', ->
    outputResult(
      compiler.compile(inp, argv, argv.filename ? 'console')
      argv.filename)

compileFile = (c) ->
  try
    res = compiler.compileFile(c, argv)
  catch e
    console.error("#{e} while parsing file #{path.resolve c}")
    process.exit 1
  outputResult(res,c)

module.exports = ->
  if argv.output
    mkdirp.sync(argv.output)
  if argv._.length 
    compileFile(path.resolve(i)) for i in argv._
  else
    compileStdIn()
  return
