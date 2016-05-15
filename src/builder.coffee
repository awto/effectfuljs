kit = require "./kit"
config = require "./config"
root = module.exports = {}
assert = require "assert"

CAPTURE_SET = true

# local variables dependencies tracking
class VarUsage
  constructor: ->
    @sets = {}
    @upds = {}
    @mods = {}
    @uses = {}
    @after = {}
    @before = {}
    @vars = {}
  # compiles stored information into environment used by builder
  init: ->
    deps = {}
    for i, v of @vars when v and not @refs[i]
      w = deps[i] = {}
      w.fin = true unless @after[i]
      w.use = true if @uses[i]
      if @sets[i]
        if @before[i]
          w.mod = true
        else
          w.set = true
      if @upds[i]
        w.use = w.mod = true
    deps
  # sets map of variables used before the current node on LHS
  setBefore: (known) ->
    for i of known
      @before[i] = true
      if @sets[i]
        @sets[i] = false
        @upds[i] = true
  # marks variable with the `name` as used on RHS
  addAssign: (name) ->
    if @uses[name]
      @upds[name] = true
    else
      @sets[name] = true
    @mods[name] = true
    @mod = true
    @
  # marks variable with the `name` as used in LHS and RHS in the node
  addUpd: (name) ->
    @upds[name] = true
    @uses[name] = true
    @mods[name] = true
    @mod = true
    @upd = true
    @
  skipMods: -> @_skipMods = true; @
  # adds information from child node
  # aggregates used and modified variables
  addInner: (d) ->
    @mod = true if d.mod
    @upd = true if d.upd
    unless @_skipMods
      @mods[i] = true for i,v of d.mods when v
    @uses[i] = true for i,v of d.uses when v
    return
  # transfer all information from child node
  # before that child node is embedded into the parent
  addInnerDeep: (d) ->
    @addInner(d)
    @mod = true if d.mod
    @upd = true if d.upd
    @upds[i] = true for i,v of d.upds when v
    @uses[i] = true for i,v of d.uses when v
    for i,v of d.sets when v
      if @uses[i]
        @upds[i] = true
        @upd = true
      else
        @sets[i] = true
    return
  threadOutMap: (res) ->
    res ?= {}
    for i, v of @mods when v
      continue unless @after[i]
      continue unless @vars[i] and not @refs[i]
      res[i] = true
    res

envPush = (dst, src) ->
  for i, v of src
    w = dst[i] ?= {}
    w.mod = true if v.mod or v.set and w.use
    w.use = true if v.use
    w.set = true if v.set and not w.mod
    w.fin = true if v.fin
    w.thread = true if v.thread and not v.fin
  dst

envMerge = (dst, src) ->
  for i, v of src
    w = dst[i] ?= {}
    w.use = true if v.use
    w.mod = true if v.mod
    w.fin = true if v.fin
    w.thread = true if v.thread and not v.fin
  dst

envThread = (env) ->
  (i for i, v of env when v.thread and not v.fin).sort().map(kit.id)
envBefore = (f, s) ->
  for i, v of s when (w = f[i]) and w.use
    v.use = true
  return

root.VarUsage = VarUsage

$debId = 0

# JS AST builder
# two builders are joined with `append` or `prepend` methods
class Builder
  constructor: ->
    @env = {}
    @opts = {}
    @$debId = $debId++
  setOpts: (opts) ->
    o = @opts
    if o?
      o[i] = v for i,v of opts when not o[i]?
    else
      @opts = opts
    @
  # sets if the built expression needs also to be coerced
  needCoerce: (v) ->
    v ?= true
    @_needCoerce = v
    @
  # returns builder returning coerced expression
  coerceObj: ->
    return @ unless @_needCoerce
    @toExprBuilder()._coerceObj()
  _coerceObj: -> @
  # sets if the built expression needs also to be coerced with exceptions wrap
  noCoerceTry: -> @_noCoerceTry = true; @
  # returns builder with coerced exceptions
  coerceTry: ->
    return @ if @_noCoerceTry and @opts.coerce is "all"
    b = @capture().toBlockBuilder()
    root.expr(kit.coerceThunk(b.block), b.eff).morph(b).noCoerceTry()
  # sets/gets variable name the builder needs to bind value to
  setBindVar: (bv) ->
    if bv is false
      delete @_bindvar
      return @
    @_bindVar = bv if bv?
    @
  getBindVar: -> @_bindVar
  # marks builder as not requiring local variables capturing
  noCapture: -> @_captured = true; @
  # returns builder with local variables modifications captured
  capture: ->
    return @ if @_captured
    @_captured = true
    return @_capture()
  _capture: -> @
  # copies various options and state data from another builder
  morph: (other,env) ->
    @setBindVar(other.getBindVar())
    assert.ok(other.opts)
    @opts = other.opts
    @_captured ?= other._captured
    env = other.env unless env?
    envPush(@env,env) if env
    brk = other.isBrk()
    @setBrk(brk) if brk?
    @_needCoerce = other._needCoerce if not @_needCoerce?
    @
  # returns builder with `block` member with list of JS AST Statements
  # representing current builder value
  toBlockBuilder: (eff) ->
    n = @toExprBuilder(eff)
    block = [kit.ret(n.expr)]
    (if n.eff then root.blockEff(block) else root.pureBlock(block)).morph(n)
  # returns builder with `block` member with a JS AST Expression
  # representing current builder value
  toExprBuilder: (eff) ->
    assert.ok(@toBlockBuilder isnt Builder::toBlockBuilder)
    n = @toBlockBuilder(eff)
    expr = kit.call(kit.fun([], n.block),[])
    (if n.eff then root.exprEff(expr) else root.exprPure(expr)).morph(n)
  # JS AST list of statements representing current value
  toBlock: (eff) -> @capture().toBlockBuilder(eff).block
  # JS AST expression representing current value
  toExpr: (eff) -> @capture().toExprBuilder(eff).expr
  # joins local variable environments
  pushEnv: (env) -> envPush(@env, env); @
  # joins local variables environment with `VarUsage`
  mergeEnv: (env) ->
    envPush(@env, env.init())
    @
  # returns builder representing current builder value bound to arguments
  # given to the function
  bindTo: ->
    vars = []
    exprs = []
    eff = false
    assert.ok(arguments.length)
    eff or= i.eff for i in arguments
    env = {}
    threadVars = []
    captVars = {}
    threadIn = {}
    lhs = {}
    for i,x in arguments
      capt = i
      capt = capt.coerceObj() if arguments.length is 1
      capt = capt.capture().toExprBuilder(eff)
      tvars = []
      for j, v of capt.env
        w = env[j] ?= {}
        w.use = true if v.use
        w.mod = true if v.mod or w.use and v.set
        w.set = true if v.set and not w.mod
        w.fin = true if v.fin
        if v.thread and not v.fin
          w.thread = true
          threadIn[j] = true
          tvars.push j
      if tvars.length isnt 0
        assert.ok(arguments.length is 1)
      threadVars.push(tvars...)
      exprs.push(capt.expr)
      bv = capt.getBindVar()
      vars.push(bv) if bv?
      vars.push(tvars.sort().map(kit.id)...)
    threadOut = {}
    for i, v of env
      w = @env[i] ? {}
      threadOut[i] = true if not v.fin and (v.thread or v.mod or w.mod)
    thisCapt = @addThread(threadOut).capture()
    block = thisCapt.toBlock()
    thisCapt.setBrk(true) if @isBrk()
    closVars = []
    for i, v of thisCapt.env when v.mod
      v.mod = false
      closVars.push i unless threadIn[i]
    closVars = closVars.sort().map(kit.id)
    if closVars.length
      block = [kit.ret(kit.call(kit.fun(closVars,block),closVars))]
    for i,v of env when v.mod
      w = thisCapt.env[i] ?= {fin:true}
      w.use = w.mod = true
    cont = kit.fun(vars, block)
    return thisCapt if exprs.length is 0
    root.exprEffCaptured(thisCapt.mkMap(exprs,cont))
      .needCoerce(false).morph(thisCapt)
  # specifies execution control will leave current scope (function)
  # so no needs to thread any vars
  setBrk: (@brk) -> @
  # check is execution control will leave current scope
  isBrk: -> @brk
  # adds a map of variable to thread out of the current value
  addThread: (thread) ->
    if @isBrk()
      for i, v of thread
        (w = @env[i] ?= {fin:true}).thread = true
      @
    unless @_captured
      for i, v of thread when v
        (w = @env[i] ?= {fin:true}).thread = true
      return @
    env = {}
    if thread?
      for i,v of thread when v
        w = @env[i]
        continue if w? and w.fin
        (env[i] = {}).thread = true
        any = true if w? and not w.thread
      for i, v of @env when not v.fin
        w = env[i] ?= {}
        if v.thread and not thread[i]
          some = true
          w.thread = true
    return @ unless any
    root.purePostfix(@,root.pure([]).pushEnv(env)).morph(@)

# represents JS list of statements without effects
class BlockPure extends Builder
  constructor: (@block) -> super()
  mkMap: (args, fun) ->
    kit.mapply(args, fun)
  pureBlock: -> @block
  toPrefix: -> @
  toBlockBuilder: (eff) ->
    {block} = @
    expr = @ret
    nocoerce = @opts.coerce is "none"
    if expr?
      expr = kit.pure(expr) if eff and nocoerce
      block.push(kit.ret(expr))
    return @needCoerce(not nocoerce) unless eff
    unless expr
      block.push(kit.ret(kit.pure())) if nocoerce
    root.blockEff(block).morph(@).needCoerce(not nocoerce)
  prepend: (other) ->
    (if @opts.bindAssoc is "left"
      root.postfixLeft(other,@)
     else root.purePostfix(other,@)).setOpts(@opts)
  _append: (other) ->
    if other.pureBlock?
      @block.push(other.pureBlock()...)
      envPush(@env,other.env)
      @setBindVar(other._bindVar)
      return @
    root.purePrefix(@,other).setOpts(@opts)
  append: (other) -> @_append(other)
  coerceTry: ->
    w = @opts.coerce
    if w isnt "all"
      return @
    return root.exprEff(kit.coerceThunk(@block)).morph(@)
  _capture: ->
    ov = envThread(@env)
    if ov.length
      assert.ok(not @ret)
      @ret = if ov.length is 1 then ov[0] else kit.arr(ov)
    return @

root.pure = (block) -> new BlockPure(block)

# builder producing nothing
class Empty extends BlockPure
  constructor: ->
    super([])
  append: (other) -> other
  prepend: (other) -> other

root.empty = -> new Empty()

# common parent for effectful builders
class Eff extends Builder
  constructor: -> super()
  eff: true
  mkMap: (args, fun) ->
    kit.mbind args, fun
  append: (other) ->
    envBefore(@env,other.env)
    if other.prepend?
      res = other.prepend(@)
      return res if res?
    @_append other
  _append: (other) ->
    if not @_assocDone && @opts.bindAssoc is "left" and other.eff
      @_assocDone = true
      return root.postfixLeft(@,other).setOpts(other.opts)
    other.bindTo(@)
  _capture: ->
    ov = envThread(@env)
    if ov.length
      if @getBindVar()?
        fn = "munshiftTo"
        val = kit.arr(ov)
      else
        fn = "mconst"
        val = if ov.length is 1 then ov[0] else kit.arr(ov)
      return root.exprEff(kit.call(
        kit.mem(@coerceObj().toExpr(),kit.id(fn)),[val])).morph(@).noCapture()
    return @

# builder representing delayed `append`
# the `append` will be executed after isFinal will return true
class Cont extends Eff
  constructor: (@inner, @cont, isFinal) ->
    super()
    @isFinal ?= isFinal
  addThread: (thread) ->
    @cont = @cont.addThread(thread)
    @
  setBindVar: (bv) -> @cont.setBindVar(bv); @
  setBrk: (bv) -> @cont.setBrk(bv); @
  isBrk: -> @cont.isBrk()
  result: ->
    @inner._append(@cont).morph(@)
  append: (other) ->
    @cont = @cont.append(other)
    if @isFinal() then @result() else @
  toExprBuilder: (eff) ->
    @result().toExprBuilder(eff)
  toBlockBuilder: (eff) ->
    @result().toBlockBuilder(eff)
  capture: ->
    return @result()
 
root.cont = (inner, cont, isFinal) -> new Cont(inner, cont, isFinal)

# delayed append with right part is pure for left associative binds
# or any for right ones
class Postfix extends Cont
  constructor: (inner, cont, @left) ->
    super(inner,cont)
  isFinal: -> not @left and @cont.eff

root.purePostfix = (inner, cont) -> new Postfix(inner, cont)
root.postfixLeft = (inner, cont) -> new Postfix(inner, cont, true)

# parallel bind of several arguments
class Par extends Eff
  constructor: (@args, @cont) ->
    super()
  setBindVar: (bv) -> @cont.setBindVar(bv); @
  addThread: (thread) ->
    return @ if @isBrk()
    @cont = @cont.addThread(thread)
    @
  setBrk: (bv) -> @cont.setBrk(bv); @
  isBrk: -> @cont.isBrk()
  append: (other) ->
    if @cont.eff
      return super(other)
    @cont = @cont.append(other)
    @
  getDepVars: ->
    @vars
  toExprBuilder: ->
    @cont.bindTo(@args...).morph(@).toExprBuilder()
  capture: -> @toExprBuilder()

root.par = (vars, args, cont) -> new Par(vars, args, cont)

# delayed `append` where first part is pure
class PurePrefix extends Eff
  constructor: (@prefix, @cont) ->
    super()
    assert.ok(@cont.eff)
    assert.ok(not @prefix.eff)
    return
  addThread: (thread) ->
    return @ if @isBrk()
    if @last?
      @last = @last.addThread(thread)
    else
      @cont = @cont.addThread(thread)
    @
  setBindVar: (bv) -> (@last ? @cont).setBindVar(bv); @
  setBrk: (bv) -> (@last ? @cont).setBrk(bv); @
  isBrk: -> (@last ? @cont).isBrk()
  prepend: (other) ->
    unless other.eff
      @prefix = other.append(@prefix)
      return @
    @.bindTo(other)
  append: (other) ->
    if @last
      @cont = @cont.append(@last)
    @last = other
    @
  toBlockBuilder: -> @capture()
  capture: ->
    if @last
      last = @last
    else
      last = @cont
    threadOut = {}
    for i, v of @prefix.env when v.mod and not v.fin
      threadOut[i] = true
    last = last.addThread(threadOut)
    cont = last.capture()
    if @last
      bv = cont._bindVar
      cont = @cont.append(cont).capture()
    env = {}
    envMerge(env = {},@prefix.env)
    envMerge(env,cont.env)
    pblock = @prefix.toPrefix()
    cblock = cont.toBlockBuilder()
    for i,v of cblock.env when v.thread
      w = env[i] ?= {fin:true}
      w.thread = true
    root.blockEff(pblock.block.concat(cblock.block)).morph(@,env)
      .needCoerce(cblock._needCoerce)
      .setBindVar(cont.getBindVar()).noCapture().setBrk(@isBrk())

root.purePrefix = (prefix, cont) -> new PurePrefix(prefix, cont)

# effectful AST statements list  (a typical result of `toExprBuilder`)
class BlockEff extends Eff
  constructor: (@block) -> super()
  toBlockBuilder: -> @

root.blockEff = (block) ->
  new BlockEff(block)

root.block = (eff, block) ->
  if eff then root.blockEff(block)
  else root.pure(block)

# effectful expression (a typical result of `toExprBuilder`)
class ExprEff extends Eff
  constructor: (@expr) ->
    super()
  _coerceObj: ->
    w = @opts.coerce
    return @ if w is "none"
    root.exprEff(kit.coerceVal(@expr)).morph(@)
  toExprBuilder: -> @
 
root.exprEffCoerce = (expr) -> (new ExprEff(expr)).needCoerce()
root.exprEff = (expr) -> (new ExprEff(expr)).needCoerce(false)
root.exprEffCaptured = (expr) -> (new ExprEff(expr)).noCapture()

# represents pure Expression AST (a typical result of `toExprBuilder`
# for pure builders)
class ExprPure extends BlockPure
  constructor: (@expr) ->
    super([kit.ret(@expr)])
  toExprBuilder: (eff) ->
    return super(eff) unless @expr
    return @ unless eff
    expr = if @opts.coerce is "none" then kit.pure(@expr) else @expr
    return root.exprEff(expr).morph(@)
  toBlockBuilder: (eff) ->
    res = root.pure([])
    res.ret = @expr
    res.morph(@).toBlockBuilder(eff)
  toPrefix: ->
    root.pure(
      [if @_bindVar?
        kit.varDecl(@_bindVar,@expr)
      else kit.exprStmt(@expr)]).morph(@).setBindVar(false)
  _capture: ->
    return super() unless @expr
    ov = envThread(@env)
    if ov.length
      @expr = kit.arr([@expr,ov...])
      @block = [kit.ret(@expr)]
    return @

root.exprPure = (expr) -> new ExprPure(expr)

root.expr = (expr, eff) ->
  if eff then root.exprEffCoerce(expr) else root.exprPure(expr)

