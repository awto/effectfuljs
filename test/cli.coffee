execSync = require('child_process').execSync
expect = require('expect.js')
path = require('path')
IDIR = path.join(__dirname, 'cli')
ODIR = path.join(__dirname, 'cliout')
require('rimraf').sync(ODIR)
fs = require('fs')
compiler = require('../src/compiler')

describe 'cmd', ->
  it 'transforms a single file', ->
    CMD="mfjsc #{path.join(IDIR,'test1-in.js')} --transform.packageVar=KK --transform.start=minimal -o #{ODIR}"
    execSync(CMD)
    expect(compiler.print(fs.readFileSync(path.join(IDIR,'test1-out.js'),'utf-8')))
      .to.equal(compiler.print(fs.readFileSync(path.join(ODIR,'test1-in.js'),'utf-8')))
    CMD="mfjsc #{path.join(IDIR,'test1-in.js')} --transform.packageVar=KK --transform.start=minimal --dest=#{ODIR}/res1.js"
    execSync(CMD)
    expect(compiler.print(fs.readFileSync(path.join(IDIR,'test1-out.js'),'utf-8')))
      .to.equal(compiler.print(fs.readFileSync(path.join(ODIR,'res1.js'),'utf-8')))
    CMD="mfjsc #{path.join(IDIR,'test1-in.js')} --transform.packageVar=KK --transform.start=minimal --dest=res3.js -o #{ODIR}"
    execSync(CMD)
    expect(compiler.print(fs.readFileSync(path.join(IDIR,'test1-out.js'),'utf-8')))
      .to.equal(compiler.print(fs.readFileSync(path.join(ODIR,'res3.js'),'utf-8')))
    CMD="mfjsc --transform.packageVar=KK --transform.start=minimal < #{path.join(IDIR,'test1-in.js')} > #{ODIR}/res2.js"
    execSync(CMD)
    expect(compiler.print(fs.readFileSync(path.join(IDIR,'test1-out.js'),'utf-8')))
      .to.equal(compiler.print(fs.readFileSync(path.join(ODIR,'res2.js'),'utf-8')))

