gen = require './kit/generators'
dirs = require './kit/dirs'
path = require "path"

files = dirs.read(path.join(__dirname,"samples"))

#console.log files

gen.mochaBdd(files)
