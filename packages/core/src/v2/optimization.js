import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";

export function prepare() {
  const { root } = Ctx;
  for (let i = root.scopes; i; i = i.nextScope) {
    let varCount = 0;
    for (const j of i.scopeDecls) Kit.setSymName(j, varCount++, "$");
    i.varCount = varCount;
    const globList = (root.globBindSyms = {});
    globList.nextPat = globList.prevPat = globList;
    const globPool = { varCount };
    globPool.nextInPool = globPool.prevInPool = globPool;
    i.symScopePool = globPool;
    i.symScopeList = globList;
  }
}

/** minimizing number of variables required for storing intermediate values */
export function assignBindVar(root) {
  const end = root.cfgBlock;
  const maxOrder = end.order;
  const maxEffOrder = end.effOrder;
  const patSym = root.patSym;
  patSym.frameLocal = true;
  const forRelease = Array(maxOrder).fill(null);
  const locList = (root.locBindSyms = {});
  locList.nextPat = locList.prevPat = locList;
  const locPool = (root.localVars = { varCount: 0 });
  locPool.nextInPool = locPool.prevInPool = locPool;
  const reservedSyms = root.module.reservedSyms;
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
    /*
    const { usageBlock } = i;
    if (usageBlock) {
      const { order, effOrder } = usageBlock;
      if (order > max) max = order;
      if (effOrder > maxEff) maxEff = effOrder;
    }
    */
    const local = minEff === maxEff;
    let list, pool;
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
    }
    let sym;
    if (pool.nextInPool === pool) {
      sym = i;
      sym.pool = pool;
      sym.nextPat = list;
      sym.prevPat = list.prevPat;
      list.prevPat = list.prevPat.nextPat = sym;
      sym.frameLocal = local;
      Kit.setSymName(sym, pool.varCount++, "$");
      if (reservedSyms) Scope.ensureUnique(sym);
    } else {
      sym = pool.nextInPool;
      const prev = sym.prevInPool;
      const next = sym.nextInPool;
      next.prevInPool = prev;
      prev.nextInPool = next;
      i.varSym = sym;
    }
    sym.nextRelease = forRelease[max];
    forRelease[max] = sym;
    // removing simple var copies
    for (let j = i.rhs; j != null; j = j.prevRHS) {
      const cfgItem = j.cfgItem;
      if (cfgItem.eff || cfgItem.last || cfgItem.doc !== j) continue;
      const sym = j.sym;
      if (sym) {
        // used only once
        if (sym.lhs.prevLHS != null) continue;
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
