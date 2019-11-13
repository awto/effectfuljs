/**
 *  Resulting JS generation
 */

import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Cfg from "./cfg";
import config from "./config";
import * as Ctx from "./context";
import * as Meta from "./meta";

const { Tag } = Kit;

const { EXIT_BR, EXIT_COND, EXIT_SWITCH, EXIT_DYN_BR } = Cfg;

/** emits handler */
export function calcFrames(root) {
  const { ctxSym, patSym, pureSym } = root;
  const end = root.cfgBlock;
  const beg = end.nextBlock;
  // TODO: output var decls
  let jobs = null;
  let stateNum = 0;
  const lastFrame = {};
  lastFrame.prevFrame = null;
  lastFrame.block = null;
  let prevFrame = lastFrame;
  prevFrame.prevFrame = prevFrame.nextFrame = prevFrame;
  prevFrame.consequent = Kit.throwStmt(
    Kit.arr(Tag.consequent),
    "Invalid state",
    "Error"
  );
  beg.nextJob = null;
  let consequent = (beg.consequent = Kit.arr(Tag.consequent));
  consequent.noSkip = false;
  let block = beg;
  let frame = (beg.frame = newFrame(consequent));
  let needsResFrame = root.needsResFrame;
  // ensuring the last frame isn't inlined
  if (needsResFrame) ++end.enters;
  root.finalizers.forEach(pushFrame);
  root.handlers.forEach(pushFrame);
  beg.nextJob = jobs;
  jobs = beg;
  let resFrame = null;
  while (jobs) {
    block = jobs;
    jobs = block.nextJob;
    consequent = block.consequent;
    frame = block.frame;
    if (block === end) {
      if (needsResFrame) {
        resFrame = frame;
        injectPureCall(Kit.memExpr(Tag.left, ctxSym, "value"));
      }
      continue;
    }
    const { exitKind, br } = block;
    let i = block.nextItem;
    let rhs, lhs, varSym, sym, eff;
    let nextFrame, nextConsequent, lastEffBr;
    for (let n, last = i === block; !last; i = n) {
      n = i.nextItem;
      last = n === block;
      rhs = i.doc;
      if (!rhs) continue;
      nextFrame = nextConsequent = null;
      eff = i.eff;
      sym = i.sym;
      varSym = sym && sym.bound && sym.varSym;
      lhs = sym && Scope.idExpr(Tag.left, varSym, i.scope);
      if (eff) {
        frame.doc = rhs;
        if (last && exitKind === EXIT_BR && !lhs && br !== end) {
          lhs = null;
          nextFrame = br.frame;
          if (!nextFrame) {
            nextFrame = br.frame = newFrame(
              (nextConsequent = br.consequent = Kit.arr(Tag.consequent))
            );
            nextConsequent.noSkip = consequent.noSkip;
            nextFrame.block = br;
            br.nextJob = jobs;
            jobs = br;
          }
          if (block.unwind) nextFrame = unwind(br).frame;
          Kit.assignStmt(
            consequent,
            Kit.memExpr(Tag.left, ctxSym, "goto"),
            Kit.num(Tag.right, nextFrame.id)
          );
          lastEffBr = i;
        } else {
          nextFrame = newFrame((nextConsequent = Kit.arr(Tag.consequent)));
          nextConsequent.noSkip = consequent.noSkip;
          Kit.assignStmt(
            consequent,
            Kit.memExpr(Tag.left, ctxSym, "goto"),
            Kit.num(Tag.right, nextFrame.id)
          );
        }
        if (i.result) {
          const stmt = Kit.node(Tag.push, Tag.ReturnStatement);
          rhs.pos = Tag.argument;
          Kit.append(stmt, rhs);
          Kit.append(consequent, stmt);
        } else injectOp(lhs && Kit.id(Tag.left, patSym), rhs);
        if (varSym === patSym) lhs = null;
        rhs = lhs ? Kit.id(Tag.right, patSym) : null;
        if (!consequent.noSkip || nextFrame.id - frame.id !== 1)
          Kit.append(consequent, Kit.node(Tag.push, Tag.ContinueStatement));
        else
          Kit.assignStmt(
            consequent,
            Kit.memExpr(Tag.left, ctxSym, "state"),
            Kit.num(Tag.right, nextFrame.id)
          );
        consequent = nextConsequent;
        frame = nextFrame;
      }
      if (!last || (exitKind === EXIT_BR && br !== end)) {
        if (rhs) {
          injectOp(lhs, rhs);
          rhs = null;
        }
        lhs = null;
      }
    }
    switch (exitKind) {
      case EXIT_BR: {
        if (br === end) {
          if (block.finalizer || block.finalizerExit) {
            needsResFrame = true;
            if (rhs) injectOp(lhs, rhs);
          } else {
            if (!lhs) {
              if (rhs) {
                Kit.exprStmt(consequent, rhs);
                rhs = null;
              }
            }
            injectPureCall(rhs /* || Kit.id(Tag.push, Scope.undefinedSym)*/);
            break;
          }
        }
        if (lastEffBr) break;
        jumpDirect(block.unwind ? unwind(br) : br);
        break;
      }
      case EXIT_COND: {
        const branch = Kit.node(Tag.push, Tag.IfStatement);
        rhs.pos = Tag.test;
        Kit.append(branch, rhs);
        Kit.append(consequent, branch);
        consequent = Kit.appendBlock(Tag.consequent, branch);
        jumpDirect(block.trueBr);
        consequent = Kit.appendBlock(Tag.alternate, branch);
        jumpDirect(block.falseBr);
        break;
      }
      case EXIT_SWITCH: {
        const branch = Kit.node(Tag.push, Tag.SwitchStatement);
        rhs.pos = Tag.discriminant;
        Kit.append(branch, rhs);
        const cases = Kit.arr(Tag.cases);
        Kit.append(consequent, branch);
        for (const i of block.switchCases) {
          const switchCase = Kit.node(Tag.push, Tag.SwitchCase);
          consequent = Kit.arr(Tag.consequent);
          Kit.append(switchCase, consequent);
          const test = i.caseTest;
          if (test) Kit.insertBefore(consequent, test);
          Kit.append(cases, switchCase);
          consequent.noSkip = true;
          jumpDirect(i);
        }
        Kit.append(branch, cases);
        break;
      }
      case EXIT_DYN_BR: {
        const goto = block.ibr;
        Kit.assignStmt(
          consequent,
          Kit.memExpr(Tag.left, ctxSym, "goto"),
          Scope.idExpr(Tag.right, goto, block.scope)
        );
        Kit.append(consequent, Kit.node(Tag.push, Tag.ContinueStatement));
        break;
      }
    }
  }
  if (needsResFrame && !resFrame) {
    resFrame = frame = newFrame((consequent = Kit.arr(Tag.consequent)));
    injectPureCall(Kit.memExpr(Tag.left, ctxSym, "value"));
    end.frame = resFrame;
  }
  const errConsequent = Kit.arr(Tag.consequent);
  const errFrame = newFrame(errConsequent);
  errFrame.block = null;
  const raise = Kit.node(Tag.push, Tag.ThrowStatement);
  Kit.append(raise, Kit.memExpr(Tag.argument, ctxSym, "value"));
  Kit.append(errConsequent, raise);
  root.errFrame = errFrame;
  root.lastFrame = lastFrame;
  root.firstFrame = beg.frame;
  return root;

  function injectOp(lhs, rhs) {
    if (lhs) {
      // if (rhs.type !== Tag.Identifier || rhs.sym !== lhs.sym)
      Kit.assignStmt(consequent, lhs, rhs);
    } else Kit.exprStmt(consequent, rhs);
  }
  function injectPureCall(res) {
    const call = Kit.node(Tag.argument, Tag.CallExpression);
    const args = Kit.arr(Tag.arguments);
    if (res) {
      res.pos = Tag.push;
      Kit.append(args, res);
    }
    Kit.append(call, args);
    Kit.insertBefore(args, Scope.sysId(Tag.callee, pureSym));
    Kit.append(
      Kit.append(consequent, Kit.node(Tag.push, Tag.ReturnStatement)),
      call
    );
  }
  function newFrame(consequent) {
    const frame = { nextFrame: lastFrame, prevFrame };
    prevFrame = prevFrame.nextFrame = lastFrame.prevFrame = frame;
    frame.consequent = consequent;
    frame.block = block;
    frame.id = stateNum++;
    frame.doc = null;
    return frame;
  }
  function pushFrame(block) {
    let frame = block.frame;
    if (!frame) {
      const nextConsequent = (block.consequent = Kit.arr(Tag.consequent));
      block.frame = frame = newFrame(nextConsequent);
      nextConsequent.noSkip = consequent.noSkip;
      frame.block = block;
      block.nextJob = jobs;
      jobs = block;
    }
    return frame;
  }
  function jumpDirect(br) {
    let nextFrame = br.frame;
    if (!nextFrame) {
      br.nextJob = jobs;
      jobs = br;
      if (
        (br.enters === 1 || (!consequent.parent && !consequent.firstChild)) &&
        br.finalizer === block.finalizer &&
        br.handler === block.handler &&
        br.scope === block.scope
      ) {
        br.frame = frame;
        br.consequent = consequent;
        return;
      }
      const nextConsequent = Kit.arr(Tag.consequent);
      nextConsequent.noSkip = consequent.noSkip;
      nextFrame = newFrame(nextConsequent);
      nextFrame.block = br;
      br.frame = nextFrame;
      br.consequent = nextConsequent;
    }
    if (consequent.noSkip || nextFrame.id - frame.id !== 1) {
      Kit.assignStmt(
        consequent,
        Kit.memExpr(Tag.left, ctxSym, "goto"),
        Kit.num(Tag.right, nextFrame.id)
      );
      Kit.append(consequent, Kit.node(Tag.push, Tag.ContinueStatement));
    } else {
      Kit.assignStmt(
        consequent,
        Kit.memExpr(Tag.left, ctxSym, "state"),
        Kit.num(Tag.right, nextFrame.id)
      );
    }
  }

  function unwind(br) {
    let from, till;
    if (
      (from = block.finalizer) &&
      (!(till = br.finalizer) || from.level > till.level)
    ) {
      pushFrame(from);
      for (let j = from, n, last = false; !last; j = n) {
        n = j.finalizer;
        last = n === till;
        const fid = pushFrame(last ? br : n).id;
        Kit.assignStmt(
          consequent,
          Scope.idExpr(Tag.left, j.tail.ibr, block.scope),
          Kit.num(Tag.right, fid)
        );
      }
      return from;
    }
    return br;
  }
}

export function handler(root) {
  const { lastFrame, ctxSym } = root;
  const sw = Kit.node(Tag.push, Tag.SwitchStatement);
  const cases = Kit.arr(Tag.cases);
  let switchCase = Kit.node(Tag.push, Tag.SwitchCase);
  Kit.append(switchCase, lastFrame.consequent);
  Kit.append(cases, switchCase);
  for (let i = lastFrame.prevFrame; i !== lastFrame; i = i.prevFrame) {
    switchCase = Kit.insertBefore(
      switchCase,
      Kit.node(Tag.push, Tag.SwitchCase)
    );
    Kit.append(switchCase, i.consequent);
    Kit.insertBefore(i.consequent, Kit.num(Tag.test, i.id));
  }
  const discrim = Kit.assign(Tag.discriminant);
  Kit.append(sw, cases);
  Kit.insertBefore(cases, discrim);
  Kit.insertBefore(
    Kit.append(discrim, Kit.memExpr(Tag.right, ctxSym, "goto")),
    Kit.memExpr(Tag.left, ctxSym, "state")
  );
  const { locBindSyms } = root;
  const func = Kit.node(Tag.push, Tag.FunctionExpression);
  Kit.append(func, Kit.arr(Tag.params));
  const funcBody = Kit.appendBlock(Tag.body, func);
  const loop = Kit.node(Tag.push, Tag.ForStatement);
  const firstLocVar = locBindSyms.prevPat;
  if (firstLocVar !== locBindSyms) {
    const varDecl = Kit.tok(Tag.push, Tag.VariableDeclaration, {
      kind: "var"
    });
    const decls = Kit.arr(Tag.declarations);
    for (let i = firstLocVar; i !== locBindSyms; i = i.prevPat) {
      const decl = Kit.node(Tag.push, Tag.VariableDeclarator);
      Kit.append(decl, Kit.id(Tag.id, i));
      Kit.append(decls, decl);
    }
    Kit.append(varDecl, decls);
    Kit.append(funcBody, varDecl);
  }
  Kit.append(funcBody, loop);
  const loopBlock = Kit.appendBlock(Tag.body, loop);
  Kit.append(loopBlock, sw);
  return func;
}

export function errHandler(root) {
  const { handlers } = root;
  if (!handlers.size) return Kit.node(Tag.push, Tag.NullLiteral);
  const { lastFrame, ctxSym, errFrame } = root;
  const rootScope = root.origFunc;
  const errBlock = Cfg.emptyBlock();
  errBlock.frame = errFrame;
  handlers.add(errBlock);
  for (const i of handlers) i.handlersMap = new Map();
  for (let i = lastFrame.prevFrame; i !== lastFrame; i = i.prevFrame) {
    const { block } = i;
    if (!block) continue;
    const { scope, finalizer, handler } = block;
    if (!handler && !finalizer) continue;
    const rootHandler = handler || errBlock;
    const byScope = rootHandler.handlersMap;
    let byFinalizer = byScope.get(scope);
    if (!byFinalizer) byScope.set(scope, (byFinalizer = new Map()));
    let frames = byFinalizer.get(finalizer);
    if (!frames) byFinalizer.set(finalizer, (frames = new Set()));
    frames.add(i);
  }
  const cases = Kit.arr(Tag.cases);
  let switchCase = Kit.node(Tag.push, Tag.SwitchCase);
  Kit.append(switchCase, gotoUnwind(errFrame, null, null, rootScope, ctxSym));
  Kit.append(cases, switchCase);
  for (const i of handlers) {
    const byScope = i.handlersMap;
    for (let [scope, byFinalizer] of byScope) {
      for (const frames of byFinalizer.values()) {
        let first = true;
        for (const j of frames) {
          switchCase = Kit.insertBefore(
            switchCase,
            Kit.node(Tag.push, Tag.SwitchCase)
          );
          Kit.append(switchCase, Kit.num(Tag.test, j.id));
          if (first) {
            Kit.append(
              switchCase,
              gotoUnwind(i.frame, j.block, i.finalizer, scope, ctxSym)
            );
            first = false;
          } else {
            Kit.append(switchCase, Kit.arr(Tag.consequent));
          }
        }
      }
    }
  }
  return mapFunc(cases, root);
}

function gotoUnwind(dst, from, till, scope, ctxSym) {
  const consequent = Kit.arr(Tag.consequent);
  let cont = dst;
  let i;
  if (from && (i = from.finalizer) !== till) {
    let n, last;
    cont = i.frame;
    do {
      n = i.finalizer;
      last = n === till;
      Kit.assignStmt(
        consequent,
        Scope.idExpr(Tag.left, i.tail.ibr, scope),
        Kit.num(Tag.right, last ? dst.id : n.frame.id)
      );
      i = n;
    } while (!last);
  }
  Kit.assignStmt(
    consequent,
    Kit.memExpr(Tag.left, ctxSym, "goto"),
    Kit.num(Tag.right, cont.id)
  );
  Kit.append(consequent, Kit.node(Tag.push, Tag.BreakStatement));
  return consequent;
}

export function finHandler(root) {
  const { finalizers } = root;
  if (!finalizers.size) return Kit.node(Tag.push, Tag.NullLiteral);
  const { lastFrame, ctxSym } = root;
  const end = root.cfgBlock;
  const resFrame = end.frame;
  const rootScope = root.origFunc;
  finalizers.add(end);
  for (const i of finalizers) i.finalizersMap = new Set();
  for (let i = lastFrame.prevFrame; i !== lastFrame; i = i.prevFrame) {
    const { block } = i;
    if (!block) continue;
    const { finalizer } = block;
    if (!finalizer) continue;
    finalizer.finalizersMap.add(i);
  }
  const cases = Kit.arr(Tag.cases);
  let switchCase = Kit.node(Tag.push, Tag.SwitchCase);
  Kit.append(switchCase, gotoUnwind(resFrame, null, null, rootScope, ctxSym));
  Kit.append(cases, switchCase);
  for (const i of finalizers) {
    let first = true;
    for (let j of i.finalizersMap) {
      switchCase = Kit.insertBefore(
        switchCase,
        Kit.node(Tag.push, Tag.SwitchCase)
      );
      Kit.append(switchCase, Kit.num(Tag.test, j.id));
      if (first) {
        Kit.append(
          switchCase,
          gotoUnwind(resFrame, j.block, null, j.block.scope, ctxSym)
        );
        first = false;
      } else {
        Kit.append(switchCase, Kit.arr(Tag.consequent));
      }
    }
  }
  return mapFunc(cases, root);
}

function mapFunc(cases, root) {
  const sw = Kit.node(Tag.push, Tag.SwitchStatement);
  Kit.append(sw, cases);
  const { ctxSym } = root;
  Kit.insertBefore(cases, Kit.memExpr(Tag.discriminant, ctxSym, "state"));
  const func = Kit.node(Tag.push, Tag.FunctionExpression);
  const params = Kit.arr(Tag.params);
  Kit.append(params, Kit.id(Tag.push, ctxSym));
  Kit.append(func, params);
  const funcBody = Kit.appendBlock(Tag.body, func);
  Kit.append(funcBody, sw);
  return func;
}

export function constrs(block) {
  const file = Ctx.root;
  const metaOpSym = Scope.sysSym("fun");
  let count = 0;
  Scope.forEach(function(root) {
    Kit.setSymName(root.origFunc.metaSym, count++, "m$");
  });
  Scope.forEach(function(root) {
    const constr = Kit.node(Tag.push, Tag.CallExpression);
    const args = Kit.arr(Tag.arguments);
    const func = root.origFunc;
    Kit.insertAfter(
      Kit.append(constr, Scope.sysId(Tag.callee, metaOpSym)),
      args
    );
    const { idSym, metaSym } = func;
    Kit.append(args, Kit.str(Tag.push, metaSym.name));
    Kit.append(
      args,
      idSym.anonymous
        ? Kit.node(Tag.push, Tag.NullLiteral)
        : Kit.str(Tag.push, idSym.orig)
    );
    Kit.append(
      args,
      func.parentFunc
        ? Kit.str(Tag.push, func.parentFunc.metaSym.name)
        : Kit.node(Tag.push, Tag.NullLiteral)
    );
    Kit.append(
      args,
      Kit.emitConst(
        Tag.push,
        [...func.params].map(i => i.orig)
      )
    );
    Kit.append(args, Kit.num(Tag.push, root.flags));
    Kit.append(args, handler(root));
    Kit.append(args, errHandler(root));
    Kit.append(args, finHandler(root));
    Kit.append(args, Kit.emitConst(Tag.push, root.stateArgs));
    Kit.exprStmt(block, constr);
  }, file);
}

export function module() {
  const root = Ctx.root;
  const file = root.firstChild;
  const prog = Kit.append(file, Kit.node(Tag.program, Tag.Program));
  const moduleSym = Scope.sysSym("module");
  const { ctxSym, patSym, nsSym, closSym } = root;
  Scope.ensureUnique(ctxSym);
  Scope.ensureUnique(patSym);
  Scope.ensureUnique(closSym);
  if (!config.ns) Scope.ensureUnique(nsSym);
  const block = Kit.append(prog, Kit.arr(Tag.body));
  if (config.rt)
    Kit.append(
      block,
      Kit.toks(Tag.push, `var $I = require("${config.rt}")`, nsSym)
    );
  const moduleCall = Kit.exprStmt(
    block,
    Kit.node(Tag.push, Tag.CallExpression)
  );
  const args = Kit.insertAfter(
    Kit.append(moduleCall, Scope.sysId(Tag.callee, moduleSym)),
    Kit.arr(Tag.arguments)
  );
  Kit.append(args, Kit.str(Tag.push, file.relativeName));
  Kit.append(args, Kit.emitConst(Tag.push, config.evalContext));
  Kit.append(args, Kit.tok(Tag.push, Tag.Identifier, { name: "module" }));
  Kit.append(
    args,
    config.staticBundler
      ? Kit.node(Tag.push, Tag.NullLiteral)
      : Kit.tok(Tag.push, Tag.Identifier, { name: "require" })
  );
  Kit.append(args, Kit.str(Tag.push, root.safePrefix));
  const decls = Kit.arr(Tag.declarations);
  const declStmt = Kit.tok(Tag.push, Tag.VariableDeclaration, {
    kind: "var"
  });
  Meta.scopes(decls);
  if (decls.firstChild) {
    Kit.append(declStmt, decls);
    Kit.append(block, declStmt);
  }
  constrs(block);
  Kit.append(
    block,
    Kit.toks(Tag.push, ` module.exports = $I.exports()`, nsSym)
  );
}
