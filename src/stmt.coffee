kit = require "./kit"
{Scope,ActiveScope} = require "./scope"
policy = require "./policy"
require "./graph"
require "./expr"
assert = require "assert"
{Visitor, ActiveVisitor, DisabledVisitor} = require "./visitor"

isLoop = (stmt) ->
  stmt.type is "ForStatement"

ActiveVisitor::LabeledStatement = (stmt) ->
  name = stmt.label.name
  if isLoop(stmt.body)
    res = @ctx.stmt(stmt.body, name)
    res.orig = stmt
    return res
  old = @ctx.lab
  block = @ctx.controlNode()
  @ctx.lab = nlab = Object.create old
  block.labname = name
  nlab[name] = {brk:block}
  block.setLabel("#{name}").setBody(@ctx.stmt(stmt.body, name))
  @ctx.lab = old
  return block

ActiveVisitor::ContinueStatement = (stmt) ->
  name = if stmt.label? then stmt.label.name else "#"
  l = @ctx.lab[name]
  unless l? and l.cnt?
    throw new Error("no such label #{name}")
  l.cnt.breakNode()

ActiveVisitor::BreakStatement = (stmt) ->
  name = if stmt.label? then stmt.label.name else "#"
  l = @ctx.lab[name]
  unless l? and l.brk?
    throw new Error("no such label #{name}")
  l.brk.breakNode()

ActiveVisitor::BlockStatement = (stmt) ->
  @ctx.stmts(stmt.body)

ActiveVisitor::EmptyStatement = (stmt) ->
  return @ctx.pureNode([stmt])

Visitor::ExpressionStatement = (stmt) ->
  @ctx.expr(stmt.expression).ignoreResult().setOrig(false)

ActiveVisitor::IfStatement = (stmt) ->
  {test:i, consequent: t, alternate: e} = stmt
  res = @ctx.branchedNode(
    (t, e) ->
      stmt.consequent = t
      stmt.alternate = e
      stmt
    stmt).setOrig(stmt)
    .setDeps(@ctx.stmt(t), if e? then @ctx.stmt(e) else @ctx.emptyNode())
  @ctx.bindNode(res,[@ctx.expr(i).setPosition([stmt,"test"])])

ActiveVisitor::SwitchStatement = (stmt) ->
  old = @ctx.lab
  @ctx.lab = nlab = Object.create old
  res = @ctx.controlNode()
  nlab["#"] = {brk:res}
  block = @ctx.blockNode()
  s = @ctx.sharedNode(@ctx.expr(stmt.discriminant),block)
  res.setBody(s)
  for i,x in stmt.cases
    if i.test?
      block.append(@IfStatement(kit.ifte(
        kit.eq(s._ref,i.test),
        i.consequent)))
    else
      block.append(@ctx.stmts i.consequent)
  res

ActiveVisitor::ReturnStatement = (s) ->
  a = s.argument
  unless a?
    return @ctx.root.breakNode()
  @ctx.root.breakNode(@ctx.expr a)

Visitor::postDecl = (stmt) ->
  @ctx.pureNode([stmt])

ActiveVisitor::postDecl = (stmt) ->
  @ctx.glob.decls.push(stmt)
  @ctx.emptyNode()

Visitor::FunctionDeclaration = (stmt) ->
  ctx = @ctx.subScope(stmt)
  if stmt.params?
    ctx.vars[i.name] = true for i in stmt.params when i.name
  return @ctx.pureNode([stmt]) unless ctx?
  ctx.policy = @policy
  stmt.body = ctx.prog stmt.body
  if stmt.generator
    stmt.generator = false
  @ctx.refs[i] = true for i, v of ctx.upds when v and not ctx.vars[i]
  @postDecl(stmt)

Visitor::VariableDeclaration = (stmt) ->
  for i in stmt.declarations when i.init
    @policy.nameDetails(i.id,"=")
    en = @ctx.expr(i.init)
    assert.ok(en.pureExpr?)
    i.init = en.pureExpr
  return @ctx.pureNode([stmt])

ActiveVisitor::VariableDeclaration = (stmt) ->
  cur = @ctx.emptyNode()
  declarations = []
  orig = []
  for i in stmt.declarations
    @ctx.vars[i.id.name] = true #TODO: ES6
    @ctx.ids[i.id.name] = true unless i.id.$dm$orig
    declarations.push {type: "VariableDeclarator", id: i.id}
    if @policy.opts.varCapt is false
      @ctx.refs[i.id.name] = true
    if i.init?
      asgn = kit.assign(i.id,i.init)
      e = @ctx.stmt(kit.exprStmt(asgn))
      cur = cur.append(e)
      orig.push(asgn)
  @ctx.glob.decls.push {type:"VariableDeclaration",declarations,kind: "var"}
  if cur.pureBlock?
    cur.setOrig(kit.block(cur.pureBlock()))
  else
    cur.setOrig(kit.exprStmt(kit.seqExpr(orig...)))
  cur

ActiveVisitor::ForStatement = (stmt, label) ->
  wbody = []
  {init,test,update,body} = stmt
  test ?= kit.lit(true)
  if init?
    if init.type is "VariableDeclaration"
      wbody.push init
      exprs = []
      for i in init.declarations
        exprs.push(kit.assign(i.id, i.init))
      stmt.init = kit.seqExpr exprs...
    else
      wbody.push(kit.exprStmt(init))
  lexpr = {type:"WhileStatement",test,body:body,$dm$update:update}
  if label?
    lexpr = {type: "LabeledStatement", body: lexpr, label: kit.id(label)}
  wbody.push(lexpr)
  return @ctx.stmts(wbody)

ActiveVisitor::ForInStatement = (stmt, label) ->
  {left,right,body} = stmt
  iterName = @ctx.uniqId("iter")
  iterCtr = kit.call(kit.packId("forInIterator"),[right])
  init = kit.call(kit.packId("p"),[iterCtr])
  iterDecl = {type:"VariableDeclarator",id:iterName,init}
  resDecls = [iterDecl]
  decls = {type: "VariableDeclaration", kind: "var", declarations: resDecls}
  if left.type is "VariableDeclaration"
    throw new Error("NOT IMPLEMENTED") unless left.declarations.length is 1
    stmt.left = pat = left.declarations[0].id
    @ctx.glob.decls.push left
  else
    pat = left
  body = kit.flatBlock(kit.exprStmt(
    kit.assign(pat,kit.mem(iterName,kit.id("value")))),body)
  update = kit.assign(iterName,
    kit.call(kit.packId("p"),[kit.call(iterName,[])]))
  b = @ForStatement(
    {type:"ForStatement",init:decls,test:iterName,update,body}, label)
  @ctx.bindNode(b,[@ctx.expr(stmt.right).setPosition([iterCtr.arguments,0])])

commonWhile = (pre) ->
  (stmt, label) ->
    {test,body} = stmt
    bexpr = kit.ifte test, [], []
    loopBranch = @ctx.branchedNode(
      (c,a) ->
        bexpr.consequent = kit.flatBlock c
        bexpr.alternate = kit.flatBlock a if a?
        bexpr
      bexpr)
    update = stmt.$dm$update
    upd = @ctx.expr(update).ignoreResult() if update?
    brkControl = @ctx.loopNode()
    cntControl = @ctx.controlNode()
    if label?
      brkControl.setLabel("#{label}Brk")
      cntControl.setLabel("#{label}Cont")
    else
      brkControl.setLabel("brk")
      cntControl.setLabel("cont")
    old = @ctx.lab
    @ctx.lab = nlab = Object.create old
    labDef = {brk:brkControl,cnt:cntControl}
    nlab["#"] = labDef
    nlab[label] = labDef if label?
    bodyNode = @ctx.stmtNode(body)
    bodyv = if pre
      testNode = @ctx.expr(test).setPosition([bexpr,"test"])
      @ctx.bindNode(
        loopBranch.setDeps(
          bodyNode
          brkControl.breakNode())
        [testNode])
    else
      bexpr.test = test = kit.not(test)
      testNode = @ctx.expr(test).setPosition([bexpr,"test"])
      @ctx.blockNode().append(
        bodyNode
        @ctx.bindNode(
          loopBranch.setDeps(brkControl.breakNode(),@ctx.emptyNode())
          [testNode]))
    @ctx.lab = old
    if label?
      bodyv.name ?= @ctx.uniqId "{label}Loop"
    inner = cntControl.setBody(bodyv)
    inner = inner.append(upd) if upd?
    brkControl.test = testNode
    brkControl.inner = bodyNode
    brkControl.update = upd ? @ctx.emptyNode()
    brkControl.pre = pre
    brkControl.cont = cntControl
    brkControl.setBody(@ctx.repeatNode(inner))

ActiveVisitor::WhileStatement = commonWhile(true)
ActiveVisitor::DoWhileStatement = commonWhile()

ActiveVisitor::ThrowStatement = (stmt) ->
  e = stmt.argument
  ea = @ctx.expr e
  @ctx.throwNode ea

ActiveVisitor::TryStatement = (stmt) ->
  {block,handler,finalizer} = stmt
  res = @ctx.tryCatchNode().setBody(@ctx.stmt(block))
  res.setFin(@ctx.stmt(finalizer)) if finalizer?
  if handler?
    res.setHandler(handler.param,@ctx.stmt(handler.body))
  res

ActiveVisitor::WithStatement = (stmt) ->
  res = @ctx.branchedNode(
    (b) ->
      stmt.body = b
      stmt
    stmt).setOrig(stmt).setDeps(@ctx.stmt(stmt.body))
  @ctx.bindNode(res,[@ctx.expr(stmt.object).setPosition([stmt,"object"])])

Visitor::defaultStmt = (stmt) -> @ctx.pureNode([stmt])

