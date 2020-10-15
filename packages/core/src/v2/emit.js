/**
 *  Resulting JS generation
 */
import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Cfg from "./cfg";
import config from "./config";
import * as Ctx from "./context";
import * as Meta from "./meta";
import { isValidIdentifier } from "@babel/types";

const { Tag } = Kit;

const { EXIT_BR, EXIT_COND, EXIT_SWITCH, EXIT_DYN_BR } = Cfg;

const locSetSym = Scope.sysSym("lset");

/** emits handler */
export function calcFrames(root) {
  const { ctxSym, patSym } = Ctx.root;
  const { errBlock, origFunc: func } = root;
  const end = root.cfgBlock;
  const beg = end.nextBlock;
  let jobs = null;
  let stateNum = 0;
  const lastFrame = {};
  const { flags } = func;
  lastFrame.prevFrame = null;
  lastFrame.block = null;
  let prevFrame = lastFrame;
  prevFrame.prevFrame = prevFrame.nextFrame = prevFrame;
  const combineFrames = config.blackbox && config.optimizeFrames;
  const pureSym =
    Scope.pureSyms[flags & Scope.ASYNC_OR_GENERATOR_FUNCTION_FLAG];
  prevFrame.consequent = Kit.throwStmt(
    Kit.arr(Tag.consequent),
    "Invalid state",
    "Error"
  );
  beg.nextJob = null;
  let consequent;
  let block = beg;
  let frame = null;
  const resFrame = newFrame((consequent = Kit.arr(Tag.consequent)));
  const funcLoc = (func.block || func).node.loc;
  const assignTemp = config.expInjectTempSetters ? assignTempOp : assignTempDir;
  let endFuncLoc = funcLoc && { start: funcLoc.end, end: funcLoc.end };
  frame = root.resFrame = resFrame;
  injectSysCall(pureSym, Kit.memExpr(Tag.left, ctxSym, "result"));
  end.frame = resFrame;
  initTop();
  const trampoline = config.inlineTrampolineLoop;
  const tagContinue = trampoline ? Tag.ContinueStatement : Tag.ReturnStatement;
  const errFrame = (errBlock.frame = frame = newFrame(
    (consequent = Kit.arr(Tag.consequent))
  ));
  let commonErrDynFrame = null;
  Kit.assignStmt(
    consequent,
    Kit.memExpr(Tag.left, ctxSym, "goto"),
    frameRef(Tag.right, resFrame)
  );
  initTop();
  errFrame.block = errBlock;
  root.errFrame = errFrame;
  root.errFrame = errFrame;
  injectSysCall(
    Scope.unhandledSyms[flags & Scope.ASYNC_OR_GENERATOR_FUNCTION_FLAG],
    Kit.memExpr(Tag.left, ctxSym, "error")
  );
  initTop();
  frame = beg.frame = newFrame((consequent = Kit.arr(Tag.consequent)));
  beg.consequent = consequent;
  consequent.noSkip = false;
  /* ensuring the last frame isn't inlined */
  ++end.enters;
  root.finalizers.forEach(pushFrame);
  root.handlers.forEach(pushFrame);
  beg.nextJob = jobs;
  jobs = beg;

  while (jobs) {
    block = jobs;
    jobs = block.nextJob;
    consequent = block.consequent;
    frame = block.frame;
    if (block === end) continue;
    const { exitKind, br } = block;
    let i = block.nextItem;
    let rhs, lhs, sym, eff;
    let nextFrame, nextConsequent, lastEffBr;
    for (let n, last = i === block; !last; i = n) {
      n = i.nextItem;
      last = n === block;
      rhs = i.doc;
      if (!rhs) continue;
      nextFrame = nextConsequent = null;
      eff = i.eff;
      sym = i.sym;
      lhs = sym && sym.bound && sym.varSym;
      if (eff) {
        frame.doc = rhs;
        let ref = null;
        if (last && exitKind === EXIT_BR && !lhs) {
          lhs = null;
          nextFrame = br.frame;
          if (!nextFrame) {
            nextFrame = br.frame = newFrame(
              (nextConsequent = br.consequent = Kit.arr(Tag.consequent))
            );
            nextFrame.block = br;
            br.nextJob = jobs;
            jobs = br;
          }
          if (block.unwind) nextFrame = unwind(br).frame;
          Kit.assignStmt(
            consequent,
            Kit.memExpr(Tag.left, ctxSym, "goto"),
            (ref = frameRef(Tag.right, nextFrame))
          );
          lastEffBr = i;
        } else {
          nextFrame = newFrame((nextConsequent = Kit.arr(Tag.consequent)));
          Kit.assignStmt(
            consequent,
            Kit.memExpr(Tag.left, ctxSym, "goto"),
            (ref = frameRef(Tag.right, nextFrame))
          );
        }
        if (i.result) {
          (frame.nextEffExit = (ref.nextEffExit =
            frame.nextEffExit).prevEffExit = ref).prevEffExit = frame;
          const stmt = Kit.node(Tag.push, Tag.ReturnStatement);
          rhs.pos = Tag.argument;
          Kit.append(stmt, rhs);
          Kit.append(consequent, stmt);
          Kit.copyMeta(rhs, stmt);
        } else {
          (frame.nextEffSkipExit = (ref.nextEffSkipExit =
            frame.nextEffSkipExit).prevEffSkipExit = ref).prevEffSkipExit = frame;
          if (lhs && trampoline)
            Kit.assignStmt(consequent, Kit.id(Tag.left, patSym), rhs);
          else Kit.exprStmt(consequent, rhs);
        }
        if (lhs === patSym) lhs = null;
        rhs = lhs ? Kit.id(Tag.right, patSym) : null;
        if (!i.result && !i.stmt)
          Kit.append(
            consequent,
            (ref.continueStmt = Kit.node(Tag.push, tagContinue))
          );
        consequent = nextConsequent;
        frame = nextFrame;
      }
      if (!last || exitKind === EXIT_BR) {
        if (rhs) {
          if (lhs) {
            assignTemp(consequent, lhs, i.scope, rhs);
          } else {
            Kit.exprStmt(consequent, rhs);
          }
          rhs = null;
        }
        lhs = null;
      }
    }
    frame.exitKind = exitKind;
    switch (exitKind) {
      case EXIT_BR: {
        if (lastEffBr) break;
        jumpDirect(block.unwind ? unwind(br) : br, true);
        break;
      }
      case EXIT_COND: {
        const branch = Kit.node(Tag.push, Tag.IfStatement);
        rhs.pos = Tag.test;
        Kit.append(branch, rhs);
        Kit.append(consequent, branch);
        consequent = Kit.appendBlock(Tag.consequent, branch);
        jumpDirect(block.trueBr, combineFrames);
        consequent = Kit.appendBlock(Tag.alternate, branch);
        jumpDirect(block.falseBr, combineFrames);
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
          let test = i.caseTest;
          if (test) {
            test = test.replaceTo || test;
            Kit.insertBefore(consequent, test);
          }
          Kit.append(cases, switchCase);
          consequent.noSkip = true;
          jumpDirect(i, combineFrames);
        }
        Kit.append(branch, cases);
        break;
      }
      case EXIT_DYN_BR: {
        const { ibr, errCopy } = block;
        Kit.assignStmt(
          consequent,
          Kit.memExpr(Tag.left, ctxSym, "goto"),
          Scope.idExpr(Tag.right, ibr, block.scope)
        );
        (frame.nextDynExit = (block.nextDynExit =
          frame.nextDynExit).prevDynExit = block).prevDynExit = frame;
        Kit.append(consequent, Kit.node(Tag.push, tagContinue));
        if (errCopy || !commonErrDynFrame) {
          block.errDynFrame = newFrame((consequent = Kit.arr(Tag.consequent)));
          injectSysCall(
            Scope.raiseSym,
            errCopy
              ? Scope.idExpr(Tag.right, errCopy, block.scope)
              : Kit.memExpr(Tag.left, ctxSym, "error")
          );
        } else block.errDynFrame = commonErrDynFrame;
        break;
      }
    }
  }
  for (const i of root.finalizers) i.frame.finalizerStart = i;
  for (const i of root.handlers) i.frame.handlerStart = i;
  root.lastFrame = lastFrame;
  root.firstFrame = beg.frame;
  return root;

  function injectSysCall(sym, arg) {
    const call = Kit.node(Tag.argument, Tag.CallExpression);
    const args = Kit.arr(Tag.arguments);
    if (arg) {
      arg.pos = Tag.push;
      Kit.append(args, arg);
    }
    Kit.append(call, args);
    Kit.insertBefore(args, Scope.sysId(Tag.callee, sym));
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
    frame.tryInline = true;
    frame.doc = null;
    frame.handlerStart = null;
    frame.finalizerStart = null;
    frame.nextEnter = frame.prevEnter = frame;
    frame.nextDynExit = frame.prevDynExit = frame;
    frame.nextEffExit = frame.prevEffExit = frame;
    frame.nextEffSkipExit = frame.prevEffSkipExit = frame;
    frame.nextPureExit = frame.prevPureExit = frame;
    frame.brkFlags = 0;
    frame.exitKind = EXIT_BR;
    return frame;
  }
  function initTop() {
    consequent.firstChild.node.loc = endFuncLoc;
    consequent.firstChild.brkFlags = Scope.EXIT_BRK_FLAG;
    consequent.firstChild.parentBlock = func.block;
    consequent.firstChild.parentFunc = func;
  }
  function pushFrame(block) {
    let frame = block.frame;
    if (!frame) {
      const nextConsequent = (block.consequent = Kit.arr(Tag.consequent));
      block.frame = frame = newFrame(nextConsequent);
      frame.block = block;
      block.nextJob = jobs;
      jobs = block;
    }
    return frame;
  }
  function jumpDirect(br, combine) {
    let nextFrame = br.frame;
    if (!nextFrame) {
      br.nextJob = jobs;
      jobs = br;
      if (
        combine &&
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
      nextFrame = newFrame(nextConsequent);
      nextFrame.block = br;
      br.frame = nextFrame;
      br.consequent = nextConsequent;
    }
    let ref;
    Kit.assignStmt(
      consequent,
      Kit.memExpr(Tag.left, ctxSym, "goto"),
      (ref = frameRef(Tag.right, nextFrame))
    );
    (frame.prevPureExit = (ref.prevPureExit =
      frame.prevPureExit).nextPureExit = ref).nextPureExit = frame;
    Kit.append(
      consequent,
      (ref.continueStmt = Kit.node(Tag.push, tagContinue))
    );
    ref.noSkip = consequent.noSkip;
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
        const { tail } = j;
        const ref = frameRef(Tag.right, pushFrame(last ? br : n));
        (tail.nextInstance = (ref.nextInstance =
          tail.nextInstance).prevInstance = ref).prevInstance = tail;
        assignTemp(consequent, tail.ibr, block.scope, ref);
      }
      return from;
    }
    return br;
  }
}

function assignTempOp(consequent, sym, scope, rhs) {
  const call = Kit.node(Tag.push, Tag.CallExpression);
  Kit.append(call, Scope.sysId(Tag.callee, locSetSym));
  const args = Kit.append(call, Kit.arr(Tag.arguments));
  Kit.append(args, Scope.scopeExpr(Tag.push, scope, sym));
  Kit.append(args, Kit.num(Tag.push, sym.index));
  rhs.pos = Tag.push;
  Kit.append(args, rhs);
  Kit.exprStmt(consequent, call);
}

function assignTempDir(consequent, sym, scope, rhs) {
  Kit.assignStmt(consequent, Scope.idExpr(Tag.left, sym, scope), rhs);
}

function handler(root) {
  const { lastFrame } = root;
  const { ctxSym, patSym, localsSym } = Ctx.root;
  const sw = Kit.node(Tag.body, Tag.SwitchStatement);
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
  const func = Kit.node(Tag.push, Tag.FunctionExpression);
  const idSym = root.origFunc.idSym;
  if (idSym && !idSym.anonymous) {
    let name = idSym.orig;
    if (root.origFunc.type === Tag.File)
      name = name.replace(/(?:^\d)|\W/g, "_");
    if (!isValidIdentifier(name)) name = "_" + name;
    Kit.append(func, Kit.tok(Tag.id, Tag.Identifier, { name }));
  }
  const params = Kit.append(func, Kit.arr(Tag.params));
  Kit.append(params, Kit.id(Tag.push, ctxSym));
  Kit.append(params, Kit.id(Tag.push, localsSym));
  Kit.append(params, Kit.id(Tag.push, patSym));
  const funcBody = Kit.appendBlock(Tag.body, func);
  const { locBindSyms } = root;
  const firstLocVar = locBindSyms.prevPat;
  if (firstLocVar !== locBindSyms) {
    const varDecl = Kit.append(funcBody, Kit.varDecl());
    const decls = Kit.append(varDecl, Kit.arr(Tag.declarations));
    for (let i = firstLocVar; i !== locBindSyms; i = i.prevPat) {
      const decl = Kit.node(Tag.push, Tag.VariableDeclarator);
      Kit.append(decl, Kit.id(Tag.id, i));
      Kit.append(decls, decl);
    }
  }
  if (config.inlineTrampolineLoop) {
    const loop = Kit.node(Tag.push, Tag.ForStatement);
    Kit.append(funcBody, loop);
    Kit.append(loop, sw);
  } else {
    sw.pos = Tag.push;
    Kit.append(funcBody, sw);
  }
  return func;
}

function frameRef(pos, dst) {
  const ref = Kit.num(pos, dst.id);
  ref.dst = ref.prevEnter = dst;
  dst.nextEnter = (ref.nextEnter = dst.nextEnter).prevEnter = ref;
  ref.continueStmt = ref.src = null;
  ref.noSkip = false;
  return ref;
}

function errHandler(root) {
  const { handlers, finalizers, errBlock } = root;
  if (!handlers.size && !finalizers.size)
    return Kit.node(Tag.push, Tag.NullLiteral);
  const ctxSym = Ctx.root.ctxSym;
  const { lastFrame, errFrame } = root;
  const assignTemp = config.expInjectTempSetters ? assignTempOp : assignTempDir;
  handlers.add(errBlock);
  const cases = Kit.arr(Tag.cases);
  let consequent = null;
  let byFinalizer = new Map();
  let byHandler = new Map();
  for (let i = lastFrame.prevFrame; i !== lastFrame; i = i.prevFrame) {
    const { block } = i;
    const { scope, finalizer, handler } = block;
    if ((!handler || handler === errBlock) && !finalizer) continue;
    let frames;
    if (!finalizer || handler.finalizer === finalizer) {
      frames = byHandler.get(handler);
      if (!frames) byHandler.set(handler, (frames = []));
    } else {
      let byScope = byFinalizer.get(finalizer);
      if (!byScope)
        byFinalizer.set(
          finalizer,
          (byScope = new Map([[scope, (frames = [])]]))
        );
      else {
        frames = byScope.get(scope);
        if (!frames) byScope.set(scope, (frames = []));
      }
    }
    frames.push(i);
  }
  for (const [finalizer, byScope] of byFinalizer) {
    for (const [scope, frames] of byScope) {
      frameCaseTests(frames);
      Kit.assignStmt(
        consequent,
        Kit.memExpr(Tag.left, ctxSym, "goto"),
        Kit.num(Tag.right, finalizer.frame.id)
      );
      const tail = finalizer.tail;
      assignTemp(
        consequent,
        tail.ibr,
        scope,
        Kit.num(Tag.right, (tail.errDynFrame || errFrame).id)
      );
      if (tail.errCopy)
        assignTemp(
          consequent,
          tail.errCopy,
          scope,
          Kit.memExpr(Tag.right, ctxSym, "error")
        );
      Kit.append(consequent, Kit.node(Tag.push, Tag.BreakStatement));
    }
  }
  for (const [handler, frames] of byHandler) {
    frameCaseTests(frames);
    Kit.assignStmt(
      consequent,
      Kit.memExpr(Tag.left, ctxSym, "goto"),
      Kit.num(Tag.right, handler.frame.id)
    );
    Kit.append(consequent, Kit.node(Tag.push, Tag.BreakStatement));
  }
  const switchCase = Kit.node(Tag.push, Tag.SwitchCase);
  consequent = Kit.append(switchCase, Kit.arr(Tag.consequent));
  Kit.assignStmt(
    consequent,
    Kit.memExpr(Tag.left, ctxSym, "goto"),
    Kit.num(Tag.right, errFrame.id)
  );
  Kit.append(cases, switchCase);
  return mapFunc(cases);

  function frameCaseTests(frames) {
    for (const frame of frames) {
      const switchCase = Kit.append(cases, Kit.node(Tag.push, Tag.SwitchCase));
      Kit.append(switchCase, Kit.num(Tag.test, frame.id));
      Kit.append(switchCase, (consequent = Kit.arr(Tag.consequent)));
    }
  }
}

function gotoUnwind(consequent, dst, from, till, scope, assignTemp) {
  let cont = dst;
  let i;
  const ctxSym = Ctx.root.ctxSym;
  if (from && (i = from.finalizer) !== till) {
    let n, last;
    cont = i.frame;
    do {
      n = i.finalizer;
      last = n === till;
      assignTemp(
        consequent,
        i.tail.ibr,
        scope,
        Kit.num(Tag.right, (last ? dst : n.frame).id)
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

function finHandler(root) {
  const { finalizers } = root;
  if (!finalizers.size) return Kit.node(Tag.push, Tag.NullLiteral);
  const { lastFrame } = root;
  const end = root.cfgBlock;
  const resFrame = end.frame;
  const assignTemp = config.expInjectTempSetters ? assignTempOp : assignTempDir;
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
  let consequent = null;
  for (const i of finalizers) {
    let j;
    if (i.finalizersMap.size) {
      for (j of i.finalizersMap) {
        const switchCase = Kit.append(
          cases,
          Kit.node(Tag.push, Tag.SwitchCase)
        );
        Kit.append(switchCase, Kit.num(Tag.test, j.id));
        Kit.append(switchCase, (consequent = Kit.arr(Tag.consequent)));
      }
      gotoUnwind(
        consequent,
        resFrame,
        j.block,
        null,
        j.block.scope,
        assignTemp
      );
    }
  }
  const switchCase = Kit.node(Tag.push, Tag.SwitchCase);
  Kit.append(cases, switchCase);
  Kit.append(switchCase, (consequent = Kit.arr(Tag.consequent)));
  gotoUnwind(consequent, resFrame, null, null, rootScope, assignTemp);
  return mapFunc(cases);
}

function mapFunc(cases) {
  const sw = Kit.node(Tag.push, Tag.SwitchStatement);
  Kit.append(sw, cases);
  const { ctxSym, localsSym } = Ctx.root;
  Kit.insertBefore(cases, Kit.memExpr(Tag.discriminant, ctxSym, "state"));
  const func = Kit.node(Tag.push, Tag.FunctionExpression);
  const params = Kit.arr(Tag.params);
  Kit.append(params, Kit.id(Tag.push, ctxSym));
  Kit.append(params, Kit.id(Tag.push, localsSym));
  Kit.append(func, params);
  const funcBody = Kit.appendBlock(Tag.body, func);
  Kit.append(funcBody, sw);
  return func;
}

export function constrs(decls) {
  const { nsSym } = Ctx.root;
  const paramsFirst = !config.expInlineCalls;
  let count = 0;
  for (let i = Ctx.root.firstChild; i; i = i.nextFunc) {
    const root = i.funcDef;
    const { metaSym } = root.origFunc;
    const { locBindSyms } = root;
    if (locBindSyms)
      for (let i = locBindSyms.prevPat; i !== locBindSyms; i = i.prevPat) {
        i.orig = String(i.index);
        Scope.ensureUnique(i);
      }
    Kit.setSymName(metaSym, count++, "m$");
    metaSym.orig = metaSym.name;
    Scope.ensureUnique(metaSym);
  }
  for (let i = Ctx.root.firstChild; i; i = i.nextFunc) {
    const root = i.funcDef;
    const constr = Kit.node(Tag.push, Tag.CallExpression);
    const args = Kit.arr(Tag.arguments);
    const func = root.origFunc;
    const { idSym, metaSym } = func;
    Kit.insertAfter(
      Kit.append(constr, Kit.memExpr(Tag.callee, nsSym, "fun")),
      args
    );
    Kit.append(args, Kit.str(Tag.push, metaSym.orig));
    Kit.append(
      args,
      idSym.anonymous
        ? Kit.node(Tag.push, Tag.NullLiteral)
        : Kit.str(Tag.push, idSym.orig)
    );
    Kit.append(
      args,
      idSym.scope === func && idSym.hasRead
        ? Kit.num(Tag.push, idSym.index)
        : Kit.node(Tag.push, Tag.NullLiteral)
    );
    Kit.append(
      args,
      func.parentFunc
        ? Kit.id(Tag.push, func.parentFunc.metaSym)
        : Kit.node(Tag.push, Tag.NullLiteral)
    );
    Kit.append(
      args,
      Kit.emitConst(
        Tag.push,
        [...func.params].map(i => i.orig)
      )
    );
    let locals = 0;
    const { locBindSyms } = root;
    if (locBindSyms) {
      const firstLocVar = locBindSyms.prevPat;
      for (let i = firstLocVar; i !== locBindSyms; i = i.prevPat) ++locals;
    }
    Kit.append(args, Kit.num(Tag.push, locals));
    const numVars =
      func.symScopePool.varCount + (paramsFirst ? 0 : func.params.size) + 1;
    Kit.append(args, Kit.num(Tag.push, numVars));
    Kit.append(args, Kit.emitConst(Tag.push, Kit.locStr(func.node.loc)));
    Kit.append(args, Kit.num(Tag.push, func.flags));
    Kit.append(args, handler(root));
    Kit.append(args, errHandler(root));
    Kit.append(args, finHandler(root));
    Kit.append(args, Kit.num(Tag.push, func.scopeDepth));
    Kit.append(args, Kit.emitConst(Tag.push, root.stateArgs));
    varDecl(decls, metaSym, constr);
  }
}

export function module() {
  const root = Ctx.root;
  const file = root.firstChild;
  const prog = Kit.append(file, Kit.node(Tag.program, Tag.Program));
  const { ctxSym, patSym, nsSym, modSym, localsSym } = root;
  Scope.ensureUnique(ctxSym);
  Scope.ensureUnique(patSym);
  Scope.ensureUnique(modSym);
  Scope.ensureUnique(localsSym);
  if (!config.ns) Scope.ensureUnique(nsSym);
  const block = Kit.append(prog, Kit.arr(Tag.body));
  const decls = Kit.arr(Tag.declarations);
  if (config.rt)
    Kit.append(
      Kit.insertAfter(
        Kit.append(
          Kit.insertAfter(
            Kit.append(
              Kit.append(decls, Kit.node(Tag.push, Tag.VariableDeclarator)),
              Kit.id(Tag.id, nsSym)
            ),
            Kit.node(Tag.init, Tag.CallExpression)
          ),
          Kit.id(Tag.callee, Scope.requireSym)
        ),
        Kit.arr(Tag.arguments)
      ),
      Kit.str(Tag.push, config.rt)
    );
  for (const i of Scope.sysSyms.values()) {
    if (!i.hasRead) continue;
    Scope.ensureUnique(i);
    Kit.insertAfter(
      Kit.append(
        Kit.append(decls, Kit.node(Tag.push, Tag.VariableDeclarator)),
        Kit.id(Tag.id, i)
      ),
      Kit.memExpr(Tag.init, nsSym, i.orig)
    );
  }
  const moduleCall = varDecl(
    decls,
    modSym,
    Kit.node(Tag.push, Tag.CallExpression)
  );
  const args = Kit.insertAfter(
    Kit.append(moduleCall, Kit.memExpr(Tag.callee, nsSym, "module")),
    Kit.arr(Tag.arguments)
  );
  Kit.append(args, Kit.str(Tag.push, config.relativeName));
  Kit.append(args, Kit.emitConst(Tag.push, config.evalContext));
  Kit.append(
    args,
    Kit.toks(Tag.push, `=typeof module === "undefined" ? null : module`)
  );
  Kit.append(
    args,
    config.staticBundler
      ? Kit.node(Tag.push, Tag.NullLiteral)
      : Kit.toks(Tag.push, `=typeof require === "undefined" ? null : require`)
  );
  Kit.append(args, Kit.str(Tag.push, root.safePrefix));
  Kit.append(
    args,
    Kit.toks(
      Tag.push,
      `=({${config.closureVars
        .map(name => `${name}:typeof ${name} !== "undefined" && ${name}`)
        .join()}})`
    )
  );
  Kit.append(args, Kit.emitConst(Tag.push, config.moduleParams));
  Meta.scopes(decls);
  constrs(decls);
  if (config.outFileDirective)
    Kit.exprStmt(block, Kit.str(Tag.expression, config.outFileDirective))
  if (decls.firstChild) Kit.append(Kit.append(block, Kit.varDecl()), decls);
  if (config.moduleExports)
    Kit.append(
      block,
      Kit.toks(
        Tag.push,
        `${config.iifeWrap ? "return " : ""}$I.${config.moduleExports}()`,
        nsSym
      )
    );
}

function varDecl(decls, sym, expr) {
  expr.pos = Tag.init;
  return Kit.insertAfter(
    Kit.append(
      Kit.append(decls, Kit.node(Tag.push, Tag.VariableDeclarator)),
      Kit.id(Tag.id, sym)
    ),
    expr
  );
}
