import * as Kit from "./kit";
import { Tag } from "./kit";
import * as Block from "./block";
import * as Ctrl from "./control";

/**
 * # if it is a pure jump and it goes to a frame with
 *   only 1 enter we can inline that frame
 */
export function inlineFrames(si) {
  const sa = Kit.toArray(si);
  const root = sa[0].value;
  const { resFrame, resFrameRedir, pureExitFrame, errFrameRedir } = root;
  const { staticPure, inlineReflectedOps } = root.opts;
  Ctrl.convolveFrames(sa);
  const res = Kit.toArray(_inlineJumps(sa));
  return Kit.toArray(Block.cleanup(res));
  function* _inlineJumps(si) {
    const s = Kit.auto(si);
    for (const i of s) {
      if (i.enter && i.type === Block.frame) {
        Kit.skip(s.sub());
        if (i.value.removed) {
          s.close(i);
        } else {
          yield i;
          yield* _runInlineJumps(i.value, null);
          yield s.close(i);
        }
        continue;
      }
      yield i;
    }
    function* _runInlineJumps(frame, tmpVar) {
      const decls = frame.savedDecls;
      for (const { content } of frame.steps) {
        for (let i = 0, len = content.length; i < len; ++i) {
          const j = content[i];
          if (j.enter) {
            switch (j.type) {
              case Block.letStmt:
                if (
                  !j.value.eff ||
                  (j.value.opSym && j.value.opSym !== Block.chainId)
                )
                  break;
              case Ctrl.jump:
                if (j.value.tmpVar && !inlineReflectedOps) break;
                if (tmpVar && !j.value.reflected) {
                  j.value.tmpVar = tmpVar;
                  j.value.reflected = true;
                }
                const { goto } = j.value;
                if (
                  j.type === Block.letStmt ||
                  j.value.rec ||
                  (j.value.indirJumps && j.value.indirJumps.size) ||
                  (j.value.frameArgs && j.value.frameArgs.size)
                )
                  break;
                if (
                  goto.dynamicJump ||
                  goto.enters.size !== 1 ||
                  goto.required ||
                  goto.noInline ||
                  goto === resFrame
                )
                  break;
                if (
                  goto.catchContRedir &&
                  !(
                    goto.catchContRedir === frame.catchContRedir ||
                    (j.value.tmpVar && goto.catchContRedir === errFrameRedir)
                  )
                )
                  break;
                if (
                  goto.resContRedir &&
                  !(
                    goto.resContRedir === frame.resContRedir ||
                    (j.value.tmpVar && goto.resContRedir === resFrameRedir)
                  )
                )
                  break;
                goto.removed = true;
                const cont = j.value.content;
                if (cont.length > 2 && j.value.sym && j.value.sym.bound) {
                  yield s.enter(Tag.push, Block.letStmt, { sym: j.value.sym });
                  yield* cont.slice(1, cont.length - 1);
                  yield* s.leave();
                }
                yield* _runInlineJumps(goto, j.value.tmpVar || tmpVar);
                for (const [n, v] of goto.savedDecls) decls.set(n, v);
                if (!j.leave) {
                  do {
                    ++i;
                  } while (i < len && content[i].value !== j.value);
                }
                continue;
            }
          }
          yield j;
        }
      }
    }
  }
}

/**
 * replacing jumps to pure with just effExpr
 */
export function inlinePureCont(si) {
  const s = Kit.auto(si);
  if (s.opts.keepLastPure) return s;
  const root = s.first.value;
  const { errFrameRedir, resFrameRedir, pureExitFrame } = root;
  const { defunct, coerce, scopePostfix } = s.opts;
  resFrameRedir.removed = !defunct;
  pureExitFrame.removed = !defunct;
  return defunct
    ? _inlinePureCont()
    : Block.cleanup(Kit.toArray(_inlinePureCont()));
  function* _inlinePureCont() {
    for (const i of s) {
      if (i.enter) {
        switch (i.type) {
          case Block.letStmt:
            if (
              !i.value.eff ||
              (i.value.opSym && i.value.opSym !== Block.chainId)
            )
              break;
          case Ctrl.jump:
            const frame = i.value.ref;
            const noHandlers =
              (!frame.catchContRedir ||
                frame.catchContRedir === errFrameRedir) &&
              (!frame.resultContRedir ||
                frame.resultContRedir === resFrameRedir);
            const { goto } = i.value;
            if (
              ((!scopePostfix && noHandlers) || i.type === Ctrl.jump) &&
              (!goto || goto === resFrameRedir || goto === pureExitFrame)
            ) {
              const lab = s.label();
              const inner = [];
              if (!i.leave) inner.push(...s.sub());
              if (i.value.frameArgs) {
                for (const [l, r] of i.value.frameArgs) {
                  if (!l.bound) continue;
                  yield s.enter(Tag.push, Tag.AssignmentExpression, {
                    node: { operator: "=" }
                  });
                  yield s.tok(Tag.left, Tag.Identifier, {
                    sym: l,
                    lhs: true,
                    rhs: false,
                    decl: false
                  });
                  if (r === Block.argSym) {
                    if (inner.length) yield* Kit.reposOneArr(inner, Tag.right);
                    else
                      yield s.tok(Tag.right, Tag.Identifier, {
                        sym: Kit.scope.undefinedSym
                      });
                    inner.length = 0;
                  } else
                    yield s.tok(Tag.right, Tag.Identifier, {
                      sym: r,
                      lhs: false,
                      rhs: true,
                      decl: false
                    });
                  yield* s.leave();
                }
              }
              yield s.enter(Tag.push, Block.effExpr, {
                tmpVar: i.value.tmpVar,
                reflected: i.value.reflected
              });
              if (!coerce && i.type === Ctrl.jump)
                yield s.enter(Tag.push, Block.app, { sym: Block.pureId });
              yield* inner;
              yield* lab();
              s.close(i);
              continue;
            }
            frame.removed = false;
        }
      }
      yield i;
    }
  }
}
/**
 * removes frames with only 1 jump as its content
 */
export function removeSingleJumps(si) {
  const sa = Kit.toArray(si);
  const root = sa[0].value;
  const { resFrame, resFrameRedir, pureExitFrame, errFrameRedir } = root;
  const { scopePostfix, staticPure, coerce } = root.opts;
  if (scopePostfix) {
    resFrame.noInline = true;
    resFrameRedir.noInline = true;
  }
  let res = sa;
  Ctrl.convolveFrames(res);
  let { cfg } = root;
  const cfgT = cfg.slice(1);
  for (const i of cfgT) {
    const goto = _singleJump(i);
    if (!goto) continue;
    const {
      enters,
      exits: [exit]
    } = i;
    for (const j of enters) {
      if (j.goto.dynamicJump) continue;
      j.goto = goto;
      goto.enters.add(j);
      enters.delete(j);
      if (goto.dynamicJump) {
        Ctrl.flattenGotoDests(goto, (j.gotoDests = []));
      } else {
        j.gotoDests = [goto];
      }
    }
  }
  for (const i of cfgT) {
    if (i.enters.size === 0 && !i.noInline && !i.required) {
      i.removed = true;
      if (i.patSym) i.patSym.bound = false;
      for (const j of i.exits) j.goto.enters.delete(j);
    }
  }
  return Kit.toArray(Block.cleanup(res));

  function _singleJump(frame, cc, rc) {
    if (frame.noInline) return false;
    if (frame.savedDecls && frame.savedDecls.size) return false;
    const { steps } = frame;
    if (!steps || steps.length !== 1) return false;
    const [step] = steps;
    if (step.origType !== Ctrl.jump) return false;
    if (step.tmpVar) return false;
    const { content } = step;
    /** copying of frame's patter */
    let copySym;
    if (!content || content.length > 2) {
      const arg = content[1];
      if (arg.type !== Block.bindPat) return false;
      copySym = arg.value.sym;
    }
    if (frame.patSym !== copySym) return false;
    if (step.rec || (step.indirJumps && step.indirJumps.size)) return false;
    let { goto } = step;
    if (step.frameArgs && step.frameArgs.size) {
      if (!step.result) return false;
      //      if (goto === resFrame)
      //        return staticPure ? resFrameRedir : pureExitFrame
      return false;
    }
    return goto;
  }
}

/** removes never executing frames */
export function removeUnreachable(cfg) {
  for (const i of cfg) {
    i.hasBindJump = false;
    i.reachable = false;
    for (const j of i.exits) {
      if (j.bindJump) {
        i.hasBindJump = true;
        break;
      }
    }
    const skipFirst = (i.noInline = i.noInline || i.first || i.last);
  }

  const first = cfg[0];
  markReachable(first);
  markReachable(first.root.resFrameRedir);
  for (const i of cfg) {
    if (!i.reachable) {
      i.removed = true;
      continue;
    }
    if (i.catchContRedir) i.catchContRedir.noInline = true;
    if (i.resultContRedir) i.resultContRedir.noInline = true;
  }
  const res = [];
  for (const i of cfg) {
    if (i.removed) continue;
    res.push(i);
    // cleaning dynamic jumps
    for (const j of i.exits) {
      const { goto } = j;
      if (!goto) continue;
      if (goto.dynamicJump) {
        cleanupDyn(goto);
        continue;
      }
    }
  }
  return res;

  function markReachable(frame) {
    if (!frame) return;
    if (frame.reachable) return;
    frame.reachable = true;
    if (frame.dynamicJump) return;
    for (const i of frame.exits) {
      if (i.indirJumps) for (const j of i.indirJumps.keys()) markReachable(j);
      if (i.goto) markReachable(i.goto);
    }
    if (!frame.last) {
      if (frame.resultContRedir) markReachable(frame.resultContRedir);
      if (frame.catchContRedir) markReachable(frame.catchContRedir);
    }
  }

  function cleanupDyn(goto) {
    const { instances } = goto;
    for (let dst of instances) {
      if (!dst.reachable) {
        instances.delete(dst);
        continue;
      }
      if (dst.dynamicJump) cleanupDyn(dst);
    }
  }
}
