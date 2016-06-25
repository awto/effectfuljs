kit = module.exports = {}
config = require "./config"
escodegen = require "escodegen"
assert = require "assert"
esast = require("esutils").ast
{VisitorKeys} = require "estraverse"

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

kit.ret = (argument) -> {type:"ReturnStatement",argument}

kit.call = (callee,args) ->
  callee = kit.id(callee) if callee.substr?
  {type:"CallExpression",callee,arguments:args}

kit.subst = (subst, node) ->
  #TODO: some generic traversals
  varsWalk = (res, n) ->
    return unless n
    if Array.isArray n
      varsWalk(res,v) for v in n
      return
    return unless n.type
    return if esast.isExpression(n)
    switch n.type
      when "VariableDeclaration"
        res[j.id.name] = false for j in n.declarations when j.id.name
        return
      when "FunctionDeclaration" then return
      else
        varsWalk(res,n[i]) for i in VisitorKeys[n.type]
  walk = (subst, n) ->
    return n unless n
    if Array.isArray n
      n[i] = walk(subst,v) for v,i in n
      return n 
    return n unless n.type
    switch n.type
      when "FunctionExpression",  "FunctionDeclaration"
        subst = Object.create(subst)
        subst[i.name] = false for i in n.params when i.name?
        varsWalk(subst, n.body)
        n.body = walk(subst, n.body)
        n
      when "Identifier"
        fn = subst[n.name]
        if fn then fn else n
      else
        n[i] = walk(subst,n[i]) for i in VisitorKeys[n.type]
        n
  walk(subst, node)

kit.id = (name) -> {type:"Identifier",name}

kit.declarator = (n,v) -> { type: "VariableDeclarator",  id: n, init: v }

kit.varDecl = (n, v) ->
  if not v? and Array.isArray n
    return { type:"VariableDeclaration", kind: "var", declarations:n}
  { type:"VariableDeclaration", kind: "var", declarations:[kit.declarator(n,v)]}

kit.packId = packId = (id) ->
  return kit.id(id) if config.imported
  p = config.packageVar
  return kit.id(id) unless p?
  kit.mem (kit.id p), (kit.id id)

curNameId = 0

kit.genPositionName = (tag,opts) ->
  n = opts.naming
  return unless n?
  return if n isnt true and not n[tag] and not n.all
  nxt = ++curNameId
  if opts.naming.prefix?
    return kit.lit("#{opts.naming.prefix}#{nxt}")
  kit.lit(nxt)

kit.withName = (tag, opts, c) ->
  pn = kit.genPositionName(tag,opts)
  c.arguments.push(pn) if pn?
  c

kit.spread = (fun) -> kit.call(kit.packId("spread"),[fun])

kit.isFunction = (fun) -> fun.type is "FunctionExpression" or fun.type is "FunctionDeclaration"

kit.destructArr = (inp, args, fun) ->
  decls = (kit.declarator(i, kit.mem(inp, kit.lit(x))) for i,x in args)
  if kit.isFunction(fun)
    b = fun.body.body
    if b.length and b[0].type is "VariableDeclaration"
      b[0].declarations.unshift(decls...)
    else
      b.unshift(kit.varDecl(decls))
    return fun
  return kit.fun([inp], [kit.varDecl(decls), kit.ret(kit.call(fun, args))])

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
    c = c.property
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
  x = if x.type is "ReturnStatement" then x.argument
  else
    if x.type is "ExpressionStatement" then x.expression else null
  return unless x?
  return unless x.type is "CallExpression"
  return x

kit.fun = mkFun = (params, stmt) ->
  params = params.concat()
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
    unless i.type is "Identifier"
      res.computed = true
  res

kit.not = (argument) ->
  {type:"UnaryExpression",prefix:true,operator:"!",argument}
kit.eq = (left, right) ->
  {type:"BinaryExpression",operator:"===",left,right}

kit.arrM = (args) -> kit.call(kit.packId("arr"), [kit.arr(args)])

kit.catch = (from, arg, to) ->
  args = []
  args.push arg if arg?
  return kit.call(kit.mem(from,kit.id "mhandle"),[mkFun(args, to)])
kit.finally = (from, to) ->
  return kit.call(kit.mem(from,kit.id "mfinally"), [mkFun [], to])

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

isPlainObject = (o) ->
  o? and typeof o == 'object' and o.constructor == Object

kit.merge = merge = (par, other...) ->
  for i in other when i?
    for j, n of i
      if Array.isArray(n)
        unless Array.isArray(par[j])
          par[j] = []
        par[j].push(n...)
      else if isPlainObject(n)
        unless isPlainObject(par[j])
          par[j] = {}
        merge(par[j],n)
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

kit.par = (exprs...) ->
  return exprs[0] if exprs.length is 1
  kit.call(packId("par"), exprs)

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
  kit.call(kit.id(config.packageVar),[expr])

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

