kit = require "./kit"
{Scope} = require "./scope"
builder = require "./builder"
assert = require "assert"
config = require "./config"
graph = require "./graph"

class ParBlockNode extends graph.BlockNode
  constructor: (@sort) ->
    @reorder = @sort.reorder
    super()
  _getBuilder: ->
    return builder.empty() unless @block.length
    block = @sort @block
    cur = builder.empty()
    {reorder} = @
    for i in block
      if i.length is 1
        cur = cur.append(i[0].getBuilder())
        continue
      pure = []
      eff = []
      if reorder
        for j in i
          b = j.getBuilder()
          if j.eff
            eff.push b.toExpr()
          else
            pure.push(b.toBlock()...)
        cur = cur.append(
          builder.purePrefix(builder.pure(pure),
            builder.exprEff(kit.seq(eff...))))
      else
        last = builder.empty()
        for j in i
          b = j.getBuilder()
          if j.eff
            eff.push((last = b).toExpr())
          else
            last.append(b)
        cur = cur.append(builder.exprEff(kit.seq(eff...)))
    cur

graph.regNodeType "parBlockNode", ParBlockNode

Scope::seqBlockNode = Scope::blockNode

Scope::blockNode =  ->
  b = @policy.opts.block
  p = b.par if b?
  p = "byUsage" if p is true
  alg = blockSortAlgs[p]
  return @seqBlockNode() unless alg?
  @parBlockNode(alg)

mkGroup = (reorder,order) ->
  (b) ->
    deps = []
    for i, x in b
      deps.push [i, n = []]
      for j in b[...x]
        if order(j, i)
          n.push j
    removed = {}
    res = []
    loop
      lx = []
      level = []
      for [c,d], ix in deps
        jx = 0
        loop
          break if jx is d.length
          j = d[jx]
          if removed[j.id]
            d.splice(jx, 1)
          else
            ++jx
        if d.length
          break unless reorder
        else
          lx.push ix
          level.push c
      assert.ok(level.length)
      deps.splice(ix,1) for ix in lx by -1
      removed[c.id] = true for c in level
      res.push level
      break unless deps.length
    res

usedOnLeftOrder = (a,b) ->
  {uses} = a.vdeps
  for i of b.vdeps.mods
    return true if uses[i]
  return false
usedOrder = (a,b) ->
  {uses,mods} = a.vdeps
  for i of b.vdeps.mods
    return true if uses[i] or mods[i]
  return false

blockSortAlgs =
  all: (b) -> [b]
  reorderByUsage: mkGroup(true, usedOrder)
  reorderByLhsUsage: mkGroup(true, usedOnLeftOrder)
  byUsage: mkGroup(false, usedOrder)
  byLhsUsage: mkGroup(false, usedOnLeftOrder)

blockSortAlgs.reorderByUsage.reorder = true
blockSortAlgs.reorderByLhsUsage.reorder = true
blockSortAlgs.reorderByLhsUsage.all = true

class SeqBindNode extends graph.BindNode
  constructor: (body, deps) ->
    super(body, deps)
  assemblePar: (deps, cur) ->
    for i, x in deps by -1
      cur = i.append(cur)
    cur

graph.regNodeType "seqBindNode", SeqBindNode

Scope::defaultBindNode = Scope::bindNode

Scope::bindNode = (body, deps) ->
  switch @policy.opts.expr
    when "seq" then @seqBindNode(body, deps)
    else @defaultBindNode(body, deps)

#TODO:
class ParBranchedNode extends graph.BranchedNode
  constructor: (fun, template) ->
    super(fun,template)
  _getBuilder: ->
    super()

Scope::seqBranchedNode = Scope::branchedNode

graph.regNodeType "parBranchedNode", ParBranchedNode

Scope::branchedNode = (body, deps) ->
  switch @policy.opts.branch
    when "par" then @parBranchedNode(body, deps)
    else @seqBranchedNode(body, deps)


