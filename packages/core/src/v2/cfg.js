/**
 *  Control Flow Graph construction and handling
 *
 *  CFG is a set of Blocks each containing a list of Items
 */
import * as Kit from "./kit";
import * as Scope from "./scope";

const { Tag, after, next } = Kit;

let count = 0;

export const EXIT_BR = 0;
export const EXIT_COND = 1;
export const EXIT_SWITCH = 2;
export const EXIT_DYN_BR = 3;

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
    finalizer: null,
    finalizerExit: false,
    hasReturn: false,
    handler: null
  };
  res.nextBlock = res.prevBlock = res.nextItem = res.prevItem = res.block = res;
  return res;
}

/**
 * for case tests we neglect possible side effects
 * in getter to avoid breaking switches
 */
function isPureCaseExpr(i) {
  if (Kit.isPureExpr(i)) return true;
  return (
    i.type === Tag.MemberExpression &&
    !i.node.computed &&
    i.firstChild.type === Tag.Identifier &&
    i.firstChild.nextSibling.type === Tag.Identifier
  );
}

function needsSave(doc) {
  switch (doc.type) {
    case Tag.ThisExpression:
    case Tag.Identifier:
    case Tag.RegExpLiteral:
    case Tag.NullLiteral:
    case Tag.StringLiteral:
    case Tag.BooleanLiteral:
    case Tag.NumericLiteral:
      return false;
    case Tag.FunctionExpression:
    case Tag.ArrowFunctionExpression:
    case Tag.BinaryExpression:
    case Tag.ObjectExpression:
    case Tag.ClassExpression:
    case Tag.ArrayExpression:
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

export function build(root) {
  const func = root.origFunc;
  const file = func.root;
  const body = func.block;
  const blocks = {};
  let lastBlock = blocks;
  let lastItem = null;
  let curBrk = null;
  let curCnt = null;
  let brkLabels = new Map();
  let cntLabels = new Map();
  let curHandler = null;
  let curFinalizer = null;
  let curScope = func;
  // const dummyUnreachable = emptyBlock();
  const startBlock = emptyBlock();
  startBlock.scope = curScope;
  startBlock.doc = body;
  const retBlock = emptyBlock();
  const patSym = file.patSym;
  const retSym = (root.retSym = newSym("r"));
  retSym.fieldName = "value";
  const ctxSym = root.ctxSym;
  const finalizers = (root.finalizers = new Set());
  const handlers = (root.handlers = new Set());
  patSym.decl = curScope;
  patSym.rhs = null;
  patSym.lhs = null;
  ctxSym.frameLocal = patSym.frameLocal = true;
  const async = root.node.async;
  root.cfgBlock = retBlock;
  let lastInChain;
  lastInChain = lastBlock = lastItem = startBlock;
  if (func.type === Tag.ArrowFunctionExpression && !body)
    enter(root.firstChild.prevSibling, retSym);
  else traverse(body, after(body));
  lastBlock.br = retBlock;
  setBlock(retBlock);
  return root;

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
        lastItem.eff = true;
        return;
      }
      case Tag.MetaProperty:
        if (
          doc.node.meta.name === "function" &&
          doc.node.property.name === "sent"
        )
          doc = Scope.replaceRhs(doc, Kit.memExpr(doc.pos, ctxSym, "sent"));
        break;
      case Tag.YieldExpression: {
        if (doc.node.delegate) {
          const argSym = tempSym(root, curScope);
          enter(doc.firstChild, argSym);
          const iterSym = tempSym(root, curScope);
          const itemSym = tempSym(root, curScope);
          const valSym = sym || tempSym(root, curScope);
          const exitBlock = newBlock();
          iterSym.releaseBlock = exitBlock;
          push(
            opItem(
              iterSym,
              async ? Scope.iteratorMSym : Scope.iteratorSym,
              argSym
            )
          );
          const testBlock = (lastBlock.br = newBlock());
          setBlock(testBlock);
          const bodyBlock = newBlock();
          iterNext(async, iterSym, itemSym, doc.node.loc);
          push(newItem(valSym, memExpr(Tag.right, itemSym, "value"), curScope));
          push(newItem(null, memExpr(Tag.right, itemSym, "done"), curScope));
          testBlock.exitKind = EXIT_COND;
          testBlock.falseBr = bodyBlock;
          setBlock(bodyBlock);
          push(opItem(null, Scope.yieldSym, valSym));
          bodyBlock.br = testBlock;
          bodyBlock.rec = true;
          bodyBlock.finalizer = iterCleanup(
            async,
            bodyBlock,
            true,
            exitBlock,
            iterSym
          );
          testBlock.trueBr = exitBlock;
          setBlock(exitBlock);
          return;
        }
        let argSym;
        if (doc.firstChild) {
          argSym = tempSym(root, curScope);
          enter(doc.firstChild, argSym);
          push(opItem(sym, Scope.yieldSym, argSym));
        } else push(opItem(sym, Scope.yieldSym, Scope.undefinedSym));
        lastItem.eff = true;
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
        if (!sym) {
          const lhs = doc.firstChild;
          if (lhs.type === Tag.Identifier) {
            const lsym = lhs.sym;
            if (lsym && lsym.temp) {
              lsym.scope = curScope;
              enter(lhs.nextSibling, lsym);
              return;
            }
          }
        }
        break;
      }
    }
    item = newItem(sym, doc, curScope);
    if (doc.firstChild) traverse(doc.firstChild, after(doc));
    Kit.detach(doc);
    push(item);
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
          if (arg) enter(arg, retSym);
          lastBlock.br = retBlock;
          lastBlock.unwind = true;
          // lastBlock = lastItem = dummyUnreachable;
          setBlock(newBlock());
          for (let j = curFinalizer; j; j = j.finalizer) j.hasReturn = true;
          continue;
        }
        case Tag.DebuggerStatement: {
          const item = newItem(null, i, curScope);
          push(item);
          j = i.nextSibling;
          continue;
        }
        case Tag.VariableDeclarator: {
          const id = i.firstChild;
          const init = id.nextSibling;
          if (init.pos !== Tag.init) break;
          const assign = Kit.assign(Tag.right); // Scope.assign(Tag.right, file, i);
          assign.node.loc = i.node.loc;
          j = after(i);
          const sym = tempSym(root, curScope);
          enter(init, sym);
          Kit.detach(id);
          varDeclToLhs(id);
          id.pos = Tag.left;
          Kit.detach(init);
          Kit.append(assign, id);
          Kit.append(assign, tempId(Tag.right, sym, curScope));
          const item = newItem(null, assign, curScope);
          push(item);
          continue;
        }
        case Tag.ThrowStatement: {
          const arg = i.firstChild;
          j = after(i);
          enter(arg, retSym);
          lastBlock.br = retBlock;
          setBlock(newBlock());
          // lastBlock = lastItem = dummyUnreachable;
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
              const patAssign = Kit.assign(Tag.right); // Scope.assign(Tag.right, file, handler);
              Kit.detach(handlerPat);
              handlerPat.pos = Tag.left;
              Kit.append(patAssign, handlerPat);
              const patTok = Kit.memExpr(Tag.right, ctxSym, "value");
              Kit.insertAfter(handlerPat, patTok);
              patAssign.node.loc = handlerPat.node.loc;
              push(newItem(null, patAssign, curScope));
            }
            traverse(handler, after(handler));
            lastBlock.br = exitBlock;
          }
          curFinalizer = parFinalizer;
          if (finalizer) {
            setBlock(finalizerBlock);
            traverse(finalizer, after(finalizer));
            lastBlock.br = finalizerBlock.tail;
            exitBlock.finalizerExit = finalizerBlock.hasRet;
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
          //lastBlock = lastItem = dummyUnreachable;
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
          const enterBlock = lastBlock;
          const forIn = i.type === Tag.ForInStatement;
          const right = left.nextSibling;
          const body = right.nextSibling;
          if (left.type === Tag.VariableDeclaration) {
            left = left.firstChild.firstChild.firstChild;
            left.pos = Tag.left;
            Kit.detach(left);
            varDeclToLhs(left);
          }
          const parHandler = curHandler;
          const parFinalizer = curFinalizer;
          j = after(i);
          const async = !forIn && i.node.await;
          const rsym = tempSym(root, curScope);
          enter(right, rsym);
          const iterSym = tempSym(root, curScope);
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
          const exitBlock = newBlock();
          const bodyBlock = newBlock();
          if (!forIn) {
            curFinalizer = iterCleanup(
              async,
              bodyBlock,
              false,
              exitBlock,
              iterSym
            );
            curHandler = bodyBlock.handler;
          }
          let firstBlock = enterBlock;
          if (i.scopeNode) {
            setBlock((enterBlock.br = newBlock()));
            enterLoop(i);
            bodyBlock.scope = curScope;
            firstBlock = lastBlock;
          }
          const testBlock = newBlock();
          // avoiding `cond` with `unwind`
          const postfixBlock = newBlock();
          postfixBlock.br = exitBlock;
          postfixBlock.unwind = true;
          firstBlock.br = testBlock;
          setBlock(testBlock);
          const itemSym = tempSym(root, curScope);
          bodyBlock.finalizer = curFinalizer;
          iterSym.releaseBlock = exitBlock;
          iterNext(async, iterSym, itemSym, left.node.loc);
          push(newItem(null, memExpr(Tag.right, itemSym, "done"), curScope));
          lastBlock.exitKind = EXIT_COND;
          lastBlock.trueBr = postfixBlock;
          lastBlock.falseBr = bodyBlock;
          setBlock(postfixBlock);
          setBlock(bodyBlock);
          const assign = Kit.assign(Tag.right); // Scope.assign(Tag.right, file, bodyBlock);
          Kit.detach(left);
          Kit.append(assign, left);
          Kit.append(assign, memExpr(Tag.right, itemSym, "value"));
          push(newItem(null, assign, curScope));
          loopBody(i, body, testBlock, exitBlock);
          setBlock(exitBlock);
          if (!forIn) exitBlock.finalizerExit = curFinalizer.hasReturn;
          curHandler = parHandler;
          curFinalizer = parFinalizer;
          continue;
        }
        case Tag.SwitchStatement: {
          let pureTests = true;
          const discrim = i.firstChild;
          j = after(i);
          const cases = discrim.nextSibling.firstChild;
          const last = cases.prevSibling;
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
          curBrk = exitBlock;
          let lsym = tempSym(root, curScope);
          enter(discrim, lsym);
          let prevBlock = null;
          scase = cases;
          if (pureTests) {
            const exits = (lastBlock.switchCases = []);
            // push(newItem(null, tempId(Tag.right, lsym, curScope), curScope));
            exitSym(lsym, EXIT_SWITCH);
            // lsym.usageBlock = lastBlock;
            do {
              let test = scase.firstChild;
              let consequent = null;
              if (test.pos !== Tag.test) {
                consequent = test;
                test = null;
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
            if (last.firstChild.pos === Tag.test) exits.push(exitBlock);
          } else {
            let prevTest;
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
                } else lastBlock.br = testBlock;
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
                if (prevTest) prevTest.falseBr = bodyBlock;
                prevTest = null;
                lastBlock.br = bodyBlock;
                setBlock(bodyBlock);
                consequent = test;
              }
              traverse(consequent, after(consequent));
            } while ((scase = scase.nextSibling) !== cases);
            lastBlock.br = exitBlock;
            if (prevTest) prevTest.falseBr = exitBlock;
          }
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
                // Kit.replace(i, id);
                Scope.replaceRhs(i, id);
                enter(i, sym);
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
  function loop(i, init, test, update, body, postTest) {
    const exitBlock = (curBrk = newBlock());
    const parScope = curScope;
    const parFinalizer = curFinalizer;
    if (i.scopeNode) enterLoop(i);
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
      lastBlock.falseBr = exitBlock;
      setBlock(bodyBlock);
    }
    const updBlock = (update || postTest) && newBlock();
    loopBody(i, body, updBlock || begBlock, exitBlock);
    if (updBlock) setBlock(updBlock);
    if (update) enter(update, null);
    if (postTest) {
      const cond = tempSym(root, curScope);
      enter(postTest, cond);
      exitSym(cond, EXIT_COND);
      lastBlock.trueBr = begBlock;
      lastBlock.falseBr = exitBlock;
    } else lastBlock.br = begBlock;
    curScope = parScope;
    if (i.scopeNode) exitBlock.finalizerExit = curFinalizer.hasReturn;
    curFinalizer = parFinalizer;
    setBlock(exitBlock);
  }
  function enterLoop(i) {
    const parScope = curScope;
    curScope = i;
    const prevEnter = lastBlock;
    push(opItem(null, Scope.pushScopeSym, null));
    const finalizer = newFinalizerBlock();
    setBlock(finalizer);
    finalizer.br = finalizer.tail;
    finalizer.tail.scope = parScope;
    push(opItem(null, Scope.popScopeSym, null));
    curFinalizer = finalizer;
    prevEnter.unwind = true;
    setBlock((prevEnter.br = newBlock()));
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
    curCnt = parCnt;
    curBrk = parBrk;
    lastBlock.br = cnt;
    lastBlock.rec = true;
    lastBlock.unwind = i.scopeNode;
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
    func.scopeDecls.add((tail.ibr = tempSym(root, func)));
    return res;
  }
  function pushAsync(async, item) {
    if (!async) {
      push(item);
      return;
    }
    const sym = item.sym;
    const tmp = (item.sym = tempSym(root, curScope));
    push(item);
    push(opItem(sym, Scope.awaitSym, tmp));
  }
  function iterNext(async, iterSym, itemSym, loc) {
    const call = Kit.node(Tag.right, Tag.CallExpression);
    Kit.append(call, memExpr(Tag.callee, iterSym, "next"));
    Kit.append(call, Kit.tok(Tag.arguments, Tag.Array, []));
    const item = newItem(itemSym, call, curScope);
    item.doc.node.loc = loc;
    pushAsync(async, item);
  }
  function iterCleanup(async, bodyBlock, delegate, exitBlock, iterSym) {
    const finBlock = newFinalizerBlock();
    setBlock(finBlock);
    pushAsync(
      async,
      opItem(null, async ? Scope.iterFinMSym : Scope.iterFinSym, iterSym)
    );
    finBlock.br = finBlock.tail;
    const catchBlock = (bodyBlock.handler = newBlock());
    handlers.add(catchBlock);
    setBlock(catchBlock);
    catchBlock.br = exitBlock; // this is unreachable
    catchBlock.finalizer = finBlock; // this never happens only to cancel it
    const call = Kit.node(Tag.right, Tag.CallExpression);
    const opId = Scope.sysId(
      Tag.callee,
      async ? Scope.iterErrMSym : Scope.iterErrSym
    );
    Kit.append(call, opId);
    const args = Kit.tok(Tag.arguments, Tag.Array, []);
    Kit.append(call, args);
    Kit.append(args, tempId(Tag.push, iterSym, curScope));
    Kit.append(args, Kit.memExpr(Tag.push, ctxSym, "value"));
    Kit.append(args, Kit.bool(Tag.push, delegate));
    pushAsync(async, newItem(null, call, curScope));
    return finBlock;
  }
  function varDeclToLhs(id) {
    let j = id;
    do {
      if (j.type === Tag.Identifier && j.sym) {
        j.nextId = file.ids;
        file.ids = j;
      }
      j = next(j);
    } while (j !== id);
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

/**
 * computes following fields
 *  - `order`(items/blocks) - execution order disregarding loops (in items)
 *  - `effOrder`(items/blocks) - same as `order` but with effectful items count
 *  - `enters` (blocks) - number of enters in this block
 */
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
