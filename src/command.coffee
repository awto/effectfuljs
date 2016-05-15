compiler = require './compiler'
path = require 'path'
mkdirp = require 'mkdirp'
fs = require 'fs'

opt = require('optimist')
  .boolean('help')
  .alias('h','help').describe('h','show this usage')
  .describe('output','output folder (stdout if not specified)')
  .string('output')
  .alias('o','output')
  .usage('Usage: $0 [options] files...')
argv = opt.argv

if argv.help or not argv._.length
  opt.showHelp()
  process.exit 1

compileFile = (c) ->
  if argv.output?
    p = path.relative(c, argv.output)
    if path.dirname(p) is "."
      console.error("output to same folder #{c}")
      process.exit 1
    fn = path.join(argv.output, path.basename(c))
  try
    res = compiler.compileFile(path.resolve(c), argv)
  catch e
    console.error("#{e} while parsing file #{path.resolve c}")
    process.exit 1
  unless fn?
    return
  fs.writeFileSync(fn, res)

module.exports = ->
  if argv.output
    mkdirp.sync(argv.output)
  compileFile(i) for i in argv._
  return
