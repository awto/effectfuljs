/**
 *  Control Flow Graph construction and handling
 *
 *  CFG is a set of Blocks each containing a list of Items
 */
import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
import * as Dom from "./dom";
import config from "./config";

const { Tag, after, next } = Kit;

let count = 0;

export const EXIT_BR = 0;
export const EXIT_COND = 1;
export const EXIT_SWITCH = 2;
export const EXIT_DYN_BR = 3;
export const EXIT_TERM = 4;

const { tempId, tempSym, newSym } = Scope;

export function emptyBlock() {
  const res = {
    // a link to its block
    block: null,
    // first item (or self if there are no items)
    nextItem: null,
    // last item (or self if there are no items)
    prevItem: null,
    // for items which symbol it assigns
    sym: null,
    // marks the block as effectful
    eff: false,
    childrenCount: 0,
    scope: null,
    id: ++count,
    order: 0,
    effOrder: 0,
    exitKind: 0,
    enters: 0,
    // finalizers level
    level: 0,
    // corresponding AST node
    doc: null,
    // cyclic list links
    nextBlock: null,
    prevBlock: null,
    // next block if `cond` symbol is true
    trueBr: null,
    // next block if `cond` symbol is false
    falseBr: null,
    // unconditioned jump
    br: null,
    // can the `br` jump go through finalizers
    unwind: false,
    // loop's branch back
    rec: false,
    // an expression which selects this block on `switch`
    caseTest: null,
    // for blocks ending with switch this specifies the destination blocks
    switchCases: null,
    // for finalizer blocks this contain the last dynamic jump block
    tail: null,
    // a symbol where the indirect jump address should be assigned
    ibr: null,
    // a variable to hold a copy of an exception
    errCopy: null,
    finalizer: null,
    blackbox: false,
    handler: null
  };
  res.nextBlock = res.prevBlock = res.nextItem = res.prevItem = res.block = res;
  return res;
}

/**
 * for case tests we neglect possible side effects in getter to avoid breaking switches
 */
function isPureCaseExpr(i) {
  if (i.pure) return true;
  switch (i.type) {
    case Tag.RegExpLiteral:
    case Tag.NullLiteral:
    case Tag.StringLiteral:
    case Tag.BooleanLiteral:
    case Tag.NumericLiteral:
    case Tag.ThisExpression:
    case Tag.Identifier:
      return true;
    case Tag.MemberExpression:
      return (
        !i.node.computed &&
        i.firstChild.type === Tag.Identifier &&
        i.firstChild.nextSibling.type === Tag.Identifier
      );
    default:
      return false;
  }
}

function defaultNeedsSave(doc) {
  switch (doc.type) {
    case Tag.ThisExpression:
    case Tag.RegExpLiteral:
    case Tag.NullLiteral:
    case Tag.StringLiteral:
    case Tag.BooleanLiteral:
    case Tag.NumericLiteral:
    case Tag.Import:
    case Tag.Super:
      return false;
    case Tag.Identifier:
      const sym = doc.sym;
      return sym && sym.capt;
    case Tag.FunctionExpression:
    case Tag.ArrowFunctionExpression:
    case Tag.BinaryExpression:
    case Tag.ObjectExpression:
    case Tag.ClassExpression:
    case Tag.ArrayExpression:
      return false;
    case Tag.UnaryExpression: {
      switch (doc.node.operator) {
        case "delete":
        case "throw":
          return true;
      }
      const p = doc.parent;
      if (p.type === Tag.MemberExpression) return true;
      return false;
    }
    case Tag.MemberExpression: {
      const p = doc.parent;
      switch (p.type) {
        case Tag.UpdateExpression:
          return false;
        case Tag.ForInStatement:
        case Tag.ForOfStatement:
        case Tag.AssignmentExpression:
          if (doc.pos === Tag.left) return false;
          break;
        case Tag.CallExpression:
          if (doc.pos === Tag.callee) return false;
          break;
        case Tag.UnaryExpression:
          if (p.node.operator === "delete") return false;
          break;
      }
      break;
    }
  }
  return true;
}

export function build(needsSave = defaultNeedsSave) {
  let root, func, body, blocks, lastBlock, lastItem;
  let curBrk, curCnt, brkLabels, cntLabels, curFinalizer, curScope;
  let startBlock, retBlock, errBlock, curHandler, retSym, errSym;
  let finalizers, handlers, yieldSym, async, generator, lastInChain;
  const nsSym = Ctx.root.nsSym;
  const { patSym, ctxSym, localsSym } = Ctx.root;
  const blackbox = config.blackbox;

  for (func = Ctx.root.firstChild; func; func = func.nextFunc) {
    root = func.funcDef;
    body = root.firstChild.prevSibling;
    blocks = {};
    lastBlock = blocks;
    lastItem = null;
    curBrk = null;
    curCnt = null;
    brkLabels = new Map();
    cntLabels = new Map();
    curFinalizer = null;
    curScope = func;
    startBlock = emptyBlock();
    startBlock.scope = curScope;
    startBlock.doc = body;
    retBlock = emptyBlock();
    errBlock = emptyBlock();
    errBlock.blackbox = true;
    root.errBlock = errBlock;
    errBlock.exitKind = EXIT_TERM;
    curHandler = errBlock;
    startBlock.handler = errBlock;
    retSym = root.retSym = newSym("r");
    retSym.decl = func;
    retSym.fieldName = "result";
    errSym = root.errSym = newSym("e");
    errSym.decl = func;
    errSym.fieldName = "error";
    finalizers = root.finalizers = new Set();
    handlers = root.handlers = new Set();
    patSym.decl = curScope;
    patSym.rhs = null;
    patSym.lhs = null;
    ({ async, generator } = func.node);
    if (generator) yieldSym = async ? Scope.yieldAGSym : Scope.yieldSym;
    root.cfgBlock = retBlock;
    root.errBlock = errBlock;
    lastInChain = lastBlock = lastItem = startBlock;
    if (
      func.type === Tag.ArrowFunctionExpression &&
      body.type !== Tag.BlockStatement
    )
      enter(body, retSym);
    else traverse(body, after(body));
    lastBlock.br = retBlock;
    setBlock(errBlock);
    setBlock(retBlock);
  }

  function push(item) {
    const { nextItem } = lastItem;
    lastItem.nextItem = item;
    nextItem.prevItem = item;
    item.prevItem = lastItem;
    item.nextItem = nextItem;
    const block = lastItem.block;
    item.block = block;
    item.id = block.childrenCount++;
    lastItem = item;
    return item;
  }
  function enter(doc, sym) {
    let item;
    if (sym) {
      sym.doc = doc;
    }
    switch (doc.type) {
      case Tag.SequenceExpression: {
        const first = doc.firstChild.firstChild;
        const last = first.prevSibling;
        for (let i = first, j; (j = i.nextSibling), i !== last; i = j)
          enter(i, null);
        enter(last, sym);
        return;
      }
      case Tag.AwaitExpression: {
        const argSym = tempSym(root, curScope);
        enter(doc.firstChild, argSym);
        push(opItem(sym, Scope.awaitSym, argSym));
        lastItem.result = lastItem.eff = true;
        lastItem.doc.refDoc = doc;
        return;
      }
      case Tag.YieldExpression: {
        if (doc.node.delegate) {
          const argSym = tempSym(root, curScope);
          enter(doc.firstChild, argSym);
          const iterSym = tempSym(root, curScope);
          const itemSym = tempSym(root, curScope);
          const exitBlock = newBlock();
          iterSym.releaseBlock = exitBlock;
          push(
            opItem(
              iterSym,
              async ? Scope.iteratorMSym : Scope.iteratorSym,
              argSym
            )
          );
          lastItem.eff = true;
          lastItem.doc.refDoc = doc;
          const iterBlock = (lastBlock.br = newBlock());
          setBlock(iterBlock);
          const bodyBlock = newBlock();
          const yieldResSym = tempSym(root, curScope);
          iterOp(
            async,
            Scope.iterNextSym,
            iterSym,
            itemSym,
            tempId(Tag.push, yieldResSym, curScope)
          );
          lastItem.doc.node.loc = doc.node.loc;
          lastItem.doc.refDoc = doc;
          const testBlock = (lastBlock.br = newBlock());
          setBlock(testBlock);
          push(newItem(null, memExpr(Tag.right, itemSym, "done"), curScope));
          testBlock.exitKind = EXIT_COND;
          if (sym) {
            setBlock((testBlock.trueBr = newBlock()));
            pushIterValue(async, sym, itemSym);
            lastBlock.br = exitBlock;
          } else testBlock.trueBr = exitBlock;
          testBlock.falseBr = bodyBlock;
          setBlock(bodyBlock);
          const nextValSym = tempSym(root, curScope);
          pushIterValue(async, nextValSym, itemSym);
          pushYield(async, yieldResSym, nextValSym);
          lastItem.eff = lastItem.result = true;
          lastItem.doc.refDoc = doc;
          bodyBlock.br = iterBlock;
          bodyBlock.rec = true;
          const catchBlock = newBlock();
          catchBlock.blackbox = true;
          testBlock.handler = bodyBlock.handler = catchBlock;
          handlers.add(catchBlock);
          setBlock(catchBlock);
          catchBlock.exitKind = EXIT_COND;
          push(newItem(null, memExpr(Tag.right, iterSym, "throw")));
          setBlock((catchBlock.trueBr = newBlock()));
          iterOp(
            async,
            Scope.iterErrSym,
            iterSym,
            itemSym,
            Kit.memExpr(Tag.push, ctxSym, "error")
          );
          lastBlock.br = testBlock;
          lastBlock.rec = true;
          const reThrowBlock = (catchBlock.falseBr = newBlock());
          setBlock(reThrowBlock);
          const undef = Kit.node(Tag.right, Tag.CallExpression);
          Kit.append(undef, memExpr(Tag.callee, nsSym, "iterErrUndef"));
          Kit.append(undef, Kit.arr(Tag.arguments));
          push(newItem(errSym, undef));
          lastBlock.br = curHandler;
          lastBlock.unwind = true;
          const finBlock = newFinalizerBlock();
          setBlock(finBlock);
          const retItemSym = tempSym(root, curScope);
          iterOp(
            async,
            Scope.iterFinSym,
            iterSym,
            retItemSym,
            Kit.memExpr(Tag.push, ctxSym, "result")
          );
          push(newItem(null, memExpr(Tag.right, retItemSym, "done"), curScope));
          lastBlock.exitKind = EXIT_COND;
          lastBlock.trueBr = finBlock.tail;
          setBlock((lastBlock.falseBr = newBlock()));
          const retValSym = tempSym(root, curScope);
          pushIterValue(async, retValSym, retItemSym);
          pushYield(async, yieldResSym, retValSym);
          lastItem.eff = lastItem.result = true;
          lastItem.doc.refDoc = doc;
          lastBlock.br = iterBlock;
          lastBlock.rec = true;
          testBlock.finalizer = iterBlock.finalizer = bodyBlock.finalizer = finBlock;
          catchBlock.finalizer = reThrowBlock.finalizer = finBlock;
          setBlock(exitBlock);
          return;
        }
        if (doc.firstChild) {
          const argSym = tempSym(root, curScope);
          enter(doc.firstChild, argSym);
          pushYield(async, sym, argSym);
        } else push(opItem(sym, yieldSym, Scope.undefinedSym));
        lastItem.eff = lastItem.result = true;
        lastItem.doc.refDoc = doc;
        return;
      }
      case Tag.LogicalExpression: {
        const l = doc.firstChild;
        const r = l.nextSibling;
        const altBr = newBlock();
        const exitBlock = newBlock();
        const op = doc.node.operator;
        const lsym = sym || tempSym(root, curScope);
        enter(l, lsym);
        if (op === "??") {
          const cmp = Kit.tok(Tag.push, Tag.BinaryExpression, {
            operator: "!="
          });
          Kit.append(cmp, tempId(Tag.left, lsym, curScope));
          Kit.append(cmp, Kit.node(Tag.right, Tag.NullLiteral));
          push(newItem(null, cmp, curScope));
        } else {
          push(newItem(null, tempId(Tag.right, lsym, curScope), curScope));
        }
        lastBlock.exitKind = EXIT_COND;
        if (op === "&&") {
          lastBlock.trueBr = altBr;
          lastBlock.falseBr = exitBlock;
        } else {
          lastBlock.trueBr = exitBlock;
          lastBlock.falseBr = altBr;
        }
        setBlock(altBr);
        enter(r, sym);
        lastBlock.br = exitBlock;
        setBlock(exitBlock);
        return;
      }
      case Tag.ConditionalExpression: {
        const test = doc.firstChild;
        const cons = test.nextSibling;
        const alt = cons.nextSibling;
        const trueBr = newBlock();
        const falseBr = newBlock();
        const exitBlock = newBlock();
        const cond = tempSym(root, curScope);
        enter(test, cond);
        exitSym(cond, EXIT_COND);
        lastBlock.trueBr = trueBr;
        lastBlock.falseBr = falseBr;
        setBlock(trueBr);
        enter(cons, sym);
        lastBlock.br = exitBlock;
        setBlock(falseBr);
        enter(alt, sym);
        lastBlock.br = exitBlock;
        setBlock(exitBlock);
        return;
      }
      case Tag.AssignmentExpression: {
        const lhs = doc.firstChild;
        if (!sym) {
          if (lhs.type === Tag.Identifier) {
            const lsym = lhs.sym;
            if (lsym && lsym.temp) {
              lsym.scope = curScope;
              enter(lhs.nextSibling, lsym);
              return;
            }
          }
        }
        const rhs = lhs.nextSibling;
        if (lhs.firstChild) traverse(lhs.firstChild, rhs);
        item = newItem(sym, doc, curScope);
        // traverse(rhs, after(doc));
        const rsym = tempSym(root, curScope);
        Kit.replace(rhs, tempId(Tag.right, rsym, curScope));
        enter(rhs, rsym);
        Kit.detach(doc);
        push(item);
        return;
      }
    }
    item = newItem(sym, doc, curScope);
    if (doc.firstChild) traverse(doc.firstChild, after(doc));
    Kit.detach(doc);
    push(item);
  }
  function pushYield(async, resSym, argSym) {
    if (async) {
      const sym = tempSym(root, curScope);
      push(opItem(sym, Scope.awaitSym, argSym));
      lastItem.eff = lastItem.result = true;
      argSym = sym;
    }
    push(opItem(resSym, yieldSym, argSym));
  }
  function pushIterValue(async, valSym, itemSym) {
    push(newItem(valSym, memExpr(Tag.right, itemSym, "value"), curScope));
  }
  function iterOp(async, opSym, iterSym, itemSym, passVal) {
    const call = Kit.node(Tag.right, Tag.CallExpression);
    Kit.append(call, Scope.sysId(Tag.callee, opSym));
    const args = Kit.tok(Tag.arguments, Tag.Array, []);
    Kit.append(call, args);
    Kit.append(args, tempId(Tag.push, iterSym, curScope));
    if (passVal) Kit.append(args, passVal);
    call.eff = true;
    pushAsync(async, itemSym, newItem(null, call, curScope));
    lastItem.eff = true;
  }
  function iterMethod(pos, iterSym, method) {
    const res = Kit.node(pos, Tag.MemberExpression);
    Kit.append(res, tempId(Tag.object, iterSym, curScope));
    Kit.append(res, Kit.tok(Tag.property, Tag.Identifier, { name: method }));
    return res;
  }
  function traverse(from, till) {
    let i = from;
    let j;
    do {
      switch (i.type) {
        case Tag.ExpressionStatement:
          j = after(i);
          enter(i.firstChild, null);
          continue;
        case Tag.DoWhileStatement: {
          const test = i.firstChild;
          const body = test.nextSibling;
          j = after(i);
          loop(i, null, null, null, body, test);
          continue;
        }
        case Tag.WhileStatement: {
          const test = i.firstChild;
          const body = test.nextSibling;
          j = after(i);
          loop(i, null, test, null, body, null);
          continue;
        }
        case Tag.ForStatement: {
          let init = null,
            test = null,
            update = null,
            body = null;
          j = i.firstChild;
          if (j.pos === Tag.init) {
            init = j;
            j = j.nextSibling;
          }
          if (j.pos === Tag.test) {
            test = j;
            j = j.nextSibling;
          }
          if (j.pos === Tag.update) {
            update = j;
            j = j.nextSibling;
          }
          if (j.pos === Tag.body) body = j;
          j = after(i);
          loop(i, init, test, update, body, null);
          continue;
        }
        case Tag.ReturnStatement: {
          const arg = i.firstChild;
          j = after(i);
          if (arg) {
            if (async && generator) {
              const sym = tempSym(root, curScope);
              enter(arg, sym);
              push(opItem(retSym, Scope.awaitSym, sym));
              lastItem.eff = lastItem.result = true;
              lastItem.doc.refDoc = i;
            } else enter(arg, retSym);
          }
          lastBlock.br = retBlock;
          lastBlock.unwind = true;
          setBlock(newBlock());
          continue;
        }
        case Tag.VariableDeclarator: {
          const id = i.firstChild;
          const init = id.nextSibling;
          j = after(i);
          if (
            init.pos !== Tag.init &&
            (!i.parentLoop ||
              i.parentLoop.isScopeNode ||
              i.parent.parent.node.kind === "var")
          )
            continue;
          const assign = Scope.assign(Tag.right);
          Kit.copyMeta(i, assign);
          assign.node.loc = i.node.loc;
          Kit.detach(id);
          id.pos = Tag.left;
          Kit.append(assign, id);
          Dom.regPat(id);
          if (init.pos === Tag.init) {
            const sym = tempSym(root, curScope);
            enter(init, sym);
            Kit.detach(init);
            Kit.append(assign, tempId(Tag.right, sym, curScope));
          } else {
            Kit.append(assign, Kit.void0(Tag.right));
          }
          push(newItem(null, assign, curScope));
          continue;
        }
        case Tag.ThrowStatement: {
          const arg = i.firstChild;
          j = after(i);
          const sym = tempSym(root, curScope);
          enter(arg, sym);
          push(opItem(null, Scope.raiseSym, sym));
          lastItem.result = lastItem.eff = true;
          lastItem.doc.refDoc = i;
          continue;
        }
        case Tag.TryStatement: {
          const body = i.firstChild;
          j = body.nextSibling;
          let handler = null;
          let handlerPat = null;
          let finalizer = null;
          const exitBlock = newBlock();
          const parHandler = curHandler;
          const parFinalizer = curFinalizer;
          if (j.pos === Tag.handler) {
            handler = j;
            handlerPat = j.firstChild;
            if (handlerPat.pos !== Tag.param) {
              handler = handlerPat;
              handlerPat = null;
            } else handler = handlerPat.nextSibling;
            j = j.nextSibling;
          }
          let finalizerBlock = null;
          if (j.pos === Tag.finalizer) {
            finalizer = j;
            finalizerBlock = curFinalizer = newFinalizerBlock();
            curScope.scopeDecls.add(
              (finalizerBlock.tail.errCopy = tempSym(root, curScope))
            );
          }
          j = after(i);
          let handlerBlock = null;
          if (handler) handlerBlock = curHandler = newBlock();
          const bodyBlock = newBlock();
          lastBlock.br = bodyBlock;
          setBlock(bodyBlock);
          traverse(body, after(body));
          lastBlock.br = exitBlock;
          lastBlock.unwind = true;
          curHandler = parHandler;
          if (handler) {
            handlers.add(handlerBlock);
            setBlock(handlerBlock);
            if (handlerPat) {
              const patAssign = Scope.assign(Tag.right);
              Kit.copyMeta(handler, patAssign);
              Kit.detach(handlerPat);
              handlerPat.pos = Tag.left;
              Kit.append(patAssign, handlerPat);
              Dom.regPat(handlerPat);
              const patTok = Kit.memExpr(Tag.right, ctxSym, "error");
              Kit.insertAfter(handlerPat, patTok);
              patAssign.node.loc = handlerPat.node.loc;
              push(newItem(null, patAssign, curScope));
              const resetVal = Kit.assign(Tag.push);
              Kit.append(resetVal, Kit.memExpr(Tag.left, ctxSym, "error"));
              Kit.append(resetVal, Kit.void0(Tag.right));
              push(newItem(null, resetVal, curScope));
            }
            traverse(handler, after(handler));
            lastBlock.br = exitBlock;
            lastBlock.unwind = true;
          }
          curFinalizer = parFinalizer;
          if (finalizer) {
            setBlock(finalizerBlock);
            traverse(finalizer, after(finalizer));
            lastBlock.br = finalizerBlock.tail;
          }
          setBlock(exitBlock);
          continue;
        }
        case Tag.BreakStatement:
        case Tag.ContinueStatement: {
          const isbrk = i.type === Tag.BreakStatement;
          const lab = i.firstChild && i.firstChild.node.name;
          let dst = null;
          if (lab) {
            dst = (isbrk ? brkLabels : cntLabels).get(lab);
            if (dst == null) throw Kit.error(`Undefined label '${lab}'`, i);
          } else {
            dst = isbrk ? curBrk : curCnt;
            if (dst == null)
              throw Kit.error(
                isbrk
                  ? "Illegal break statement"
                  : "Illegal continue statement: no surrounding iteration statement",
                i
              );
          }
          lastBlock.br = dst;
          if (!isbrk) lastBlock.rec = true;
          lastBlock.unwind = true;
          setBlock(newBlock());
          j = after(i);
          continue;
        }
        case Tag.LabeledStatement: {
          const label = i.firstChild.node.name;
          const exitBlock = newBlock();
          const parLabels = brkLabels;
          j = after(i);
          brkLabels = new Map(brkLabels);
          brkLabels.set(label, exitBlock);
          traverse(i.firstChild.nextSibling, after(i));
          brkLabels = parLabels;
          lastBlock.br = exitBlock;
          setBlock(exitBlock);
          continue;
        }
        case Tag.ForInStatement:
        case Tag.ForOfStatement: {
          let left = i.firstChild;
          const parScope = curScope;
          const forIn = i.type === Tag.ForInStatement;
          const right = left.nextSibling;
          const body = right.nextSibling;
          if (left.type === Tag.VariableDeclaration) {
            left = left.firstChild.firstChild.firstChild;
            left.pos = Tag.left;
          }
          const parFinalizer = curFinalizer;
          j = after(i);
          const async = !forIn && i.node.await;
          const exitBlock = newBlock();
          if (i.isScopeNode) {
            curScope = i;
            setBlock((lastBlock.br = newBlock()));
            i.pushScopeExpr = pushPushScope();
          }
          const rsym = tempSym(root, curScope);
          enter(right, rsym);
          const iterSym = tempSym(root, curScope);
          i.loopScope.add(iterSym);
          push(
            opItem(
              iterSym,
              forIn
                ? Scope.forInIteratorSym
                : async
                ? Scope.iteratorMSym
                : Scope.iteratorSym,
              rsym
            )
          );
          lastItem.eff = true;
          lastItem.doc.refDoc = right;
          const enterBlock = lastBlock;
          const bodyBlock = newBlock();
          if (i.isScopeNode) {
            curScope = parScope;
            const finalizer = newFinalizerBlock();
            setBlock(finalizer);
            finalizer.br = finalizer.tail;
            pushPopScope();
            curFinalizer = bodyBlock.finalizer = finalizer;
            curScope = i;
          }
          if (!forIn) {
            const finalizer = newFinalizerBlock();
            setBlock(finalizer);
            iterOp(async, Scope.iterFinSym, iterSym, null, null);
            lastItem.doc.refDoc = right;
            lastBlock.br = finalizer.tail;
            bodyBlock.finalizer = finalizer;
          }
          let firstBlock = enterBlock;
          let scopeCleanupBlock = exitBlock;
          if (i.isScopeNode) {
            setBlock((enterBlock.br = newBlock()));
            const prevEnter = lastBlock;
            prevEnter.unwind = true;
            scopeCleanupBlock = newBlock();
            scopeCleanupBlock.br = exitBlock;
            scopeCleanupBlock.unwind = true;
            setBlock(scopeCleanupBlock);
            setBlock((prevEnter.br = newBlock()));
            bodyBlock.scope = curScope;
            firstBlock = lastBlock;
          }
          curFinalizer = bodyBlock.finalizer;
          const testBlock = newBlock();
          const postfixBlock = newBlock();
          postfixBlock.br = scopeCleanupBlock;
          firstBlock.br = testBlock;
          setBlock(testBlock);
          const itemSym = tempSym(root, curScope);
          iterSym.releaseBlock = exitBlock;
          if (!forIn && !blackbox) {
            const brk = Scope.brkExpr(left);
            if (brk) push(newItem(null, brk, curScope));
          }
          if (!async && config.expLooseNext) {
            const assign = Kit.assign(Tag.push);
            Kit.append(
              assign,
              Scope.sysMemExpr(Tag.left, Scope.contextSym, "call")
            );
            Kit.append(assign, iterMethod(Tag.right, iterSym, "next"));
            push(newItem(null, assign, curScope));
            const call = Kit.node(Tag.right, Tag.CallExpression);
            Kit.append(call, iterMethod(Tag.callee, iterSym, "next"));
            Kit.append(call, Kit.arr(Tag.arguments));
            push(newItem(itemSym, call, curScope));
            lastItem.eff = call.eff = true;
          } else iterOp(async, Scope.iterNextSym, iterSym, itemSym, null);
          lastItem.doc.node.loc = left.node.loc;
          lastItem.doc.refDoc = right;
          push(newItem(null, memExpr(Tag.right, itemSym, "done"), curScope));
          lastBlock.exitKind = EXIT_COND;
          lastBlock.trueBr = postfixBlock;
          lastBlock.falseBr = bodyBlock;
          setBlock(postfixBlock);
          setBlock(bodyBlock);
          if (left.type === Tag.MemberExpression) {
            let obj = left.firstChild;
            let prop = obj.nextSibling;
            Kit.detach(obj);
            Kit.detach(prop);
            if (needsSave(obj)) {
              const sym = tempSym(root, curScope);
              enter(obj, sym);
              obj = tempId(Tag.object, sym, curScope);
            }
            if (left.node.computed && needsSave(prop)) {
              const sym = tempSym(root, curScope);
              enter(prop, sym);
              prop = tempId(Tag.property, sym, curScope);
            }
            Kit.append(left, obj);
            Kit.append(left, prop);
          }
          const assign = Scope.assign(Tag.right);
          Kit.copyMeta(left, assign);
          Kit.detach(left);
          Kit.append(assign, left);
          Dom.regPat(left);
          const valSym = tempSym(root, curScope);
          pushIterValue(async, valSym, itemSym);
          Kit.append(assign, tempId(Tag.right, valSym, curScope));
          push(newItem(null, assign, curScope));
          loopBody(i, body, testBlock, exitBlock);
          setBlock(exitBlock);
          curFinalizer = parFinalizer;
          curScope = parScope;
          continue;
        }
        case Tag.SwitchStatement: {
          let pureTests = true;
          const discrim = i.firstChild;
          j = after(i);
          const cases = discrim.nextSibling.firstChild;
          let scase = cases;
          // trying not to break switch
          do {
            const test = scase.firstChild;
            if (test.pos === Tag.test && !isPureCaseExpr(test)) {
              pureTests = false;
              break;
            }
          } while ((scase = scase.nextSibling) !== cases);
          const exitBlock = newBlock();
          const parBrk = curBrk;
          curBrk = exitBlock;
          let lsym = tempSym(root, curScope);
          enter(discrim, lsym);
          let prevBlock = null;
          scase = cases;
          let hasDefault = false;
          if (pureTests) {
            const exits = (lastBlock.switchCases = []);
            exitSym(lsym, EXIT_SWITCH);
            do {
              let test = scase.firstChild;
              let consequent = null;
              if (test.pos !== Tag.test) {
                consequent = test;
                test = null;
                hasDefault = true;
              } else consequent = test.nextSibling;
              const block = newBlock();
              if (prevBlock) prevBlock.br = block;
              exits.push(block);
              block.caseTest = test;
              setBlock(block);
              traverse(consequent, after(consequent));
              prevBlock = lastBlock;
            } while ((scase = scase.nextSibling) !== cases);
            if (prevBlock) prevBlock.br = exitBlock;
            if (!hasDefault) exits.push(exitBlock);
          } else {
            let prevTest;
            let defaultBlock;
            let prevBlock;
            const startBlock = lastBlock;
            do {
              let test = scase.firstChild;
              let consequent;
              const bodyBlock = newBlock();
              if (test.pos === Tag.test) {
                consequent = test.nextSibling;
                const testBlock = newBlock();
                const rsym = tempSym(root, curScope);
                if (prevTest) {
                  prevTest.falseBr = testBlock;
                  lastBlock.br = bodyBlock;
                } else {
                  startBlock.br = testBlock;
                }
                if (prevBlock) prevBlock.br = bodyBlock;
                setBlock(testBlock);
                enter(test, rsym);
                const cmp = Kit.tok(Tag.right, Tag.BinaryExpression, {
                  operator: "==="
                });
                Kit.append(cmp, tempId(Tag.left, lsym, curScope));
                Kit.append(cmp, tempId(Tag.right, rsym, curScope));
                const item = newItem(null, cmp, curScope);
                cmp.node.loc = test.node.loc;
                push(item);
                prevTest = lastBlock;
                lastBlock.exitKind = EXIT_COND;
                lastBlock.trueBr = bodyBlock;
                setBlock(bodyBlock);
              } else {
                // if (prevTest) prevTest.falseBr = bodyBlock;
                defaultBlock = bodyBlock;
                // prevTest = null;
                if (prevBlock) lastBlock.br = bodyBlock;
                setBlock(bodyBlock);
                consequent = test;
              }
              traverse(consequent, after(consequent));
              prevBlock = lastBlock;
            } while ((scase = scase.nextSibling) !== cases);
            lastBlock.br = exitBlock;
            if (prevTest) {
              if (defaultBlock) prevTest.falseBr = defaultBlock;
              else prevTest.falseBr = exitBlock;
            }
          }
          curBrk = parBrk;
          setBlock(exitBlock);
          continue;
        }
        case Tag.IfStatement: {
          const test = i.firstChild;
          const cons = test.nextSibling;
          const alt = cons.nextSibling;
          const hasAlt = alt.pos === Tag.alternate;
          const trueBr = newBlock();
          const exitBlock = newBlock();
          const falseBr = hasAlt ? newBlock() : exitBlock;
          j = after(i);
          const cond = tempSym(root, curScope);
          enter(test, cond);
          exitSym(cond, EXIT_COND);
          lastBlock.trueBr = trueBr;
          lastBlock.falseBr = falseBr;
          setBlock(trueBr);
          traverse(cons, after(cons));
          lastBlock.br = exitBlock;
          if (hasAlt) {
            setBlock(falseBr);
            traverse(alt, j);
            lastBlock.br = exitBlock;
          }
          setBlock(exitBlock);
          continue;
        }
        default: {
          const ti = Kit.typeInfo(i);
          if (ti.expr) {
            if (i.pure) {
              j = after(i);
              continue;
            }
            if (needsSave(i)) {
              if (i.parent) {
                j = after(i);
                const sym = tempSym(root, curScope);
                const id = tempId(i.pos, sym, curScope);
                Scope.replaceRhs(i, id);
                enter(i, sym);
                lastItem.refDoc = i;
                continue;
              }
              Kit.invariant(i.cfgItem);
            }
          }
        }
      }
      j = next(i);
    } while (((i = j), i !== till));
  }
  function pushPopScope() {
    const op = Kit.assign(Tag.push);
    Kit.append(op, Kit.memExpr(Tag.left, ctxSym, "$"));
    const closOp = Kit.tok(Tag.right, Tag.MemberExpression, {
      computed: true
    });
    Kit.append(op, closOp);
    Kit.append(closOp, Kit.id(Tag.object, localsSym));
    Kit.append(closOp, Kit.num(Tag.property, 0));
    push(newItem(localsSym, op, null));
  }
  function pushScope(parentExpr) {
    const op = Kit.assign(Tag.push);
    Kit.append(op, Kit.memExpr(Tag.left, ctxSym, "$"));
    const arrExpr = Kit.append(op, Kit.node(Tag.right, Tag.ArrayExpression));
    const exprs = Kit.append(arrExpr, Kit.arr(Tag.elements));
    Kit.append(exprs, parentExpr);
    push(newItem(localsSym, op, curScope));
    return exprs;
  }
  function pushCopyScope() {
    const memExpr = Kit.tok(Tag.push, Tag.MemberExpression, { computed: true });
    Kit.append(memExpr, Kit.id(Tag.object, localsSym));
    Kit.append(memExpr, Kit.num(Tag.property, 0));
    return pushScope(memExpr);
  }
  function pushPushScope() {
    return pushScope(Kit.id(Tag.push, localsSym));
  }
  function loop(i, init, test, update, body, postTest) {
    const exitBlock = newBlock();
    const parScope = curScope;
    const parFinalizer = curFinalizer;
    let scopeCleanupBlock = exitBlock;
    if (i.isScopeNode) {
      const prevEnter = lastBlock;
      const finalizer = newFinalizerBlock();
      curScope = i;
      i.pushScopeExpr = pushPushScope();
      setBlock(finalizer);
      finalizer.br = finalizer.tail;
      finalizer.tail.scope = parScope;
      pushPopScope();
      curFinalizer = finalizer;
      prevEnter.unwind = true;
      scopeCleanupBlock = newBlock();
      scopeCleanupBlock.br = exitBlock;
      scopeCleanupBlock.unwind = true;
      setBlock(scopeCleanupBlock);
      setBlock((prevEnter.br = newBlock()));
    }
    if (init) {
      if (init.type === Tag.VariableDeclaration) traverse(init, after(init));
      else enter(init, null);
    }
    const begBlock = newBlock();
    lastBlock.br = begBlock;
    setBlock(begBlock);
    if (test) {
      const bodyBlock = newBlock();
      const cond = tempSym(root, curScope);
      enter(test, cond);
      exitSym(cond, EXIT_COND);
      lastBlock.trueBr = bodyBlock;
      lastBlock.falseBr = scopeCleanupBlock;
      setBlock(bodyBlock);
    }
    const updBlock = (update || postTest) && newBlock();
    loopBody(i, body, updBlock || begBlock, scopeCleanupBlock);
    if (updBlock) setBlock(updBlock);
    if (update) enter(update, null);
    if (postTest) {
      const cond = tempSym(root, curScope);
      enter(postTest, cond);
      exitSym(cond, EXIT_COND);
      lastBlock.trueBr = begBlock;
      lastBlock.falseBr = scopeCleanupBlock;
    } else lastBlock.br = begBlock;
    curScope = parScope;
    curFinalizer = parFinalizer;
    setBlock(exitBlock);
  }
  function loopBody(i, body, cnt, brk) {
    if (!body) return;
    const parBrk = curBrk;
    const parCnt = curCnt;
    curCnt = cnt;
    curBrk = brk;
    const par = i.parent;
    if (par.type === Tag.LabeledStatement) {
      const label = par.firstChild.node.name;
      const parLabels = cntLabels;
      cntLabels = new Map(cntLabels);
      cntLabels.set(label, curCnt);
      traverse(body, after(body));
      cntLabels = parLabels;
    } else traverse(body, after(body));
    if (i.isScopeNode) i.copyScopeExpr = pushCopyScope();
    curCnt = parCnt;
    curBrk = parBrk;
    lastBlock.br = cnt;
    lastBlock.rec = true;
    lastBlock.unwind = i.isScopeNode;
  }
  function newBlock() {
    const res = emptyBlock();
    res.scope = curScope;
    res.handler = curHandler;
    res.finalizer = curFinalizer;
    return res;
  }
  function setBlock(block) {
    block.nextBlock = lastInChain.nextBlock;
    block.prevBlock = lastInChain;
    lastInChain.nextBlock = lastInChain.nextBlock.prevBlock = block;
    lastInChain = lastBlock = lastItem = block;
    return block;
  }
  function newFinalizerBlock() {
    const res = newBlock();
    finalizers.add(res);
    res.level = curFinalizer ? curFinalizer.level + 1 : 0;
    const tail = (res.tail = newBlock());
    tail.exitKind = EXIT_DYN_BR;
    curScope.scopeDecls.add((tail.ibr = tempSym(root, curScope)));
    tail.nextInstance = tail.prevInstance = tail;
    return res;
  }
  function pushAsync(async, sym, item) {
    if (!async) {
      push(item);
      item.sym = sym;
      if (sym) {
        item.prevLHS = sym.lhs;
        sym.lhs = item;
      }
    } else {
      const tmp = (item.sym = tempSym(root, curScope));
      tmp.lhs = item;
      push(item);
      push(opItem(sym, Scope.awaitSym, tmp));
      lastItem.eff = lastItem.result = true;
    }
    lastItem.eff = true;
  }
  function memExpr(pos, sym, name) {
    const res = Kit.node(pos, Tag.MemberExpression);
    Kit.append(res, tempId(Tag.object, sym, curScope));
    Kit.append(res, Kit.tok(Tag.property, Tag.Identifier, { name }));
    return res;
  }
  function opItem(bsym, opsym, argSym) {
    const call = Kit.node(Tag.right, Tag.CallExpression);
    const opId = Scope.sysId(Tag.callee, opsym);
    Kit.append(call, opId);
    const args = Kit.tok(Tag.arguments, Tag.Array, []);
    if (argSym) Kit.append(args, tempId(Tag.push, argSym, curScope));
    Kit.append(call, args);
    return newItem(bsym, call, curScope);
  }
  function exitSym(sym, kind) {
    push(newItem(null, tempId(Tag.right, sym, curScope), curScope));
    lastBlock.exitKind = kind;
  }
}

function newItem(sym, doc, curScope) {
  const res = {
    block: null,
    nextItem: null,
    prevItem: null,
    sym,
    eff: !!doc.eff,
    childrenCount: 0,
    scope: curScope,
    id: ++count,
    order: 0,
    effOrder: 0,
    usages: null,
    prevLHS: null,
    // if doc is an expression
    expr: true,
    // if this doc is an argument of `return`
    result: false,
    doc
  };
  if (sym) {
    res.prevLHS = sym.lhs;
    sym.lhs = res;
  }
  if (doc) doc.cfgItem = res;
  return res;
}

/** calculates `cfgItem` for each bind symbol */
export function prepareItemBinds(root) {
  for (let i = root.bindIds; i; i = i.prevBindId) {
    for (let j = i.rhs; j != null; j = j.prevRHS) {
      let itemNode;
      for (let k = j; (k = k.parent); itemNode = k) {}
      if (!itemNode) continue;
      j.cfgItem = itemNode.cfgItem;
    }
  }
  return root;
}

export function prepare(root) {
  prepareItemBinds(root);
  let cur = 1;
  let curEff = 1;
  const end = root.cfgBlock;
  const beg = end.nextBlock;
  let firstSym = null;
  let lastSym = null;
  for (let i = beg; i !== end; i = i.nextBlock) {
    i.effOrder = curEff;
    i.order = cur;
    let prevEffItem = (i.nextEffItem = i);
    for (let j = i.nextItem, last = false, n; !last; j = n) {
      n = j.nextItem;
      last = j.last = n === i;
      j.effOrder = curEff;
      j.order = cur;
      ++cur;
      if (j.eff) {
        ++curEff;
        j.nextEffItem = i;
        j.prevEffItem = prevEffItem;
        prevEffItem = prevEffItem.nextEffItem = j;
      }
      const sym = j.sym;
      if (sym && !sym.ordered && sym.scope) {
        sym.ordered = true;
        sym.nextOrderedBind = null;
        if (lastSym) lastSym = lastSym.nextOrderedBind = sym;
        else lastSym = firstSym = sym;
      }
    }
    i.prevEffItem = prevEffItem;
  }
  end.effOrder = curEff;
  end.order = cur;
  for (let i = beg; i !== end; i = i.nextBlock) {
    const { br, switchCases } = i;
    switch (i.exitKind) {
      case EXIT_BR:
        ++br.enters;
        break;
      case EXIT_COND:
        const { trueBr, falseBr } = i;
        ++trueBr.enters;
        ++falseBr.enters;
        break;
      case EXIT_SWITCH:
        for (const j of switchCases) ++j.enters;
        break;
    }
  }
  root.orderedBinds = firstSym;
  end.order = cur;
  end.effOrder = curEff;
}
