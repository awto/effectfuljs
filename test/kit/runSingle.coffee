compiler = require('../../src/compiler')

main = (s) ->
  ast = compiler.parse(s.toString(), {})
  console.log("input:")
  console.log(ast)
  console.log(compiler.pretty ast, {})
  nast = compiler.transform ast
  console.log("output:")
  console.log(nast)
  res = compiler.pretty nast, {}
  console.log(res)

module.exports = main

