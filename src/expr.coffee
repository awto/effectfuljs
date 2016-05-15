config = require "./config"
{Scope} = require "./scope"
{Visitor, ActiveVisitor, DisabledVisitor} = require "./visitor"
kit = require "./kit"
policy = require "./policy"
directive = require "./directives"
{VarUsage} = require "./builder"
require "./graph"
require "./expr"

class ExprBuilder
  constructor: (@expr, @ctx) ->
    @init()
    @cur = if @ctx.policy.opts.bind
      @ctx.effValNode(@expr)
    else @ctx.exprNode(@expr)
  init: ->
    @deps = []
  add: (s,par,x,opts) ->
    r = @ctx.expr s, opts
    if r.pureExpr? and not r.vdeps.mod
      par[x] = r.pureExpr
      @cur.vdeps.addInnerDeep(r.vdeps)
      return
    r.setPosition([par,x])
    @deps.push(r)
    return
  result: ->
    res = @cur
    {vdeps} = res
    if @deps.length
      res = @ctx.bindNode(res, @deps)
    res.origExpr = false if @orig is false
    @init()
    @cur = res

class DummyBuilder
  constructor: (@expr,@ctx) ->
  add: (s,par,x,opts) ->
    r = @ctx.expr s, opts
    if r.pureExpr?
      par[x] = r.pureExpr
      return
    throw new Error("INTERNAL: not expected effectful expression")
  result: -> @ctx.pureExprNode(@expr)

Visitor::CallExpression = (e) ->
  opts = @policy.opts
  {callee,arguments:args} = e
  if callee.type is "Identifier"
    n = callee.name
    if n is "require" and args.length is 1
      a = args[0]
      if a.type is "Literal" and a.value is config.packageName
        @ctx.policy._libRequire()
        return @ctx.pureExprNode(e)
  dir = do ->
    return directive.$packVar if n is config.packageVar
    return unless callee.type is "MemberExpression"
    obj = callee.object
    return unless obj.type is "Identifier" and obj.name is config.packageVar
    prop = callee.property
    if prop.type is "Identifier"
      dn = prop.name
    else if callee.computed and prop.type is "Literal" and prop.value.substr
      dn = prop.value
    else
      return
    directive[dn]
  if dir?
    res = kit.errorPos(e, => dir.call(@ctx,e,e.arguments...))
    return @ctx.emptyNode() unless res?
    return res
  idn = opts.identity
  if idn? and idn isnt false
    idn = 0 if idn is true
    return @ctx.expr(e.arguments[idn])
  builder = @getExprBuilder(e)
  {callee,arguments:args} = e
  builder.add(callee, e, "callee")
  if opts.subScope isnt false and callee.$dm$eff is true
    opts.bind = true
  builder.add(i, args, x) for i, x in args
  builder.result()

directive.$packVar = directive.reflect = (e,arg) ->
  bnd = @policy.opts.bind
  e = @expr arg
  return @effValNode(e.pureExpr) if bnd and e.pureExpr
  return e

directive.reify = (e, arg) ->
  @reifyNode().setBody(@expr(arg))
    .setIsThunk(arg.type is "FunctionExpression")

directive.p = directive.p = (e, arg) -> @pureExprNode(arg)

Visitor::FunctionExpression = (e) ->
  ctx = @ctx.subScope(e)
  if e.params?
    ctx.vars[i.name] = true for i in e.params when i.name
  return @ctx.pureExprNode(e) unless ctx?
  e.body = ctx.prog e.body
  e.$dm$eff = true if ctx.eff
  res = @ctx.exprNode(e)
  vars = ctx.vars
  @ctx.refs[i] = true for i, v of ctx.upds when v and not ctx.vars[i]
  if e.generator
    e.generator = false
  return res

ActiveVisitor::ThisExpression = (e) ->
  @ctx.thisVar ?= @ctx.uniqId("_this")
  return @ctx.exprNode(@ctx.thisVar)

Visitor::AssignmentExpression = (e) ->
  {left,right} = e
  deps = []
  res = @ctx.exprNode(e)
  @policy.nameDetails(left,e.operator)
  if left.type is "Identifier"
    if e.operator is "="
      res.vdeps.addAssign(left.name)
    else
      res.vdeps.addUpd(left.name)
    unless @ctx.vars[left.name]
      @ctx.upds[left.name] = true
  else
    lv = @ctx.expr left
    if lv.pureExpr?
      res.vdeps.addInnerDeep(lv.vdeps)
      e.left = lv.pureExpr
    else
      deps.push(lv.setPosition([e,"left"]))
  rv = @ctx.expr right
  if rv.pureExpr?
    res.vdeps.addInnerDeep(rv.vdeps)
    e.right = rv.pureExpr
  else
    deps.push(rv.setPosition([e,"right"]))
  if deps.length
    res = @ctx.bindNode(res,deps)
  res

ActiveVisitor::UpdateExpression = (e) ->
  res = @ctx.exprNode(e)
  a = e.argument
  if a.type is "Identifier"
    unless @ctx.vars[a.name]
      @ctx.upds[a.name] = true
    res.vdeps.addUpd(a.name)
  else
    av = @ctx.expr a
    if av.pureExpr
      e.argument = av.pureExpr
    else
      res = @ctx.bindNode(res, [av.setPosition([e,"argument"])])
  res

directive.$ = (e, arg) ->
  @placeholderNode(arg)
    
ActiveVisitor::MemberExpression = (e) ->
  {object, property} = e
  if object.type is "Identifier" and object.name is config.packageVar and
    property.type is "Identifier" and property.name is "$"
      return @ctx.placeholderNode()
  builder = @getExprBuilder(e)
  builder.add(object, e, "object")
  if e.computed
    builder.add(property, e,"property")
  builder.result()

ActiveVisitor::Identifier = (e) ->
  res = @ctx.exprNode(e)
  res.vdeps.uses[e.name] = true
  @ctx.ids[e.name] = true unless e.$dm$orig
  res

Visitor::getExprBuilder = (e) -> new DummyBuilder(e,@ctx)
ActiveVisitor::getExprBuilder = (e) -> new ExprBuilder(e,@ctx)

ActiveVisitor::LogicalExpression = (e) ->
  if @policy.opts.expr is "par"
    builder = @getExprBuilder(e)
    builder.add(e.left, e, "left")
    builder.add(e.right, e, "right")
    return builder.result()
  cexpr = {type:"ConditionalExpression"}
  l = @ctx.expr(e.left)
  r = @ctx.expr(e.right)
  return @ctx.exprNode(e) unless l.eff or r.eff
  rexpr = r.getBuilder().setOpts(@policy.opts).toExpr()
  b = if r.eff then @ctx.effValNode(cexpr) else @ctx.pureExprNode(cexpr)
  res = @ctx.sharedNode(l,b)
  lexpr = cexpr.test = res._ref
  lexpr = kit.pure(lexpr) if @policy.opts.coerce is "none" and r.eff
  if e.operator is "||"
    cexpr.consequent = lexpr
    cexpr.alternate = rexpr
  else
    cexpr.consequent = rexpr
    cexpr.alternate = lexpr
  res

ActiveVisitor::ConditionalExpression = (e) ->
  if @policy.opts.expr is "par"
    builder = @getExprBuilder(e)
    builder.add(e.test, e, "test")
    builder.add(e.consequent, e, "consequent")
    builder.add(e.alternate, e, "alternate")
    return builder.result()
  c = @ctx.expr(e.consequent)
  a = @ctx.expr(e.alternate)
  if c.eff or a.eff
    e.consequent = c.getFullExpr(true)
    e.alternate = a.getFullExpr(true)
    n = @ctx.effValNode(e)
  else
    n = @ctx.pureExprNode(e)
  @ctx.bindNode(n, [@ctx.expr(e.test).setPosition([e,"test"])])

directive.answer = directive.yield = (s,arg) -> @root.yieldNode(@expr(arg))

ActiveVisitor::YieldExpression = (e) ->
  @ctx.root.yieldNode(@ctx.expr(e.argument))

ActiveVisitor::BinaryExpression = (e) ->
  builder = @getExprBuilder(e)
  builder.add(e.left, e, "left")
  builder.add(e.right, e, "right")
  builder.result()

ActiveVisitor::UnaryExpression = (e) ->
  builder = @getExprBuilder(e)
  builder.add(e.argument, e, "argument")
  builder.result()

ActiveVisitor::NewExpression = (e) ->
  builder = @getExprBuilder(e)
  args = e.arguments
  builder.add(i, args, x) for i, x in args
  builder.result()

ActiveVisitor::SequenceExpression = (e) ->
  builder = @getExprBuilder(e)
  args = e.expressions
  builder.add(i, args, x) for i, x in args
  builder.result()

ActiveVisitor::ArrayExpression = (e) ->
  builder = @getExprBuilder(e)
  args = e.elements
  builder.add(i, args, x) for i, x in args when i
  builder.result()

ActiveVisitor::ObjectExpression = (e) ->
  builder = @getExprBuilder(e)
  builder.add(i.value, i, "value") for i in e.properties
  builder.result()

module.exports = {}

