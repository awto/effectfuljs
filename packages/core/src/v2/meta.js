import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
import config from "./config";
const { Tag, next } = Kit;

const DEBUG_BRKS = config.debug;

export const brkSym = Scope.sysSym("brk");

export function injectBrk() {
  const { root } = Ctx;
  let debNum = 0;
  let i = root,
    n;
  do {
    n = next(i);
    switch (i.type) {
      case Tag.ArrowFunctionExpression:
        const body = i.firstChild.prevSibling;
        if (body.type !== Tag.BlockStatement && body.node.loc) {
          const brk = brkExpr(body);
          const seq = Kit.node(Tag.body, Tag.SequenceExpression);
          Kit.replace(body, seq);
          const arr = Kit.append(seq, Kit.arr(Tag.expressions));
          body.pos = brk.pos = Tag.push;
          Kit.append(arr, brk);
          Kit.append(arr, body);
        }
        break;
      case Tag.VariableDeclaration:
        if (i.pos === Tag.left || i.pos === Tag.init) break;
      case Tag.ReturnStatement:
      case Tag.BreakStatement:
      case Tag.ContinueStatement:
      case Tag.IfStatement:
      case Tag.SwitchStatement:
      case Tag.ThrowStatement:
      case Tag.TryStatement:
      case Tag.ExpressionStatement:
      case Tag.WithStatement:
      case Tag.ForStatement:
      case Tag.WhileStatement:
      case Tag.DoWhileStatement:
      case Tag.ForOfStatement:
      case Tag.LabeledStatement:
        if (i.pos !== Tag.push && i.parent.type !== Tag.LabeledStatement) {
          const block = Kit.node(i.pos, Tag.BlockStatement);
          i.pos = Tag.push;
          const arr = Kit.append(block, Kit.arr(Tag.body, []));
          Kit.insertAfter(i, block);
          Kit.detach(i);
          Kit.append(arr, i);
        }
        if (i.node.loc)
          Kit.append(
            Kit.insertBefore(i, Kit.node(Tag.push, Tag.ExpressionStatement)),
            brkExpr(i)
          );
        for (; i.type === Tag.LabeldStatement; i = i.firstChild.nextSibling) {}
        break;
      case Tag.DebuggerStatement:
        Kit.append(
          Kit.replace(i, Kit.node(Tag.push, Tag.ExpressionStatement)),
          brkExpr(i)
        ).brkFlags |= Scope.DEBUGGER_STMT_BRK_FLAG;
        break;
    }
  } while ((i = n) !== root);
  function brkExpr(i) {
    const call = Kit.node(Tag.expression, Tag.CallExpression);
    call.eff = true;
    call.refDoc = i;
    call.brkFlags |= Scope.STMT_BRK_FLAG;
    const args = Kit.insertAfter(
      Kit.append(call, Scope.sysId(Tag.callee, brkSym)),
      Kit.arr(Tag.arguments, [])
    );
    if (DEBUG_BRKS) Kit.append(args, Kit.num(Tag.push, debNum++));
    Kit.append(args, Kit.emitConst(Tag.push, Kit.locStr(i.node.loc)));
    return call;
  }
}

export function prepare(root) {
  const { lastFrame } = root;
  const res = (root.stateArgs = []);
  const resFrame = lastFrame.nextFrame;
  resFrame.brkFlags |= Scope.EXIT_BRK_FLAG;
  resFrame.nextFrame.brkFlags |= Scope.EXIT_BRK_FLAG;
  for (let i = resFrame; i !== lastFrame; i = i.nextFrame) {
    res.push((i.metaArgs = []));
    let { doc } = i;
    if (doc) continue;
    const block = i.consequent;
    if (!block) continue;
    i.doc = block.firstChild;
  }
}

export function positions(root) {
  const { lastFrame, errBlock } = root;
  for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
    const { doc } = i;
    if (!doc) continue;
    const ref = doc.refDoc || doc;
    const { loc } = ref.node;
    let flags = doc.brkFlags || ref.brkFlags || 0;
    if (i.block.finalizer || (i.block.handler && i.block.handler !== errBlock))
      flags |= Scope.HAS_EH_BRK_FLAG;
    i.metaArgs.push(flags, Kit.locStr(loc));
  }
}

export function scopes(decls) {
  const file = Ctx.root;
  let num = 0;
  const rootScopeDepth = config.scopeDepth;
  for (let i = file.scopes; i; i = i.nextScope) {
    const exprs = i.pushScopeExpr;
    if (exprs) {
      const numVars = i.scopeDecls.size + i.symScopePool.varCount;
      for (let i = 0; i < numVars; ++i) Kit.append(exprs, Kit.void0(Tag.push));
    }
  }
  for (let i = file.firstChild; i; i = i.nextFunc) {
    const root = i.funcDef;
    const { lastFrame } = root;
    const rootScope = root.origFunc;
    for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
      const { doc } = i;
      let block = rootScope;
      if (doc) block = (doc.refDoc || doc).parentBlock || rootScope;
      i.metaArgs.push(block && getBlockDescr(block));
    }
  }
  function getBlockDescr(block) {
    let res = block.blockDescrSym;
    if (res) return res;
    const { parentBlock } = block;
    const parent = parentBlock && getBlockDescr(parentBlock);
    const blockDecls = block.blockDecls;
    if (!blockDecls.size && !block.isScopeNode) {
      block.scopeDepth = parentBlock.scopeDepth;
      return (block.blockDescrSym = parent);
    }
    const vars = {};
    res = block.blockDescrSym = Scope.newSym();
    res.orig = res.name = `$s$${++num}`;
    for (const i of blockDecls)
      if (i.bound)
        vars[i.orig] = [i.index, Kit.locStr(i.declPos && i.declPos.node.loc)];
    const decl = Kit.node(Tag.push, Tag.VariableDeclarator);
    let depth = rootScopeDepth;
    if (parentBlock) {
      depth = parentBlock.scopeDepth;
      if (block.isScopeNode) ++depth;
    }
    block.scopeDepth = depth;
    Kit.insertAfter(
      Kit.append(decl, Kit.id(Tag.id, res)),
      Kit.emitConst(Tag.init, [vars, parent, depth])
    );
    Kit.append(decls, decl);
    return res;
  }
}

export function all(root) {
  prepare(root);
  positions(root);
}
