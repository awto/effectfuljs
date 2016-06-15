config = require "./config"
kit = require "./kit"
{defaultVisitor} = require "./visitor"

current = null

# stores information about translating scope (function body or top)
class Scope
  constructor: (par,visitor) ->
    @glob =
      decls: []
    @vars = {}
    @refs = {}
    @upds = {}
    @par = par
    @policy = if @par then par.policy else @createPolicy()
    @visitor = visitor ? defaultVisitor()
    @visitor.setCtx(@)
    @nxt = []
    @lab = {}
    @uniqIds = {}
    @opts = {}
    @anc = []
    @anc.push(@par.anc...) if @par
    @scopes = []
    @ids = {}
    @uids = []
    @curNameId = 0
    @curUid = 0
  # replaces current visitor if current policy requests it
  updateVisitor: ->
    @visitor = @visitor.update(@)
    @
  # cached id objects
  id: (n) ->
    i = @ids[n]
    return i if i?
    return @ids[n] = kit.id(n)
  # new scope for a function definition inside this scope
  subScope: ->
    subvisitor = @visitor.subScope()
    return unless subvisitor?
    new Scope(@,subvisitor)
  similarId: (i) ->
    n = if i.$dm$orig then i.$dm$orig else i.name
    @uniqId("_#{n}")
  # returns unique identifier for current nodes
  uniqId: (p,rev) ->
    res = @id("#{p}_uniq_#{@curUid++}")
    res.$dm$orig = p
    if rev
      @uids.unshift res
    else
      @uids.push res
    res
  # removes identifier duplicates
  commitIds: ->
    for i in @uids
      n = i.$dm$orig
      c = @uniqIds[n] ? 0
      @uniqIds[n] = c + 1
      c = "" unless c
      n = "#{n}#{c}"
      if @ids[n]
        loop
          c = @uniqIds[i.$dm$orig]++
          n = "#{i.$dm$orig}#{c}"
          break unless @ids[n]
      i.name = n
    return
  # convert statement with optional label
  stmt: (s, lab) ->
    r = @visitor[s.type]
    return @visitor.defaultStmt(s).setOrig(s) unless r?
    @policy.item s, =>
      r.call(@visitor,s,lab).setOrig(s)
  # converts expression with
  expr: (e) ->
    h = @visitor[e.type]
    return @pureExprNode(e) unless h?
    @policy.item e, => h.call(@visitor,e)
  # converts list of statements
  stmts: (body) ->
    b = @blockNode()
    x = 0
    loop
      break if x >= body.length
      i = body[x]
      s = @stmt(i)
      o = s.orig
      if o and o.type is "EmptyStatement"
        body.splice(x,1)
      else
        body[x] = o if o
        b = b.append(s)
        ++x
    return b
  saveConfig: ->
    @configSave = {
      imported: config.imported,
      packageVar: config.packageVar }
    @
  restoreConfig: ->
    for i, v of @configSave
      config[i] = v
    @
  # entry point for conversion
  prog: (p) ->
    @saveConfig()
    try
      old = current
      current = @
      @policy.scope => @_prog(p)
    finally
      current = old
      @restoreConfig()
  _prog: (p) ->
    @root = controlNode = @controlNode("scope")
    @root.label = @uniqId "root"
    prog = @node = @stmts(p.body)
    return p if @visitor.noChanges
    node = @tryCatchNode().setBody(controlNode)
    controlNode.setBody(prog)
    node.fwdPass({})
    controlNode.propagateEff() if @policy.opts.compile is "always"
    node.backPass({})
    @calcDone = true
    @node = node
    res = []
    if @thisVar?
      res.push({
        type:"VariableDeclaration"
        kind: "var"
        declarations: [{
          type:"VariableDeclarator"
          id: @thisVar
          init: {type: "ThisExpression"}
          }]})
    res.push(@glob.decls...)
    body = node.getFullBlock(node.eff)
    res.push(body...)
    @eff = node.eff
    @commitIds()
    kit.block res
  @id: (n) -> ctx().id(n)

ctx = -> current

module.exports = {Scope,ctx}

