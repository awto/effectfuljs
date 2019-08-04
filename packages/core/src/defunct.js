import * as Kit from "./kit";
import { Tag, invariant } from "./kit";
import * as Block from "./block";
import * as Ctrl from "./control";
import * as Except from "./exceptions";

const reentryCont = 3;

export const pureFrameSym = Kit.scope.newSym("pure");
pureFrameSym.numConst = 0;

/** initialize variables needed for next passes before `prepare` */
export function init(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  root.implFrame = Kit.enter(Tag.push, Block.frame, {
    declSym: Kit.scope.newSym("_"),
    patSym: (root.commonPatSym = Kit.scope.newSym("p")),
    savedDecls: new Map(),
    root
  });
  return s;
}

/** prepares vars for storing current state and bind */
export function* prepare(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const contSym =
    root.contSym ||
    (s.opts.storeCont &&
      s.opts.contextMethodOps &&
      (root.contSym = Kit.sysId(s.opts.storeCont)));
  if (!contSym && s.opts.defunctStateDiscriminant !== "arg")
    throw s.error(
      "`defunct:true` requires stored control state" +
        ' or `defunctStateDiscriminant:"arg"`'
    );
  if (!root.contextSym) throw s.error("`defunct:true` requires context object");
  const errMap = (root.errMap = !s.opts.storeErrorCont && new Map());
  const resMap = (root.resMap = !s.opts.storeResultCont && new Map());
  const errFrame = root.errFrameRedir;
  const resFrame = root.resFrameRedir;
  let num = 3;
  if (s.opts.bindName === "chain") {
    num++;
  }
  // needs already running check
  if (!s.opts.loose) num++;
  let hasYldStar = false;
  yield* s.till(i => i.type === Block.frame && i.leave);
  for (const i of s) {
    if (i.enter) {
      if (i.type === Block.frame) {
        i.value.stateId = i.value.declSym.numConst =
          i.value === resFrame ? 0 : i.value === errFrame ? 1 : num++;
        if (errMap) {
          const catchCont = i.value.catchContRedir;
          if (catchCont && catchCont !== errFrame) {
            let frames = errMap.get(catchCont);
            if (!frames) errMap.set(catchCont, (frames = []));
            frames.push(i.value);
          }
        }
        if (resMap) {
          const resCont = i.value.resultContRedir;
          if (resCont && resCont !== resFrame) {
            let frames = resMap.get(resCont);
            if (!frames) resMap.set(resCont, (frames = []));
            frames.push(i.value);
          }
        }
      } else if (i.type === Block.letStmt && i.value.bindName === "yldStar") {
        hasYldStar = true;
      }
    }
    yield i;
  }
  root.hasYldStar = hasYldStar;
}

/** sets handlers ($run,$err,$res) to context if needed */
export function assignHandlers(si) {
  const s = Kit.auto(si);
  if (s.opts.defunctHandlerInProto && s.opts.topLevel) {
    if (!s.opts.wrapFunction && !s.opts.closConv)
      throw s.error(
        "`defunctHandlerInProto` requires `wrapFunction` or `closConv`"
      );
    return s;
  }
  const root = s.first.value;
  const closureCtx = s.opts.contextBy === "closure";
  return _assignHandlers();
  function* _assignHandlers() {
    yield* s.till(i => i.type === Block.frame);
    if (!closureCtx) {
      yield* s.toks(
        Tag.push,
        `$I = $I`,
        root.handlerSym,
        root.implFrame.value.declSym
      );
    }
    if (!s.opts.defunctHandlerInProto) {
      if (root.errMapSym && root.errHandlerSym)
        yield* s.toks(Tag.push, `$I = $I`, root.errHandlerSym, root.errMapSym);
      if (root.resMapSym && root.resHandlerSym)
        yield* s.toks(Tag.push, `$I = $I`, root.resHandlerSym, root.resMapSym);
    }
    yield* s;
  }
}

export function stateMappings(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const module = root.module;
  if (!root.errMap && !root.resMap) return s;
  return _stateMappings();
  function* _stateMappings() {
    for (const i of s) {
      yield i;
      if (i.type === Block.frame && i.leave) break;
    }
    if (root.errMap) root.errMapSym = yield* genMap(root.errMap, "err", 1);
    if (root.resMap) root.resMapSym = yield* genMap(root.resMap, "fin", 0);
    yield* s;
  }
  function* genMap(map, name, defaultValue) {
    if (!map.size) return null;
    const lab = s.label();
    const sym = Kit.scope.newSym(`${root.rootName}_${name}`);
    yield s.enter(Tag.push, Tag.FunctionDeclaration, { moveToTop: true });
    module.hasTop = true;
    yield s.tok(Tag.id, Tag.Identifier, { sym });
    const paramSym = Kit.scope.newSym("s");
    yield s.enter(Tag.params, Tag.Array);
    yield s.tok(Tag.push, Tag.Identifier, { sym: paramSym });
    yield* s.leave();
    yield s.enter(Tag.body, Tag.BlockStatement);
    yield s.enter(Tag.body, Tag.Array);
    yield s.enter(Tag.push, Tag.SwitchStatement);
    yield s.tok(Tag.discriminant, Tag.Identifier, { sym: paramSym });
    yield s.enter(Tag.cases, Tag.Array);
    const clab = s.label();
    for (const [goto, i] of map) {
      const last = i[i.length - 1];
      for (const j of i) {
        yield s.enter(Tag.push, Tag.SwitchCase);
        yield s.tok(Tag.test, Tag.NumericLiteral, {
          node: { value: j.stateId }
        });
        yield s.enter(Tag.consequent, Tag.Array);
        if (j === last) {
          yield s.enter(Tag.push, Tag.ReturnStatement);
          yield s.tok(Tag.argument, Tag.Identifier, { sym: goto.declSym });
        }
        yield* clab();
      }
    }
    yield s.enter(Tag.push, Tag.SwitchCase);
    yield s.enter(Tag.consequent, Tag.Array);
    yield s.enter(Tag.push, Tag.ReturnStatement);
    yield s.tok(Tag.argument, Tag.NumericLiteral, {
      node: { value: defaultValue }
    });
    yield* lab();
    return sym;
  }
}

/**
 * handles `inlineJsExceptions` option for defunct frames
 */
export function inlineExceptions(si) {
  const s = Kit.auto(si);
  if (!s.opts.inlineJsExceptions) return s;
  const root = s.first.value;
  const errMap = root.errMap;
  if (
    !errMap.size &&
    (!s.opts.keepLastRaise || s.opts.inlineRaiseOp === "promise")
  )
    return s;
  if (s.opts.inlinePureJumps !== "tail")
    throw s.error(
      "inlineJsExceptions && defunct requires inlinePureJumps:'tail'"
    );
  // assigned in another pass
  if (!s.opts.keepLastRaise)
    throw s.error("inlineJsExceptions && defunct requires keepLastPure:'tail'");
  if (
    !s.opts.storeCont &&
    !s.opts.storeErrorCont &&
    !root.errMapSym &&
    s.opts.inlineRaiseOp !== "promise"
  )
    return s;
  const { contSym, errContSym, commonPatSym } = root;
  const implFrame = root.implFrame.value;
  const { discrimSym } = implFrame;
  const stateSym = contSym || discrimSym;
  invariant((contSym || discrimSym) && commonPatSym);
  const errFrame = root.errFrameRedir;
  return walk();
  function* walk() {
    for (const i of s) {
      yield i;
      if (i.enter && i.value === implFrame) break;
    }
    if (s.opts.inlineReentryCheck)
      yield* s.toks(
        Tag.push,
        `if ($I === ${reentryCont}) $I()`,
        stateSym,
        Block.alreadyRunningSym
      );
    yield s.enter(Tag.push, Tag.TryStatement);
    const tlab = s.label();
    yield s.enter(Tag.block, Tag.BlockStatement);
    yield s.enter(Tag.body, Tag.Array);
    yield* s.sub();
    yield* tlab();
    yield s.enter(Tag.handler, Tag.CatchClause);
    const ex = Kit.scope.newSym("ex");
    yield s.tok(Tag.param, Tag.Identifier, { sym: ex });
    yield s.enter(Tag.body, Tag.BlockStatement);
    yield s.enter(Tag.body, Tag.Array);
    if (s.opts.inlineRaiseOp === "promise") {
      if (s.opts.storeErrorCont) {
        yield* s.toks(
          Tag.push,
          `=$I = $I, $I = $I`,
          stateSym,
          errContSym,
          commonPatSym,
          ex
        );
      } else if (root.errMapSym) {
        yield* s.toks(
          Tag.push,
          `=$I = $I, $I = $I($I)`,
          commonPatSym,
          ex,
          stateSym,
          root.errMapSym,
          discrimSym || contSym
        );
      }
    } else {
      if (s.opts.storeErrorCont || root.errMapSym) {
        yield s.enter(Tag.push, Tag.IfStatement);
        if (s.opts.storeErrorCont) {
          yield* s.toks(
            Tag.test,
            `=($I = $I, $I = $I) !== $I`,
            commonPatSym,
            ex,
            stateSym,
            errContSym,
            errFrame.declSym
          );
        } else if (root.errMapSym) {
          yield* s.toks(
            Tag.test,
            `=($I = $I, $I = $I($I)) !== $I`,
            commonPatSym,
            ex,
            stateSym,
            root.errMapSym,
            implFrame.discrimSym || contSym,
            errFrame.declSym
          );
        }
        yield s.tok(Tag.consequent, Tag.ContinueStatement);
        yield* s.leave();
      }
      yield s.enter(Tag.push, Block.app, { sym: Except.raiseId, result: true });
      yield s.tok(Tag.push, Tag.Identifier, { sym: ex });
    }
    implFrame.hasJumps = true;
    yield* tlab();
    yield* s.leave();
    yield* s;
  }
}

/** some `continue` can be omitted if the switch goes to goto */
export function calcPassThrough(si) {
  const sa = Kit.toArray(si);
  const s = Kit.auto(sa);
  if (s.opts.inlinePureJumps !== "tail") return s;
  _calcPassThrough();
  return sa;
  function _getLast(res, sw) {
    for (const i of sw) {
      if (i.enter) {
        switch (i.type) {
          case Block.letStmt:
          case Ctrl.jump:
            if (i.value.goto) {
              res.push(i.value);
              if (!i.leave) Kit.skip(s.sub());
            } else res.length = 0;
            break;
          case Tag.IfStatement:
            res.length = 0;
            Kit.skip(s.one());
            const tls = [];
            _getLast(tls, s.one());
            const els = [];
            _getLast(els, s.one());
            if (tls.length && els.length) res.push(...tls, ...els);
            else res.length = 0;
            break;
          default:
            res.length = 0;
        }
      }
    }
  }
  function _calcPassThrough() {
    for (const i of s) {
      if (i.enter && i.type === Block.frame) {
        const last = [];
        _getLast(last, s.sub());
        s.close(i);
        const next = s.cur().value;
        for (const j of last) j.passThrough = j.goto === next;
      }
    }
  }
}

/** convert frames into `switch` cases */
export function* frames(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const { contextSym, contSym, errFrameRedir } = root;
  const inlineJumps = s.opts.inlinePureJumps === "tail";
  const inlineTailCoerce = s.opts.inlineTailCoerce != null;
  invariant(contextSym);
  const impl = root.implFrame.value;
  const decls = impl.savedDecls;
  const reuseTemps = s.opts.reuseTempVars !== false;

  const varsPool = reuseTemps && [];
  const discrimArg = (impl.ctrlParam =
    s.opts.defunctStateDiscriminant === "arg" && Kit.scope.newSym("s"));
  const f = yield* s.till(i => i.type === Block.frame);
  yield* s.sub();
  yield s.close(f);
  yield root.implFrame;
  const lab = s.label();
  yield s.enter(Tag.push, Tag.SwitchStatement);
  if (discrimArg) {
    if (s.opts.inlineReentryCheck) {
      if (!contSym)
        throw new Error("`inlineReentryCheck` requires `storeCont`");
      yield* s.toks(
        Tag.discriminant,
        `=$2 = ${reentryCont}, $1`,
        discrimArg,
        contSym
      );
    } else if (root.runningContSym) {
      yield* s.toks(
        Tag.discriminant,
        `=$I=$I`,
        root.runningContSym,
        discrimArg
      );
    } else {
      yield s.tok(Tag.discriminant, Tag.Identifier, { sym: discrimArg });
    }
    impl.discrimSym = discrimArg;
  } else {
    if (!contSym) throw new Error("this configuration requires `storeCont`");
    if (root.runningContSym) {
      if (s.opts.inlineReentryCheck)
        yield* s.toks(
          Tag.discriminant,
          `=$1=$2, $2 = ${reentryCont}, $1`,
          root.runningContSym,
          contSym
        );
      else
        yield* s.toks(Tag.discriminant, `=$1=$2`, root.runningContSym, contSym);
      impl.discrimSym = root.runningContSym;
    } else {
      yield s.tok(Tag.discriminant, Tag.Identifier, { sym: contSym });
    }
  }
  yield s.enter(Tag.cases, Tag.Array);
  const clab = s.label();
  let hasJumps = false;
  const seenSyms = new Set();
  let frameCnt = 0;
  for (const i of s.sub()) {
    if (i.enter && i.type === Block.frame) {
      i.value.frameNum = frameCnt++;
      if (i.value.catchContRedir && i.value.catchContRedir !== errFrameRedir)
        hasJumps = true;
      yield s.enter(Tag.push, Tag.SwitchCase, i.value);
      yield s.tok(Tag.test, Tag.NumericLiteral, {
        node: { value: i.value.stateId }
      });
      yield s.enter(Tag.consequent, Tag.Array);
      if (i.value.savedDecls) {
        let poolPos = 0;
        for (const [sym, { raw, init }] of i.value.savedDecls) {
          invariant(!raw);
          invariant(!init);
          if (seenSyms.has(sym)) continue;
          seenSyms.add(sym);
          if (varsPool && poolPos != null && varsPool.length > poolPos) {
            sym.substSym = varsPool[poolPos++];
          } else {
            decls.set(sym, { raw: null });
            if (varsPool) varsPool.push(sym);
            poolPos = null;
          }
        }
        i.value.savedDecls.clear();
      }
      if (inlineJumps) {
        for (const j of s.sub()) {
          if (j.enter) {
            if (j.type === Ctrl.jump && j.value.goto && !j.value.reflected) {
              j.value.ctrlArg = j.value.goto.declSym;
              j.value.origGoto = j.value.goto;
              j.value.goto = impl;
              hasJumps = true;
            } else if (
              inlineTailCoerce &&
              j.type === Block.letStmt &&
              j.value.eff &&
              !j.value.reflecte
            ) {
              hasJumps = true;
            }
          }
          yield j;
        }
      } else yield* s.sub();
      yield* clab();
      s.close(i);
    } else yield i;
  }
  if (root.hasYldStar && s.opts.delegateRedir !== false) {
    if (s.opts.bindName === "chain") {
      yield s.enter(Tag.push, Tag.SwitchCase);
      yield s.tok(Tag.test, Tag.NumericLiteral, { node: { value: 2 } });
      yield s.enter(Tag.consequent, Tag.Array);
      if (s.opts.inlineChainOp === "promise")
        yield* s.toks(
          Tag.push,
          `=Promise.resolve($2($3)).then($1.$resolve,$1.$reject)`,
          { result: true },
          contextSym,
          Block.redirSym,
          root.commonPatSym
        );
      else
        yield* s.toks(
          Tag.push,
          `=$I($I)`,
          { result: true },
          Block.redirSym,
          root.commonPatSym
        );
      yield* clab();
      yield s.enter(Tag.push, Tag.SwitchCase);
      yield s.tok(Tag.test, Tag.NumericLiteral, { node: { value: 3 } });
      yield s.enter(Tag.consequent, Tag.Array);
      yield* s.toks(
        Tag.push,
        `=$I($I)`,
        { result: true },
        Block.redirResultSym,
        root.commonPatSym
      );
      yield* clab();
    } else {
      yield s.enter(Tag.push, Tag.SwitchCase);
      yield s.tok(Tag.test, Tag.NumericLiteral, { node: { value: 2 } });
      yield s.enter(Tag.consequent, Tag.Array);
      yield* s.toks(
        Tag.push,
        `=$I($I)`,
        { result: true },
        Block.redirSym,
        root.commonPatSym
      );
      yield* clab();
    }
  }
  if (s.opts.defunctGuardInvalidState) {
    yield s.enter(Tag.push, Tag.SwitchCase);
    yield s.enter(Tag.consequent, Tag.Array);
    yield* s.toks(Tag.push, 'throw new Error("invalid state")');
  }
  yield* lab();
  yield Kit.leave(root.implFrame);
  impl.hasJumps = hasJumps;
  yield* s;
}

/** Wraps Init frame with try/catch if it is inlined */
export function wrapFirstFrame(si) {
  const s = Kit.auto(si);
  if (!s.opts.defunct || s.opts.scopePrefix || !s.opts.inlineJsExceptions)
    return s;
  return _wrapFirstFrame();
  function* _wrapFirstFrame() {
    for (const i of s) {
      yield i;
      if (i.type === Block.frame) break;
    }
    const sym = Kit.scope.newSym("e");
    yield* s.template(Tag.push, "try { $_ } catch($I) { $_ }", sym);
    yield* s.sub();
    yield* s.refocus();
    if (s.opts.inlineRaiseOp === "promiseRight") {
      yield* s.toks(Tag.push, "=Promise.reject($I)", { result: true }, sym);
    } else {
      yield s.enter(Tag.push, Block.app, { sym: Except.raiseId });
      yield s.tok(Tag.push, Tag.Identifier, { sym });
      yield* s.leave();
    }
    yield* s.leave();
    yield* s;
  }
}

/** changes state symbols to numbers */
export function* substSymConsts(si) {
  for (const i of si) {
    if (
      i.type === Tag.Identifier &&
      i.value.sym &&
      i.value.sym.numConst != null
    ) {
      if (i.enter) {
        yield Kit.tok(i.pos, Tag.NumericLiteral, {
          node: { value: i.value.sym.numConst }
        });
      }
    } else yield i;
  }
}

/** converts pure jumps to tail calls loop */
export function tailJumps(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const { inlinePureJumps, inlineTailCoerce } = root.opts;
  if (inlinePureJumps !== "tail") {
    if (inlineTailCoerce != null)
      throw s.error(
        '`inlineTailCoerce:true` requires `inlinePureJunps:"tail"`'
      );
    return s;
  }
  if (!s.opts.defunct)
    throw s.error("`inlinePureJumps:'tail'` requires `defunct:true`");
  const handlePrefix = !s.opts.scopePrefix && s.opts.inlineScopeOp === "call";
  const implFrame = root.implFrame.value;
  let tailCoerceExpr;
  let tailCoerceArg;
  let eraseChain;
  const assignCont = s.opts.inlineContAssign === false;
  const { ctrlParam } = implFrame;
  const contStoreSym = root.contSym;
  if (inlineTailCoerce != null) {
    if (inlineTailCoerce.substr) {
      tailCoerceExpr = "=$2($1)";
      tailCoerceArg = Kit.sysId(inlineTailCoerce);
    } else if (inlineTailCoerce.singelton) {
      if (!contStoreSym)
        throw s.error(
          `inlineTailCoerce:{singelton} require a continuation storage`
        );
      eraseChain = true;
      tailCoerceArg = Kit.sysId(inlineTailCoerce.singelton);
    } else if (inlineTailCoerce.symbol) {
      tailCoerceExpr = "=$1 && $1[$2]";
      tailCoerceArg = Kit.sysId(inlineTailCoerce.symbol);
    }
  }
  const pat = root.commonPatSym;
  return _tailJumps();
  function* _exitFrame(impl, pos, i) {
    if (impl) {
      if (!i.value.passThrough) yield s.tok(pos, Tag.ContinueStatement);
    } else {
      yield* s.toks(
        pos,
        "=$I($I,$I)",
        { result: true },
        implFrame.declSym,
        root.contextSym,
        pat
      );
    }
  }
  function* _tailFrame(impl) {
    const lab = s.label();
    if (impl && implFrame.hasJumps) {
      yield s.enter(Tag.push, Tag.ForStatement);
      yield s.enter(Tag.body, Tag.BlockStatement);
      yield s.enter(Tag.body, Tag.Array);
    }
    for (const i of s.sub()) {
      if (i.enter) {
        if (
          inlineTailCoerce != null &&
          i.type === Block.letStmt &&
          i.value.eff &&
          !i.value.reflected
        ) {
          if (inlineTailCoerce === true) {
            if (assignCont)
              yield* s.toks(
                Tag.push,
                "=$I = $I",
                ctrlParam || contStoreSym,
                i.value.gotoSym
              );
            i.value.reflected = true;
            if (!i.leave && s.curLev() != null) {
              if (i.value.sym) {
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, { sym: pat });
                yield* Kit.reposOne(s.sub(), Tag.right);
                yield* s.leave();
              } else yield* Kit.reposOne(s.sub(), Tag.push);
            }
            s.close(i);
            yield* _exitFrame(impl, Tag.push, i);
            continue;
          }
          if (eraseChain) {
            yield* s.template(
              Tag.push,
              "if(($1=$E) === $2) { $3 = $4; $_; } else {$5 = $4;  $_}",
              pat,
              tailCoerceArg,
              contStoreSym,
              i.value.gotoSym,
              ctrlParam || contStoreSym
            );
            yield* Kit.reposOne(s.one(), Tag.right);
            yield* s.refocus();
            yield s.enter(Tag.push, Tag.ReturnStatement);
            yield s.tok(Tag.argument, Tag.Identifier, { sym: pat });
            yield* s.leave();
            yield* s.refocus();
            yield* _exitFrame(impl, Tag.push, i);
            yield* s.leave();
            Kit.skip(s.copy(i));
            continue;
          }
          i.value.reflected = true;
          i.value.tmpVar = pat;
          yield* s.copy(i);
          yield s.enter(Tag.push, Tag.IfStatement);
          yield* s.toks(Tag.test, tailCoerceExpr, pat, tailCoerceArg);
          yield s.enter(Tag.consequent, Tag.ReturnStatement);
          yield s.tok(Tag.argument, Tag.Identifier, { sym: pat });
          yield* s.leave();
          yield* _exitFrame(impl, Tag.alternate, i);
          yield* s.leave();
          continue;
        }
        if (i.type === Ctrl.jump && !i.value.bindName && !i.value.reflected) {
          if (assignCont)
            yield* s.toks(
              Tag.push,
              "=$I = $I",
              ctrlParam || contStoreSym,
              i.value.gotoSym
            );
          const j = s.curLev();
          if (j) {
            if (j.type === Block.bindPat && i.value.sym === pat) {
              Kit.skip(s.sub());
            } else {
              if (i.value.sym && i.value.sym.bound === false) {
                yield* Kit.reposOne(s.sub(), i.pos);
              } else {
                const sym = i.value.sym || pat;
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, { sym });
                yield* Kit.reposOne(s.sub(), Tag.right);
                yield* s.leave();
              }
            }
          }
          s.close(i);
          yield* _exitFrame(impl, Tag.push, i);
          continue;
        }
      }
      yield i;
    }
    yield* lab();
  }
  function* _tailJumps() {
    for (const i of s.sub()) {
      yield i;
      if (i.enter && i.type === Block.frame) {
        const impl = i.value === implFrame;
        if (!impl) {
          i.value.savedDecls.set(pat, {});
          if (!handlePrefix) {
            yield* s.sub();
            continue;
          }
        }
        yield* _tailFrame(impl);
      }
    }
    yield* s;
  }
}

export const convert = Kit.pipe(
  // calcPassThrough,
  frames,
  Kit.toArray,
  stateMappings,
  Kit.toArray,
  assignHandlers,
  wrapFirstFrame,
  inlineExceptions,
  Kit.toArray,
  tailJumps
);
