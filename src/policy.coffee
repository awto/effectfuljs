{Scope} = require "./scope"
config = require "./config"
kit = require "./kit"
directive  = require "./directives"
esquery = require "esquery"
escodegen = require("escodegen")
resolve = require "resolve"
path = require "path"

root = module.exports = {}

hier = {}

hierIs = (f, t) ->
  (h = hier[f] ?= [f]).push t
  ht = hier[t]
  if ht?
    for i in ht
      h.push(i)
  return

hierIs("WhileStatement",":loop")
hierIs("DoWhileStatement",":loop")
hierIs("ForStatement",":loop")
hierIs("ForInStatement",":loop")
hierIs("VariableDeclaration",":assignment")
hierIs("FunctionExpression","Function")
hierIs("FunctionDeclaration","Function")
hierIs("AssignmentExpression",":assignment")

root.selector =
  property: (name, next) ->
    p = name.split(".")
    next ?= (v) -> v
    (e) ->
      return next() unless e?
      for i in p
        e = e[i]
        break unless e?
      next(e)
  cases: (sel) ->
    (s) ->
      v = sel(s)
      return @cases[v] if v?
  matchDeclName: (s,x,tpref) ->
    m = @match
    n = kit.getId(s.id)
    r = do ->
      if s.id?
        if n?
          return true if m.name? and m.name[n]
          return true if m.qname? and m.qname[n]
          return true if m.postfix? and m.postfix[n[n.length - 1]]
          return true if m.prefix? and m.prefix[n[0]]
      if s.type is "FunctionExpression" and x.name?
        p = kit.getMembersPathIds(x.name)
        if p.length
          n = p[p.length - 1]
          if n?
            return true if m.name? and m.name[n]
            return true if m.postfix? and m.postfix[n[n.length - 1]]
            return true if m.prefix? and m.prefix[n[0]]
            return true if m.package? and p[0]? and m.package[p[0]]
            return true if m.qname? and m.qname[p.join(".")]
      return false
    if tpref?
      console.log("#{tpref}: match decl #{n}: #{r}")
    return unless r?
    return @cases[r]
  matchCallName: (s, p, tpref) ->
    p = kit.getMembersPathIds(s.callee)
    m = @match
    r = do ->
      n = p[0]
      if p.length is 1
        if n?
          return true if m.libVar and n is config.packageVar
      return false if m.libVar and p.length is 2 and n is config.packageName
      if p.length > 0
        n = p[p.length - 1]
        return false unless n?
        return true if m.package? and m.package[p[0]]
        return true if m.name? and m.name[n]
        return true if m.postfix?  and m.postfix[n[n.length - 1]]
        return true if m.prefix? and m.prefix[n[0]]
        return true if m.qname? and m.qname[p.join(".")]
      return false
    if tpref?
      console.log("#{tpref}: match call #{p.join('.')}: #{r}")
    return unless r?
    return @cases[r]

rebuildDT = (c) ->
  copy = (p, c) ->
    unless p? and p.$
      throw new Error("invalid transitions")
    r = {}
    for i of options
      unless p.$?
        throw new Error('invalid config')
      v = c[i] ? p.$[i]
      r[i] = v if v?
    c.$ = r
  copy({$:{}},c)
  for state, sv of c when state[0] isnt '$' and not options[state]
    copy(c,sv)
    for ty,tv of sv when ty[0] isnt '$' and not options[ty]
      copy(sv,tv)
      if tv.select? and tv.select.substr?
        tv.select = upStage(root.selector,tv.select)
      if tv.cases?
        for cn,cv of tv.cases
          copy(tv,cv)
  return

options =
  bind: true
  compile: true
  coerce: true
  expr: true
  bindAssoc: true
  block: true
  loop: true
  subScope: true
  keepScope: true
  varCapt: true
  branch: true
  ref: true
  remove: true

class Policy
  constructor: (@root,start) ->
    @root ?= config.states
    @state = start ? config.start
    @opts = @root[@state]
    @rebuild()
  transit: (n) ->
    if config.policyTrace
      console.log("policy: transit to #{n}")
    @state = n
    cur = @root[n]
    unless cur?
      throw new Error("no state #{n} defined")
    @opts = cur.$
    @
  nameDetails: (@name, @op) ->
    @
  scope: (f) ->
    oldRoot = @root
    @root = kit.merge({}, oldRoot)
    oldState = @state
    res = f()
    @state = oldState
    @root = oldRoot
    @opts = @root[@state].$
    res
  _libRequire: ->
    if @name? and @name.type is "Identifier"
      config.packageVar = @name.name
      @transit(config.start)
  rebuild: (changes) ->
    if changes?
      kit.merge(@root,changes)
    rebuildDT(@root)
    @opts = @root[@state].$
  item: (s, fun) ->
    trace = config.policyTrace
    if trace
      tpref = "polciy:#{kit.shortNodeDescr(s)}"
      console.log("#{tpref}: enter at #{@state}")
      if @name?
        console.log("#{tpref}: name #{@name}")
      if @op?
        console.log("#{tpref}: op #{@op}")
    cur = @root[@state]
    h = hier[s.type] ? [s.type]
    for i in h when n = cur[i]
      cur = n
      console.log("#{tpref}: by type #{i}: #{JSON.stringify(cur)}") if trace
      break
    sel = cur.select
    if sel?
      selv = sel.call(cur, s, @, tpref)
      console.log("#{tpref}: selector #{JSON.stringify(selv)}") if trace
      cur = selv if selv?
    if cur.move?
      console.log("#{n}: moving to #{cur.move}") if trace
      return @transit(cur.move).item(s,fun)
    jump = cur.sub ? cur.next ? cur.inner
    if trace
      console.log("#{tpref}: sub-state #{cur.sub}") if cur.sub
      console.log("#{tpref}: inner state #{cur.inner}") if cur.inner
      console.log("#{tpref}: next state #{cur.next}") if cur.next
    if jump?
      oldState = @state if jump is cur.sub
      @state = jump
      cur = @root[jump] unless jump is cur.inner
    else if s.type is "BlockStatement"
      oldState = @state
    oldOp = @op
    oldOpts = @opts
    @opts = cur.$
    console.log("#{tpref}: opts #{JSON.stringify(@opts)}") if trace
    oldName = @name
    @libVar = false
    res = fun()
    @name = oldName
    @op = oldOp
    if oldState?
      console.log("#{tpref}: restoring state #{oldState}") if trace
      @state = oldState 
    @opts = oldOpts
    console.log("#{tpref}: restoring opts #{JSON.stringify(oldOpts)}") if trace
    res

Scope::option = (v) ->
  @policy.rebuild(v)
  @updateVisitor()
  
Scope::profile = (v) ->
  if v.substr?
    @policy.transit(v)
    @updateVisitor()
    return
  throw new Error("cannot interpret profile #{v}")

root.optionEnv = Object.create(root.selector)

upStage = (env, str) ->
  args = []
  vals = []
  for i,v of env
    args.push i
    vals.push v
  args.push "return #{str};"
  fun = new Function(args...)
  fun.apply(env, vals)

opts = directive.option = (e) ->
  for i in e.arguments
    if i.type is "Literal" and e.value? and e.value.substr?
      upStage(env, e.value)
    else if i.type is "ObjectExpression"
      @option(upStage(root.optionEnv, escodegen.generate(i)))
    else throw kit.exprError(
      "cannot interpret option #{escodegen.generate(i)}", i)
  @emptyNode()

directive.profile = (e, arg) ->
  @profile(kit.toStr arg)
  @emptyNode()

Scope::createPolicy = ->
  return new Policy()

directive.require = (e,c) ->
  cs = kit.exprToStr c
  f = resolve.sync cs, basedir: path.dirname(config.filename)
  try
    cp = resolve.sync(config.packageName,
      basedir: path.dirname(config.filename))
    core = require cp
    core.compileTime = true
  catch e
    console.warn("couldn't load library ", config.packageName, e)
  m = require f
  if m? and m._compile? and m._compile.call?
    n = @policy.name
    if n.type is "Identifier"
      varname = n.name
    m._compile.call(@,[varname])
  return @pureExprNode(kit.call(kit.id("require"),[c]))

directive.ref = (e) ->
  for a in e.arguments
    i = kit.getId(a)
    unless i?
      throw kit.exprError('expected identifiers',a)
    @refs[i] = true
  @emptyNode()

