import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
import config from "./config";
const { Tag, next } = Kit;

function prependBrkExpr(expr, ref) {
  const brk = Scope.brkExpr(ref);
  if (!brk) return;
  const seq = Kit.node(expr.pos, Tag.SequenceExpression);
  Kit.replace(expr, seq);
  const arr = Kit.append(seq, Kit.arr(Tag.expressions));
  expr.pos = brk.pos = Tag.push;
  Kit.append(arr, brk);
  Kit.append(arr, expr);
  Kit.copyMeta(expr, seq);
}

export function injectBrk() {
  const { root } = Ctx;
  let i = root,
    n;
  do {
    n = next(i);
    switch (i.type) {
      case Tag.ArrowFunctionExpression:
        const body = i.firstChild.prevSibling;
        if (body.type !== Tag.BlockStatement) prependBrkExpr(body, body);
        break;
      case Tag.BlockStatement:
        if (i.node.loc) {
          const dummy = Kit.node(i.pos, Tag.EmptyStatement);
          dummy.node.loc = { start: i.node.loc.end, end: i.node.loc.end };
          const brk = Scope.brkExpr(dummy);
          if (brk) {
            brk.brkFlags |= Scope.EMPTY_BRK_FLAG;
            Kit.exprStmt(i.firstChild.prevSibling, brk);
          }
        }
        break;
      case Tag.VariableDeclarator:
        if (i.parent.firstChild === i) break;
        const init = i.firstChild.prevSibling;
        if (init.pos !== Tag.init) break;
        prependBrkExpr(init, i);
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
      case Tag.LabeledStatement: {
        if (i.pos !== Tag.push && i.parent.type !== Tag.LabeledStatement) {
          const block = Kit.node(i.pos, Tag.BlockStatement);
          i.pos = Tag.push;
          const arr = Kit.append(block, Kit.arr(Tag.body, []));
          Kit.insertAfter(i, block);
          Kit.detach(i);
          Kit.append(arr, i);
        }
        switch (i.type) {
          case Tag.ForStatement:
            {
              let j = i.firstChild;
              let next;
              do {
                next = j.nextSibling;
                if (j.type === Tag.VariableDeclaration) continue;
                if (j.pos === Tag.body) break;
                prependBrkExpr(j, j);
              } while ((j = next) !== i.firstChild);
            }
            break;
          case Tag.DoWhileStatement:
            {
              let j = i.firstChild;
              if (j.pos === Tag.test) prependBrkExpr(j, j);
            }
            break;
          case Tag.WhileStatement:
            {
              let j = i.firstChild;
              if (j.pos === Tag.test) prependBrkExpr(j, j);
            }
            break;
        }
        const expr = Scope.brkExpr(i);
        if (expr)
          Kit.append(
            Kit.insertBefore(i, Kit.node(Tag.push, Tag.ExpressionStatement)),
            expr
          );
        for (; i.type === Tag.LabeldStatement; i = i.firstChild.nextSibling) {}
        break;
      }
      case Tag.DebuggerStatement: {
        const expr = Scope.brkExpr(i);
        if (expr)
          Kit.append(
            Kit.replace(i, Kit.node(Tag.push, Tag.ExpressionStatement)),
            expr
          ).brkFlags |= Scope.DEBUGGER_STMT_BRK_FLAG;
        break;
      }
    }
  } while ((i = n) !== root);
}

export function prepare(root) {
  const { lastFrame } = root;
  const res = (root.stateArgs = []);
  const resFrame = lastFrame.nextFrame;
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
  const { lastFrame } = root;
  for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
    const { doc } = i;
    if (!doc) continue;
    const ref = doc.refDoc || doc;
    const { loc } = ref.node;
    let flags = (doc.brkFlags || ref.brkFlags || 0) | i.brkFlags;
    let handler = i.block.handler;
    while (handler && handler.blackbox) handler = handler.handler;
    if (handler) flags |= Scope.HAS_EH_BRK_FLAG;
    i.metaArgs.push(flags, Kit.locStr(loc));
  }
}

export function scopes(decls) {
  const file = Ctx.root;
  let num = 0;
  const rootScopeDepth = config.scopeDepth;
  const localsSym = file.localsSym;
  for (let i = file.scopes; i; i = i.nextScope) {
    const exprs = i.pushScopeExpr;
    if (exprs) {
      const copyExprs = i.copyScopeExpr;
      const numVars = i.scopeDecls.size + i.symScopePool.varCount;
      const loopScopeIdxs = new Set();
      for (const j of i.loopScope) loopScopeIdxs.add(j.varSym.index - 1);
      for (let i = 0; i < numVars; ++i) {
        Kit.append(exprs, Kit.void0(Tag.push));
        if (loopScopeIdxs.has(i)) {
          const memExpr = Kit.tok(Tag.push, Tag.MemberExpression, {
            computed: true
          });
          Kit.append(memExpr, Kit.id(Tag.object, localsSym));
          Kit.append(memExpr, Kit.num(Tag.property, i + 1));
          Kit.append(copyExprs, memExpr);
        } else {
          Kit.append(copyExprs, Kit.void0(Tag.push));
        }
      }
    }
  }
  for (let i = file.firstChild; i; i = i.nextFunc) {
    const root = i.funcDef;
    const { lastFrame } = root;
    const rootScope = root.origFunc;
    for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
      let { doc } = i;
      doc = doc.refDoc || doc;
      const scope =
        (doc && doc.parentBlock) || (i.block && i.block.scope) || rootScope;
      i.metaArgs.push(scope && getBlockDescr(scope));
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
      if (i.bound) {
        const args = [i.index, Kit.locStr(i.declPos && i.declPos.node.loc)];
        vars[i.orig] = args;
        if (i.metaArgs) args.push(...i.metaArgs);
      }
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
