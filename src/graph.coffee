kit = require "./kit"
{Scope} = require "./scope"
builder = require "./builder"
assert = require "assert"
config = require "./config"
{VarUsage} = builder

module.exports = root = {}

# generates smart constructor for node
root.regNodeType = regNodeType = (n, ctr) ->
  root["#{n[0].toUpperCase()}#{n.substr(1)}"] = ctr
  Scope.prototype[n] = (args...) ->
    args.unshift null
    nctr = Function::bind.apply(ctr,args)
    nctr.name = ctr.name
    res = (new nctr()).init(@)
    res

id = 0

# common parent for effect-flow graph nodes
class Node
  constructor: ->
    @unwindBy = {}
    @id = id++
    @vdeps = new VarUsage()
  # copies some options and state from another node
  morphInit: (other) ->
    @setOrig(other.orig)
    @vdeps = other.vdeps
    @
  # initialize node (called from its smart constructor)
  init: (ctx) ->
    @opts = kit.merge({},ctx.policy.opts)
    @ctx = ctx
    @vdeps.vars = ctx.vars
    @vdeps.refs = ctx.refs
    @
  # sets JS AST statement representing original block
  # translated into node, it is used as is if the node
  # is pure
  setOrig: (orig) ->
    @orig = orig unless @orig?
    @
  # sets parents of the node
  setParent: (@parent) -> @
  # returns resulting list of JS AST statements
  getFullBlock: (eff) ->
    eff = eff and @opts.coerce is "none"
    @getBuilder().toBlock(eff)
  # returns resulting list of JS AST statements
  getFullExpr: (eff) ->
    eff = eff and @opts.coerce is "none"
    @getBuilder().toExpr(eff)
  # first translation pass
  fwdPass: (use) ->
    unless @_fwdPassDone
      @_fwdPassDone = true
      @vdeps.setBefore(use)
      @_fwdPass(use)
      kit.extend(use,@vdeps.uses)
    @parent.vdeps.addInner(@vdeps) if @parent?
    @
  _fwdPass: (use) ->
  # second translation pass, goes in reverse order
  backPass: (use) ->
    if @eff
      @propagateEff()
    kit.extend(@vdeps.after,use)
    @_backPass(use)
    kit.extend(use,@vdeps.uses)
    @
  _backPass: ->
  # signals the node is effectful and update the information
  # to all dependent nodes
  propagateEff: ->
    return @ if @_propagateEffDone
    @_propagateEff()
  _propagateEff: ->
    @_propagateEffDone = true
    @eff = true
    @ctx.eff = true
    @
  # converts node into JS AST builder
  getBuilder: ->
    b = (do =>
      return builder.empty() if @isEmpty()
      unless @eff
        return builder.pure(kit.blockStmts(@orig)) if @orig
      @_getBuilder())
    b.setOpts(@opts).mergeEnv(@vdeps)
  # returns node having same effect but not returning any result
  # (or same)
  ignoreResult: ->
    @ignoreResult = true
    @

root.Node = Node

# common parent for effectful nodes
class EffectfulNode extends Node
  constructor: -> super()
  eff: true

# PureBlock should definitely not have effects,
# all returns/throw/break/continue
# parts MUST be in corresponding sub-nodes
class PureNode extends Node
  constructor: (@block) ->
    super()
    @block ?= []
  eff: false
  _getBuilder: -> builder.pure(@block)
  pureBlock: -> @block

# node representing pure JS expression
class PureExprNode extends PureNode
  constructor: (@pureExpr) ->
    super [kit.ret(@pureExpr)]
  setExpr: (@pureExpr) ->
    @block = [kit.ret(@pureExpr)]
    @
  _getBuilder: -> builder.exprPure(@pureExpr)
  ignoreResult: ->
    @ctx.pureNode([kit.exprStmt(@pureExpr)]).morphInit(@)

regNodeType "pureNode", PureNode
regNodeType "pureExprNode", PureExprNode

Scope::exprNode = (e) ->
  (if @policy.opts.bind
    new EffValNode(e)
  else
    new PureExprNode(e)).init(@)

Scope::pureExprNode = (e) ->
  new PureExprNode(e).init(@)

# nothing (EmptyStatement)
class EmptyNode extends PureNode
  constructor: ->
    super([])
    @orig = {type:"EmptyStatement"}
  setOrig: -> @
  getBuilder: -> builder.empty().setOpts(@opts).mergeEnv(@vdeps)

regNodeType "emptyNode", EmptyNode

# either it is pure or not may be calculated only in runtime
class DynNode extends Node
  constructor: ->
    super()
  _propagateEff: ->
    super()
    if @parent?
      @parent.propagateEff()
    @

# node representing `M.reify` call
class ReifyNode extends Node
  constructor: ->
    super()
  eff: false
  setBody: (@body) ->
    @body.setParent(@)
    @
  setIsThunk: (@isThunk) -> @
  setVar: (@var) -> @
  _backPass: (use) ->
    @body.backPass(use)
  _fwdPass: (use) ->
    @body.fwdPass(use)
  _propagateEff: -> @
  getBuilder:  ->
    e = if @isThunk
      @body.getBuilder().toExpr(true)
    else
      kit.fun([], @body.getBuilder().toBlock(true))
    expr = kit.call(kit.packId("reify"),[e])
    if @var
      return builder.pure([kit.varDecl(@var, expr)]).mergeEnv(@vdeps)
    return builder.exprPure(expr).mergeEnv(@vdeps)

regNodeType "reifyNode", ReifyNode

# represents ordered sequence of other nodes
class BlockNode extends DynNode
  constructor: ->
    super()
    @block = []
    @placeholders = []
  # adds children to the end of the sequence
  append: (c...) ->
    for i,x in c when i? and not i.isEmpty()
      i.setParent(@)
      if i.eff
        @eff = true
      @block.push i
    @
  _getBuilder: ->
    cur = builder.empty()
    {block} = @
    bl = block.length
    for i,x in block
      cur = cur.append(i.getBuilder())
    cur
  addPlaceholder: (e, p) ->
    x = @block.indexOf e
    assert.ok(x >= 0)
    (@placeholders[x] ?= []).push p
  _fwdPass: (use) ->
    @placeholders = []
    ouse = kit.extend({},use)
    i.fwdPass(use) for i,x in @block
    if @placeholders.length
      c = @
      for i, x in @placeholders when i by -1
        b = c.block
        n = b.splice(0,x)
        nb = switch n.length
          when 0 then @ctx.emptyNode()
          when 1 then n[0]
          else c = @ctx.blockNode().append(n...).fwdPass(ouse)
        s = {}
        j.setBlock(nb,b,s) for j in i
    delete @placeholders
  _backPass: (use) ->
    eff = @eff
    unless eff
      for f in @block
        if f.eff
          eff = true
          break
    for i in @block by -1
      i.backPass(use)
    if eff
      @_propagateEff()
    @
  last: -> @block[@block.length - 1]

regNodeType "blockNode", BlockNode

Node::getTail = -> @

Scope::nodes = (arr...) ->
  if arr.length is 1
    return arr[0]
  res = []
  walk = (n) ->
    if n instanceof BlockNode
      for i in n.block
        walk(i)
    else
      res.push n
  walk(i) for i in arr
  return @emptyNode() unless res.length
  return res[0] if res.length is 1
  return @blockNode().append(arr...)

Node::append = (args...) ->
  @ctx.nodes(@,args...)
EmptyNode::append = (f,nxt...) ->
  return f.append(nxt...) if nxt.length
  return f
PureNode::append = (f,nxt...) ->
  if f.pureBlock?
    @block.push(f.pureBlock()...)
    return @append(nxt...) if nxt.length
    return @
  super(f,nxt...)

Node::fullDeps = ->
Node::setPosition = (@exprPos) -> @

Node::fullDeps = (pos, deps) ->
  if @exprPos
    pos.push @exprPos
    deps.push @

PureNode::fullDeps = ->
  if @exprPos
    [p,px] = @exprPos
    p[px] = kit.lit(null)

PureExprNode::fullDeps = (pos,deps) ->
  if @exprPos
    if @vdeps.mod
      pos.push @exprPos
      deps.push(@)
    else
      [p,px] = @exprPos
      p[px] = @pureExpr

class EffValNode extends EffectfulNode
  constructor: (@val) -> super()
  ignoreResult: -> @noRes = true; @
  _getBuilder: -> builder.exprEffCoerce(@val)

regNodeType "effValNode", EffValNode

lookupPlaceholderTarget = ->
  i = @
  loop
    p = i.parent
    break unless p?
    if p.addPlaceholder?
      p.addPlaceholder(i, @)
      break
    i = p
  @

# represents placeholder expression `M.$`
class PlaceholderNode extends PureExprNode
  constructor: (@arg) ->
    super()
  setExpr: (expr) ->
    return super(expr) unless @arg
    super(kit.mapply([expr],kit.fun([], [kit.ret @arg])))
  setBlock: (n, b, s) ->
    vn = s.vn
    @depBlock = n
    unless s.vn?
      @prim = true
      s.vn = vn = @ctx.uniqId("n")
      b.unshift(@ctx.reifyNode().setBody(n).setVar(vn).setParent(@))
      @ctx.refs[i] = true for i of n.vdeps.mods
    @setExpr(vn)
  _fwdPass: (use) ->
    lookupPlaceholderTarget.call(@)

Node::fillPlaceholder = (p) ->
  @parent.fillPlaceholder(p, @)

BlockNode::fillPlaceholder = (p) ->
  {block} = @
  x = block.indexOf(n)
  assert.ok(x >= 0)

regNodeType "placeholderNode", PlaceholderNode

Node::setExprPos = (@exprPos) -> @

# represents node with variables bound from another nodes
class BindNode extends DynNode
  constructor: (body,deps) ->
    super()
    @setDeps(deps)
    @setBody(body)
  bindNode: true
  setBody: (body) ->
    body.setParent(@) if body?
    @body = body
    @
  # dependencies, their resulting values to be substituted at
  # defined positions within `body`
  setDeps: (deps) ->
    for i in deps
      i.setParent(@)
    @deps = deps
    @
  _fullDeps: (pos, deps) ->
    @body.fullDeps(pos,deps)
    for i,x in @deps
      i.fullDeps(pos,deps)
    return
  # returns positions along with dependencies
  fullDeps: (pos,deps) ->
    if @body.eff
      super(pos,deps)
    else @_fullDeps(pos,deps)
  # returns builder for more than 1 effectful dependency
  # overloaded for sequence builder
  assemblePar: (deps, cur) -> builder.par(deps,cur)
  _getBuilder: ->
    pos = []
    eargs = []
    @_fullDeps(pos,eargs)
    deps = []
    cur = @body.getBuilder()
    shallow = true
    commit = =>
      switch deps.length
        when 0 then return cur
        when 1 then cur = deps[0].append(cur)
        else cur = @assemblePar(deps, cur)
      deps = []
      cur
    for [p,px],x in pos by -1
      e = eargs[x]
      unless e.eff
        if not e.vdeps.mod # or shallow
          eb = e.getBuilder().toExprBuilder()
          cur.pushEnv(eb.env)
          p[px] = eb.expr
          continue
        if shallow
          eb = e.getBuilder().toExprBuilder()
          p[px] = eb.expr
          nxt = commit()
          cur = builder.pure([]).pushEnv(eb.env).setOpts(@opts).append(nxt)
          continue
      b = e.getBuilder().setBindVar(p[px] = @ctx.uniqId("b"))
      if e.vdeps.mod
        cur = b.append(commit())
      else
        deps.unshift(b)
      shallow = false
    commit()
  ignoreResult: ->
    super()
    @setBody(@body.ignoreResult())
    @
  _backPass: (use) ->
    @body.backPass(use)
    for i in @deps by -1
      i.backPass(use)
    for i in @deps
      eff = eff or i.eff
    eff or= @eff or @body.eff
    if eff
      @propagateEff()
    @
  _fwdPass: (use) ->
    {block} = @
    for i in @deps
      i.fwdPass(use)
    @body.fwdPass(use)

regNodeType "bindNode", BindNode

simpleExpressions =
  Literal: true
  Identifier: true

isSimpleExpr = (e) ->
  simpleExpressions[e.type]

# simple expression result bound to new generated variable
class SharedNode extends DynNode
  constructor: (def,body) ->
    super()
    @setDef(def)
    @setBody(body)
    @refs = []
  setDef: (@def) ->
    if @def
      @def.setParent(@)
      @eff = true if @def.eff
    @
  setBody: (@body) ->
    if @body
      @body.setParent(@)
      @eff = true if @body.eff
    @
  init: (ctx) ->
    if @def.pureExpr and isSimpleExpr(@def.pureExpr)
      @_ref = @def.pureExpr
      @_simplExpr = true
    else
      @_ref = @name = ctx.uniqId "s"
    super(ctx)
  _getBuilder: ->
    return @body.getBuilder() if @_simplExpr
    if @def.pureExpr?
      builder.pure([kit.varDecl(@name,@def.pureExpr)])
        .mergeEnv(@def.vdeps)
        .append(@body.getBuilder())
    else
      builder.par([@def.getBuilder().setBindVar(@name)],@body.getBuilder())
  ignoreResult: ->
    super()
    @setBody(@body.ignoreResult())
    @
  _backPass: (use) ->
    @body.backPass(use)
    @def.backPass(use)
    eff = @eff or @body.eff or @def.eff
    if eff
      @propagateEff()
    @
  _fwdPass: (use) ->
    {block} = @
    @def.fwdPass(use)
    @body.fwdPass(use)

regNodeType "sharedNode", SharedNode

# common parent for break, continue, return statements
# and yield expression
class JumpNode extends DynNode
  constructor: (@dst,@kind) ->
    super()
    @vdeps.skipMods()
  setDst: (@dst) -> @
  _fwdPass: (use) ->
    @val.fwdPass(use) if @val
    i = @
    loop
      i = i.parent
      break if not i? or i is @dst
      i.unwindBy[@id] = @
    return

# represents break, continue or return statement
class BreakNode extends JumpNode
  constructor: (dst, val, name) ->
    super(dst, name ? "brk")
    @setVal(val)
  setVal: (@val) ->
    @val.setParent(@) if @val
    @
  _getBuilder: ->
    if @ret
      return @val.getBuilder() if @val
      return builder.empty()
    lab = @dst.getLabel()
    if @val
      vexpr = @val.getBuilder().toExpr() if @val?
      expr = if @val.eff
        kit.mbind([vexpr],lab)
      else
        kit.call(lab,[vexpr])
    else
      thread = @dst.thread
      if thread.length > 1
        thread = [kit.arr(thread)]
      expr = kit.call(lab,thread)
    return builder.exprEff(expr).noCapture().setBrk(true)
  _backPass: (use) ->
    eff = @eff
    if @val
      @val.backPass(use)
      eff or= @val.eff
    if eff
      @propagateEff()
    @

# represents yield or M.yield expressions
class YieldNode extends BreakNode
  constructor: (dst,val) ->
    super(dst,val)
    @eff = true
  ignoreResult: -> @
  setBlock: (@block) -> @
  _getBuilder: ->
    b = @block.getBuilder().append(super())
      .setOpts(@opts).mergeEnv(@vdeps).toExprBuilder()
    return builder.exprEff(kit.call(kit.mem(b.expr,kit.id("mopt")),[])).morph(b)
  _fwdPass: (use) ->
    @dst.opts.keepScope = true
    lookupPlaceholderTarget.call(@)
  _backPass: (use) ->
    @propagateEff()
    @block.backPass(use)

regNodeType "breakNode", BreakNode
regNodeType "yieldNode", YieldNode

# represents various branching nodes, such as `if` statements or loops etc
class BranchedNode extends DynNode
  constructor: (@fun, @template) ->
    super()
    @deps = []
  setDeps: (deps...) ->
    cur = @deps
    cur.length = 0
    if deps?
      for i in deps
        i.setParent(@)
        cur.push i
    @
  _getItemBuilder: (i) ->
    i.getBuilder()
  _getBuilder: ->
    {eff} = @
    threadOut = {}
    nenv = {}
    for i in @deps
      i.vdeps.threadOutMap(threadOut)
    blocks = []
    needCoerce = false
    for i in @deps
      cb = @_getItemBuilder(i)
      cb = cb.addThread(threadOut)
      bn = cb.capture().toBlockBuilder(eff)
      needCoerce or= bn._needCoerce is true
      for j, v of bn.env
        w = nenv[j] ?= {}
        w.use = true if v.use
        w.set = true if v.set
        w.mod = true if v.mod
        w.thread = true if threadOut[j]
      blocks.push(kit.flatBlock(bn.block))
    block = builder.block(eff, [@fun(blocks...)])
      .pushEnv(nenv)
      .noCapture()
      .needCoerce(needCoerce ? false)
    return block
  _propagateEff: ->
    super()
    {deps} = @
    for i,x in deps
      deps[x] = i.propagateEff()
    @
  _backPass: (use) ->
    unless @eff
      for i in @deps when i.eff
        @eff = true
        break
    if @eff
      @_propagateEff()
    for i in @deps
      i.backPass(kit.extend({},use))
    for i in @deps
      kit.extend(use,i.vdeps.uses)
    @
  _fwdPass: (use) ->
    for i in @deps
      i.fwdPass(kit.extend({},use))
    return

regNodeType "branchedNode", BranchedNode

# common parent for simple combinators with one inner sub node (body)
class WrapNode extends DynNode
  constructor: (body) ->
    super()
    @setBody(body)
  setBody: (@body) ->
    @body.setParent(@) if @body?
    @
  _backPass: (use) ->
    if @eff or @body.eff
      @_propagateEff()
    @body.backPass(use)
    @
  _fwdPass: (use) ->
    @body.fwdPass(use)

# returns a function with threaded variables representing the node
getBuilderFun = (node,ctx) ->
  thread = node.vdeps.threadOutMap()
  b = node.getBuilder()
  b.addThread(thread) if thread?
  b = b.capture().toBlockBuilder()
  thread[i] = true for i of b.env when i.thread
  vars = (i for i of thread).sort().map(kit.id)
  fun = kit.spreadFun(vars,kit.fun(vars, b.block))
  return [fun,vars,b,thread]

# represents M.repeat
class RepeatNode extends WrapNode
  constructor: (body) -> super(body)
  _getBuilder: ->
    [fun,vars,b] = getBuilderFun(@body,@ctx)
    if vars.length > 1
      vars = [kit.arr(vars)]
    expr = kit.call(kit.packId("repeat"),[fun,vars...])
    builder.exprEff(expr).morph(b).mergeEnv(@vdeps).noCapture()
  _fwdPass: (use) ->
    @body.fwdPass({})
  _backPass: (use) ->
    use[i] = true for i of @body.vdeps.uses
    super(use)

regNodeType "repeatNode", RepeatNode

# M.block or M.scope for encoding break, continue, return statements
class ControlNode extends WrapNode
  constructor: (@kind) ->
    @exits = []
    @kind ?= "block"
    @labCount = 0
    @thread = []
    super()
  setLabel: (lab) ->
    lab ?= "l"
    @label = @ctx.uniqId(lab)
    @
  getLabel: ->
    return @label if @label?
    @label = @ctx.uniqId("l")
  breakNode: (v) ->
    res = @ctx.breakNode(@,v)
    @exits.push res
    res
  yieldNode: (v) ->
    res = @ctx.yieldNode(@,v)
    @exits.push res
    res
  trimExits: (loopBody) ->
    if not @opts.keepScope
      if @exits.length is 1
        i = j = @exits[0]
        loop
          k = i
          i = i.parent
          if i is @ or i is loopBody
            j.ret = true
            @exits.length = 0
            break
          if i instanceof BlockNode
            x = i.block.indexOf(k)
            return @ if x < 0
            i.block.splice(x+1,i.block.length)
            continue
          return unless i instanceof BindNode
    return
  _getBuilder: ->
    @trimExits()
    return @body.getBuilder() unless @exits.length and @eff
    unless @kind is "scope"
      thread = @body.vdeps.threadOutMap()
      @thread = (i for i of thread).sort().map(kit.id)
    else
      @thread = []
    b = @body.getBuilder()
    b = b.capture().toBlockBuilder()
    bodyBlock = b.block
    builder.exprEff(
      kit.call(kit.packId(@kind),[kit.fun([@getLabel()], bodyBlock)])
      ).morph(b).mergeEnv(@vdeps).noCapture()
  _propagateEff: ->
    super()
    for i in @exits
      i.propagateEff()
    @
  _backPass: (use) ->
    @body.backPass(use)
    unless @kind is "scope"
      #cuses = @body.vdeps.mods
      for i in @exits
        i.vdeps.after[j] = true for j,v of @vdeps.after when v
    return

regNodeType "controlNode", ControlNode

# helper for different loop generation strategies
class LoopNode extends ControlNode
  constructor: -> super()
  simpleLoop: ->
    return unless @pre
    return if @opts.loop is "seq"
    @cont.trimExits()
    return if @cont.exits.length
    return if @update? and @update.eff
    return if @test.eff or @test.vdeps.upd
    return if @inner.vdeps.upd
    return for i,v of @inner.unwindBy when v.dst isnt @ and v.dst isnt @cont
    @trimExits(@inner.parent)
    return if @exits.length
    [update, updVars, b, thread] = getBuilderFun(@update, @ctx)
    tb = @test.getBuilder().toBlockBuilder().capture()
    test = kit.spreadFun(updVars, kit.fun(updVars, tb.block))
    bb = @inner.getBuilder()
    bb = bb.capture().toBlockBuilder()
    body = kit.spreadFun(updVars, kit.fun(updVars, bb.block))
    v.mod = false for i, v of b.env when v.mod
    updVars = [kit.arr(updVars)] if updVars.length > 1
    return builder.exprEff(
      kit.call(kit.packId("forPar"),[test,body,update,updVars...])
      ).morph(b).mergeEnv(@vdeps).noCapture()
  _getBuilder: ->
    res = @simpleLoop()
    return res if res?
    super()

regNodeType "loopNode", LoopNode

# try...catch...finally block representation
class TryCatchNode extends DynNode
  constructor: ->
    super()
    @throws = []
  setBody: (b) ->
    @body = b
    b.setParent(@) if b?
    @
  setHandler: (@hvar, h) ->
    @handler = h
    h.setParent(@) if h?
    @
  setFin: (f) ->
    @fin = f
    f.setParent(@) if f?
    @
  _getBuilder: ->
    return @body.getBuilder() unless @handler? or @fin?
    bb = @body.getBuilder().coerceTry().toExprBuilder(true)
    e = bb.expr
    if @handler?
      hb = @handler.getBuilder().toBlockBuilder(true)
      e = kit.catch(bb.expr,@hvar,hb.block)
    if @fin?
      fb = @fin.getBuilder().toBlockBuilder(true)
      e = kit.finally(e,fb.block)
    res = builder.exprEff(e).pushEnv(bb.env)
    res.pushEnv(hb.env) if hb?
    res.pushEnv(fb.env) if fb?
    res
  _fwdPass: (use) ->
    @body.fwdPass(use)
    if @handler
      @handler.fwdPass(use)
      hdeps = @handler.vdeps.uses
    else
      hdeps = {}
    if @fin
      @fin.fwdPass(use)
      fdeps = @fin.vdeps.uses
    else
      fdeps = {}
    for i of @body.vdeps.mods when fdeps[i] or hdeps[i]
      @ctx.refs[i] = true
    return
  _propagateEff: ->
    super()
    i.propagateEff() for i in @throws
    @
  _backPass: (use) ->
    #return @ if @_propagateEffDone
    unless @eff
      @eff = @body.eff or @handler? and @handler.eff or @fin and @fin.eff
    if @eff
      @_propagateEff()
    @fin.backPass(use) if @fin?
    @handler.backPass(use) if @handler?
    @body.backPass(use)

regNodeType "tryCatchNode", TryCatchNode

# throw statement representation
class ThrowNode extends DynNode
  constructor: (val) ->
    super()
    @setVal(val)
  setVal: (val) ->
    @val = val.setParent(@)
    @
  _backPass: (use) ->
    super()
    unless @eff
      @eff = @val.eff
    if @eff
      @_propagateEff()
    @val.backPass(use)
    @
  _fwdPass: (use) ->
    p = @parent
    l = @
    loop
      if p.throws? and p.body is l
        @dst = p
        break
      l = p
      p = p.parent
    @dst.throws.push @
    @val.fwdPass(use)
    @
  _getBuilder: ->
    assert.ok(@eff)
    v = @ctx.uniqId("e")
    if @val.pureExpr
      return builder.exprEff(kit.call(kit.packId("raise"), [@val.pureExpr]))
    @val.getBuilder().setBindVar(v).setOpts(@opts)
      .append(builder.exprEff(kit.call(kit.packId("raise"), [v]))
      .setOpts(@opts))

regNodeType "throwNode", ThrowNode

Node::tryCatch = (hv,h,f) ->
  @ctx.tryCatchNode().setBody(@)
    .setHandler(hv,h)
    .setFin(f)

Scope::stmtNode = (s) ->
  return EmptyNode() unless s?
  sv = @stmt s
  return sv if sv?
  return PureNode([s])

Node::isEmpty = -> false
BlockNode::isEmpty = -> not @block.length
EmptyNode::isEmpty = -> true
