import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
import config from "@effectful/transducers/v2/config";
const { Tag } = Kit;

export function prepare() {
  const { root } = Ctx;
  const paramsFirst = !config.expInlineCalls;
  for (let i = root.scopes; i; i = i.nextScope) {
    let varCount = 0;
    for (const j of i.scopeDecls)
      if (j.bound && (paramsFirst || !j.param))
        Kit.setSymName(j, varCount++, "$");
    i.varCount = varCount;
    const globList = (root.globBindSyms = {});
    globList.nextPat = globList.prevPat = globList;
    const globPool = { varCount };
    globPool.nextInPool = globPool.prevInPool = globPool;
    i.symScopePool = globPool;
    i.symScopeList = globList;
  }
  for (let i = root.firstChild; i; i = i.nextFunc) {
    const def = i.funcDef;
    const locList = (def.locBindSyms = {});
    locList.nextPat = locList.prevPat = locList;
    const locPool = (def.localVars = { varCount: 0 });
    locPool.nextInPool = locPool.prevInPool = locPool;
  }
}

/** minimizing number of variables required for storing intermediate values */
export function assignBindVar(root) {
  const { patSym } = Ctx.root;
  const end = root.cfgBlock;
  const maxOrder = end.order;
  const maxEffOrder = end.effOrder;
  const forRelease = Array(maxOrder).fill(null);
  const reservedSyms = root.module.reservedSyms;
  const locList = root.locBindSyms;
  const locPool = root.localVars;
  const { reuseTempVars } = config;
  let cur = 0;
  for (let i = root.orderedBinds; i; i = i.nextOrderedBind) {
    if (!i.bound) continue;
    let min = maxOrder;
    let max = 0;
    let minEff = maxEffOrder;
    let maxEff = 0;
    const lhs = i.lhs;
    const rhs = i.rhs;
    for (let j = lhs; j; j = j.prevLHS) {
      const { order, effOrder } = j;
      if (order < min) min = order;
      if (effOrder < minEff) minEff = effOrder;
    }
    for (; cur <= min; ++cur) {
      for (let k = forRelease[cur]; k; k = k.nextRelease) {
        const pool = k.pool;
        k.prevInPool = pool;
        k.nextInPool = pool.nextInPool;
        pool.nextInPool = pool.nextInPool.prevInPool = k;
      }
    }
    if (i.releaseBlock) {
      max = i.releaseBlock.order;
    } else {
      for (let j = rhs; j; j = j.prevRHS) {
        const item = j.cfgItem;
        const { order, effOrder } = item;
        if (order > max) max = order;
        if (effOrder > maxEff) maxEff = effOrder;
      }
    }
    const local = minEff === maxEff;
    let list, pool;
    let reuse = true;
    if (local) {
      list = locList;
      pool = locPool;
    } else {
      if (lhs.prevLHS == null && lhs.eff && maxEff - minEff === 1) {
        i.varSym = patSym;
        continue;
      }
      const scope = i.scope;
      list = scope.symScopeList;
      pool = scope.symScopePool;
      reuse = reuseTempVars;
    }
    let sym;
    if (!reuse || pool.nextInPool === pool) {
      sym = i;
      sym.pool = pool;
      sym.nextPat = list;
      sym.prevPat = list.prevPat;
      list.prevPat = list.prevPat.nextPat = sym;
      sym.frameLocal = local;
      Kit.setSymName(sym, pool.varCount++, "_");
      if (reservedSyms) Scope.ensureUnique(sym);
    } else {
      sym = pool.nextInPool;
      const prev = sym.prevInPool;
      const next = sym.nextInPool;
      next.prevInPool = prev;
      prev.nextInPool = next;
      i.varSym = sym;
    }
    if (reuse) {
      sym.nextRelease = forRelease[max];
      forRelease[max] = sym;
    }
  }
  for (let i = root.orderedBinds; i; i = i.nextOrderedBind) {
    // removing simple var copies
    for (let j = i.rhs; j != null; j = j.prevRHS) {
      const cfgItem = j.cfgItem;
      if (cfgItem.eff || cfgItem.last || cfgItem.doc !== j) continue;
      const sym = cfgItem.sym.varSym;
      if (sym) {
        // used only once
        if (sym.lhs.prevLHS != null || sym.pool !== i.varSym.pool) continue;
        sym.varSym = i.varSym;
      }
      j.cfgItem = null;
      const p = cfgItem.prevItem;
      (p.nextItem = cfgItem.nextItem).prevItem = p;
    }
  }
}

/**
 * composing expressions back from CFG items if a separate item isn't required
 * also, this sets `cfgItem`
 */
export function composeItems(root) {
  let bindNum = 0;
  for (let i = root.bindIds, n = null, p = null; i; p = i, i = n) {
    n = i.prevBindId;
    const rhs = i.rhs;
    if (rhs != null && rhs.prevRHS == null) {
      let itemNode = rhs;
      for (let j = rhs; (j = j.parent); itemNode = j) {}
      const item = itemNode.cfgItem;
      const prev = item.prevItem;
      if (!prev.eff && prev.sym === i) {
        if (p) p.prevBindId = n;
        else root.bindIds = n;
        const doc = prev.doc;
        doc.pos = rhs.pos;
        doc.cfgItem = null;
        Scope.replaceRhs(rhs, doc);
        rhs.cfgItem = null;
        i.rhs = null;
        const prevPrev = prev.prevItem;
        prevPrev.nextItem = item;
        item.prevItem = prevPrev;
        i.bound = false;
      }
    }
    ++bindNum;
  }
  root.bindNum = bindNum;
  return root;
}

export function sortFrames(root) {
  const { ctxSym } = Ctx.root;
  const { errFrame, lastFrame } = root;
  const resFrame = errFrame.prevFrame;
  let jobs = null;
  let clock = 0;
  schedule(resFrame);
  schedule(errFrame);
  let cur = null;
  let pureExit = null;
  const fallthrough = config.switchFallthrough;
  if (config.expInline) {
    for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
      if (
        i.tryInline &&
        i.nextEffSkipExit === i &&
        i.nextEffExit === i &&
        i.nextDynExit === i &&
        (pureExit = i.prevPureExit) !== i &&
        pureExit.prevPureExit === i &&
        i.consequent.firstChild === pureExit.parent.parent
      ) {
        const dst = pureExit.dst;
        for (let j = i.nextEnter; i !== j; j = j.nextEnter) j.dst = dst;
        const next = i.nextFrame;
        (next.prevFrame = i.prevFrame).nextFrame = next;
        if (i.handlerStart) i.handlerStart.frame = dst;
        if (i.finalizerStart) i.finalizerStart.frame = dst;
      }
      // TODO: inline single reference pure frames
    }
  }
  const firstFrame = errFrame.nextFrame;
  schedule(firstFrame);
  firstFrame.prevFrame = lastFrame;
  lastFrame.nextFrame = firstFrame;
  let count = 0;
  while (jobs) {
    const job = jobs;
    jobs = jobs.nextJob;
    job.end = ++clock;
    const id = (job.id = count++);
    const { block } = job;
    if (block) {
      const { finalizer, handler } = block;
      if (finalizer) {
        schedule(finalizer.frame);
        if (finalizer.tail.errDynFrame) schedule(finalizer.tail.errDynFrame);
      }
      if (handler) schedule(handler.frame);
    }
    for (let i = job.nextDynExit; i !== job; i = i.nextDynExit)
      for (let j = i.nextInstance; j !== i; j = j.nextInstance) schedule(j.dst);
    for (let i = job.nextEffExit; i !== job; i = i.nextEffExit) schedule(i.dst);
    for (let i = job.nextEffSkipExit; i !== job; i = i.nextEffSkipExit)
      schedule(i.dst);
    for (let i = job.prevPureExit; i !== job; i = i.prevPureExit)
      schedule(i.dst);
    if (cur) {
      if (fallthrough) {
        for (let i = cur.nextEffSkipExit; i !== cur; i = i.nextEffSkipExit) {
          if (i.dst !== job) continue;
          const assign = Kit.assign(Tag.expression);
          Kit.append(assign, Kit.memExpr(Tag.left, ctxSym, "state"));
          Kit.append(assign, Kit.num(Tag.right, id));
          const cont = i.continueStmt;
          cont.type = Tag.ExpressionStatement;
          Kit.append(cont, assign);
          if (i.noSkip)
            Kit.insertAfter(cont, Kit.node(Tag.push, Tag.BreakStatement));
        }
        for (let i = cur.prevPureExit; i !== cur; i = i.prevPureExit) {
          if (i.dst !== job) continue;
          i.prevSibling.firstChild.prevSibling.node.name = "state";
          if (i.noSkip) i.continueStmt.type = Tag.BreakStatement;
          else Kit.detach(i.continueStmt);
        }
      }
      (job.prevFrame = cur).nextFrame = job;
    }
    cur = job;
  }
  errFrame.end = ++clock;
  resFrame.end = ++clock;
  cur.nextFrame = lastFrame;
  lastFrame.prevFrame = cur;
  for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
    const id = i.id;
    for (let j = i.nextEnter; j !== i; j = j.nextEnter) j.node.value = id;
  }
  function schedule(job) {
    if (job.beg > 0) return;
    job.beg = ++clock;
    job.nextJob = jobs;
    jobs = job;
  }
}
