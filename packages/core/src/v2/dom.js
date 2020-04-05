import * as Kit from "./kit";
import * as Ctx from "./context";
const { Tag } = Kit;

export function regId(tok) {
  const root = Ctx.root;
  const before = root.nextId;
  before.prevId = root.nextId = tok;
  tok.nextId = before;
  tok.prevId = root;
}

export function regPat(tok) {
  if (tok.type === Tag.Identifier && !tok.nextId) regId(tok);
}

let valCount = 100000; //TODO:

/** this clone works only after CFG is done */
export function clone(doc) {
  if (!doc) return doc;
  const res = { ...doc };
  res.id = valCount++;
  const node = doc.node;
  res.node = Array.isArray(node) ? [...node] : { ...node };
  res.firstChild = null;
  res.nextSibling = res.prevSibling = res;
  const { firstChild } = doc;
  if (firstChild) {
    let i = firstChild;
    do {
      // TODO: remove recursion (but low priority, the cloned nodes are supposed to be small)
      Kit.append(res, clone(i));
    } while ((i = i.nextSibling) !== firstChild);
  }
  if (doc.type === Tag.Identifier) {
    const sym = doc.sym;
    if (sym) {
      if (sym.decl) regId(res);
      res.prevRHS = sym.rhs;
      sym.rhs = res;
    }
  }
  return res;
}
