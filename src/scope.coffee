config = require "./config"
kit = require "./kit"
{defaultVisitor} = require "./visitor"

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
  # replaces current visitor if current policy requests it
  updateVisitor: ->
    @visitor = @visitor.update(@)
    @
  # new scope for a function definition inside this scope
  subScope: ->
    subvisitor = @visitor.subScope()
    return unless subvisitor?
    new Scope(@,subvisitor)
  # returns unique identifier for current nodes
  uniqId: (p) ->
    c = @uniqIds[p] ? 0
    @uniqIds[p] = c + 1
    c = "" unless c
    res = kit.id("#{p}#{c}")
    res.$dm$orig = p
    @uids.push res
    res
  # removes identifier duplicates
  commitIds: ->
    for i in @uids
      if @ids[i.name]
        loop
          c = @uniqIds[i.$dm$orig]++
          i.name = "#{i.$dm$orig}#{c}"
          break unless @ids[i.name]
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
  # entry point for conversion
  prog: (p) ->
    @policy.scope => @_prog(p)
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

module.exports = {Scope}

