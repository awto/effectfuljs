kit = module.exports = {}
config = require "./config"
escodegen = require "escodegen"
assert = require "assert"
esutils = require "esutils"
esast = esutils.ast

kit.block = mkBlock = (args) ->
  return args[0] if args.length is 1 and args[0].type is "BlockStatement"
  body = if Array.isArray args then args else [args]
  for i in body
    assert.ok(i.type?)
  {type:"BlockStatement",body}

kit.flatBlock = mkFlatBlock = (args...) ->
  return null unless args.length
  body = []
  flatten = (cur) ->
    if Array.isArray cur
      for i in cur
        flatten i
    else if cur.type is "BlockStatement"
      flatten cur.body
    else
      body.push cur
  flatten(args)
  return null unless body.length
  return body[0] if body.length is 1
  for i in body
    assert.ok(i.type?)
  {type:"BlockStatement",body}

kit.blockStmts = (stmt) ->
  return stmt.body if stmt.type is "BlockStatement"
  [stmt]

kit.ret = mkReturn = (argument) ->
  {type:"ReturnStatement",argument}

kit.call = (callee,args) ->
  callee = kit.id(callee) if callee.substr?
  {type:"CallExpression",callee,arguments:args}

kit.id = mkId = (name) -> {type:"Identifier",name}

kit.varDecl = (n, v) ->
  {
    type:"VariableDeclaration", kind: "var",
    declarations:[{
      type: "VariableDeclarator"
      id: n
      init: v
      }]}

kit.packId = packId = (id) ->
  p = config.packageVar
  return id unless p?
  kit.mem (mkId p), (mkId id)

kit.spread = (fun) ->
  return kit.call(kit.packId("spread"),[fun])

kit.spreadFun = (args, fun) ->
  if args.length is 1
    if fun.$dm$argNum? and fun.$dm$argNum > 1 or
       fun.params? and fun.params.length > 1
      return kit.spread(fun)
    return fun
  return fun if args.length is 0
  return kit.spread(fun)

kit.spreadApp = (args, fun) ->
  fun = kit.spreadFun(args, fun)
  return [kit.pure(),fun] if args.length is 0
  return [args[0],fun] if args.length is 1
  return [kit.arrM(args),fun]

kit.halt = mkHalt = -> kit.call(kit.id("halt"),[])

kit.ifte = mkIf = (test,consequent,alternate) ->
  consequent = mkFlatBlock consequent
  if alternate?
    alternate = mkFlatBlock alternate
    if alternate? and alternate.body? and alternate.body.length is 0
      alternate = null
  consequent = {type:"BlockStatement",body:[]} unless consequent?
  {type:"IfStatement",test,consequent,alternate}

{noThisNeeded} = config
noThisNeeded ?= {}

# NOTE: this will only work if callee doesn't need `this`
kit.matchEta = (p,b) ->
  x = matchSingleCallBlock b.body
  return unless x?
  c = x.callee
  if c.type is "MemberExpression"
    return unless c.object.type is "Identifier" and
      (noThisNeeded[c.object.name] or c.object.name is config.packageVar)
  else
    return unless c.type is "Identifier"
  a = x.arguments
  return if p.length < a.length
  for j,s in a
    i = p[s]
    return unless i.type is j.type and j.type is "Identifier"
    return unless i.name is j.name
  x.callee.$dm$argNum = p.length
  return x.callee

matchSingleCallBlock = (x) ->
  return unless x.length is 1
  x = x[0]
  return unless x.type is "ReturnStatement"
  x = x.argument
  return unless x?
  return unless x.type is "CallExpression"
  return x
   
kit.fun = mkFun = (params, stmt) ->
  stmt = mkBlock stmt
  eta = kit.matchEta params, stmt
  return eta if eta?
  {type:"FunctionExpression",params,body:stmt}

kit.lit = mkLit = (v) -> {type:"Literal",value: v}

kit.coerce = (v) -> kit.call(packId("coerce"),[mkFun([],v)])

kit.mem = (p...) ->
  res = p[0]
  assert.ok(res.type?)
  for i in p[1..]
    assert.ok(i.type?)
    res = {type:"MemberExpression",object:res,property:i}
  res

kit.not = (argument) ->
  {type:"UnaryExpression",prefix:true,operator:"!",argument}
kit.eq = (left, right) ->
  {type:"BinaryExpression",operator:"===",left,right}

kit.arrM = (args) -> kit.call(kit.packId("arr"), [kit.arr(args)])

kit.mbind = (from, fun) ->
  assert.ok(Array.isArray(from))
  [from,fun] = kit.spreadApp(from, fun)
  assert.ok(fun?)
  kit.call(kit.mem(from,mkId("mbind")),[fun])
kit.catch = (from, arg, to) ->
  args = []
  args.push arg if arg?
  return kit.call(kit.mem(from,mkId "mhandle"),[mkFun(args, to)])
kit.finally = (from, to) ->
  return kit.call(kit.mem(from,mkId "mfinally"), [mkFun [], to])
kit.mapply = (from, fun) ->
  [from,fun] = kit.spreadApp(from, fun)
  kit.call(kit.mem(from,mkId("mapply")),[fun])

kit.pure = (v...) ->
  args = v
  args = [] if v.length is 1 and not v[0]?
  kit.call(packId("pure"),args)

kit.exprStmt = mkExprStmt = (expression) ->
  assert.ok(expression?)
  return {type:"ExpressionStatement", expression}

kit.assign = mkAssign = (left, right) ->
  {type:"AssignmentExpression",operator:"=",left,right}
kit.arr = (els) ->
  {type:"ArrayExpression", elements: els}

kit.extend = extend = (par, other...) ->
  for i in other when i?
    for j, n of i
      pv = par[j]
      par[j] = n
  par

kit.merge = merge = (par, other...) ->
  for i in other when i?
    for j, n of i
      if Array.isArray(n)
        (par[j] ?= []).push(n...)
      else if Object(n) is n and not (n instanceof Function)
        merge(par[j] ?= {},n)
      else
        par[j] = n
  par

kit.exprError = (n, e) ->
  if e.loc? and e.loc.start?
    l = e.loc.start.line
  if l?
    n = "Line #{l}: #{n}"
  res = (new Error(n,config.filename,l))
  res.loc = e.loc
  res.lineNumber = l
  res

kit.errorPos = (e, f) ->
  try
    return f()
  catch ex
    if e.loc? and e.loc.start?
      l = e.loc.start.line
    ex.loc = e.loc
    ex.lineNumber = l
    ex.message = "Line #{l}: #{ex.message}"
    throw ex

kit.seqExpr = (expressions...) ->
  return expressions[0] if expressions.length is 1
  {type: "SequenceExpression", expressions}

kit.seq = (exprs...) ->
  return exprs[0] if exprs.length is 1
  kit.call(packId("seq"), exprs)

kit.getMembersPath = (e) ->
  res = []
  walk = (e) ->
    unless e.type is "MemberExpression"
      res.unshift e
      return
    res.unshift(e.property)
    walk(e.object)
  walk(e)
  res

kit.getMembersPathIds = (e) ->
  kit.getMembersPath(e).map(kit.getId)

kit.getId = (e) ->
  return e.name if e? and e.type is "Identifier"
  return null

kit.coerceThunk = (block) ->
  kit.call(packId("coerce"),[mkFun([], block)])

kit.coerceVal = (expr) ->
  kit.call(mkId(config.packageVar),[expr])

getLit = (e) ->
  return null unless e.type is "Literal"
  return e.value

kit.toStr = str = (e) ->
  r = getLit(e)
  unless r? and r.substr?
    throw kit.exprError("expected string",e)
  return r

kit.exprToStr = (e) ->
  return e.value if e.type is "Literal"
  throw new Error("cannot convert: " + escodegen.generate(e) + " to string")

kit.shortNodeDescr = (s) ->
  return "<NULL>" unless s?
  res = ""
  res += s.type
  {loc} = s
  if loc?
    {start,end} = loc
    if start?
      res += "@#{start.line}:#{start.column}"
    if end?
      res += "-#{end.line}:#{end.column}"
  res

