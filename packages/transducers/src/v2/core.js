/*
 *  drafts for the next version
 *
 *  V2 (unlike V1) doesn't have tokens wraps all information
 *  is stored directly in the Value, no entering and closing tokens
 *
 *   # DOM-like AST representation
 *
 *   type Value = {
 *     pos: Pos,
 *     type: Type,
 *     node: BabelNode,
 *     parent: Value | null,
 *     id: number,
 *     nextSibling: Value,
 *     prevSibling: Value,
 *     // .....
 *   }
 *
 */
import {
  typeInfo,
  Tag,
  VISITOR_KEYS,
  symName,
  symInfo,
  arrayPattern,
  arrayAssignmentPattern,
  objectPattern,
  objectAssignmentPattern,
  restElement,
  restElementAssignment,
  assignmentProperty,
  assignmentOpEq,
  assignmentOpDefault
} from "./types";

import config from "./config";

let valCount = 0;

export function empty() {
  const res = {
    type: Tag.Empty,
    pos: Tag.Empty,
    id: valCount++,
    level: 0,
    node: null,
    parent: null,
    data: null
    //pure: false
  };
  res.prevSibling = res;
  res.nextSibling = res;
  res.firstChild = null;
  return res;
}

/**
 * detaches `node` from the tree
 */
export function detach(node) {
  const { nextSibling, parent } = node;
  (nextSibling.prevSibling = node.prevSibling).nextSibling = nextSibling;
  if (parent && parent.firstChild === node) {
    if (nextSibling === node) parent.firstChild = null;
    else parent.firstChild = nextSibling;
  }
  node.nextSibling = node.prevSibling = node;
  node.parent = null;
  return node;
}

/** inserts sibling `node` after `pos` node */
export function insertAfter(pos, node) {
  const { nextSibling } = pos;
  node.prevSibling = pos;
  node.nextSibling = nextSibling;
  nextSibling.prevSibling = pos.nextSibling = node;
  node.parent = pos.parent;
  return node;
}

/**
 * inserts sibling `child` before `pos`
 *  - expects `last` of the both nodes
 */
export function insertBefore(pos, node) {
  const { prevSibling } = pos;
  node.nextSibling = pos;
  node.prevSibling = prevSibling;
  prevSibling.nextSibling = pos.prevSibling = node;
  const parent = pos.parent;
  node.parent = parent;
  if (parent.firstChild === pos) parent.firstChild = node;
  return node;
}

/** makes `child` to be the last child of `parent` */
export function append(parent, child) {
  const old = parent.firstChild;
  if (old) return insertAfter(old.prevSibling, child);
  child.parent = parent;
  return (parent.firstChild = child);
}

/** makes `child` to be the first child of `parent` */
export function prepend(parent, child) {
  const old = parent.firstChild;
  if (old) return insertBefore(old, child);
  child.parent = parent;
  parent.firstChild = child;
  return child;
}

/**
 * replaces node `from` by `to`
 *  - expects `last` of both
 */
export function replace(from, to) {
  insertAfter(from, to);
  detach(from);
  return to;
}

/** builds default DOM node */
export function node(pos, type) {
  return tok(pos, type, { type: "" });
}

/** builds DOM node for `=` assignments */
export function assign(pos) {
  return tok(pos, Tag.AssignmentExpression, { operator: "=" });
}

/** builds DOM node for an identifier with symbol */
export function id(pos, sym) {
  const res = node(pos, Tag.Identifier);
  res.sym = sym;
  return res;
}

/** builds DOM node for array */
export function arr(pos) {
  return tok(pos, Tag.Array, [], null);
}

export function childArr(pos, par) {
  const res = tok(pos, Tag.Array, [], null);
  append(par, res);
  return res;
}

export function block(pos, par) {
  const res = node(pos, Tag.BlockStatement);
  append(res, arr(Tag.body));
  append(par, res);
  return res;
}

export function appendBlock(pos, par) {
  const block = node(pos, Tag.BlockStatement);
  const res = childArr(Tag.body, block);
  append(par, block);
  return res;
}

/** builds DOM node for a numeric constant */
export function num(pos, value) {
  return tok(pos, Tag.NumericLiteral, { value });
}

/** builds DOM node for a string constant */
export function str(pos, value) {
  return tok(pos, Tag.StringLiteral, { value });
}

/** builds DOM node for a boolean constant */
export function bool(pos, value) {
  return tok(pos, Tag.BooleanLiteral, { value });
}

/** builds DOM node */
export function tok(pos, type, node) {
  const res = empty();
  res.pos = pos;
  res.type = type;
  res.node = node;
  return res;
}

/* same as `tok` but also sets `parent` */
export function child(pos, type, node, parent) {
  const res = tok(pos, type, node);
  res.parent = parent;
  return res;
}

function Share(inner) {
  this.inner = inner[Symbol.iterator]();
}

Share.prototype[Symbol.iterator] = function() {
  return this;
};

Share.prototype.next = function() {
  return this.inner.next();
};

/** returns same iterable which ignores `return` method call */
export function share(inner) {
  return new Share(inner);
}

function* hierImpl(s) {
  let last = null;
  for (const i of s) {
    const level = (i.level = i.parent ? i.parent.level + 1 : 0);
    if (last)
      for (let j = level, till = last.level; j <= till; ++j, last = last.parent)
        yield { start: false, value: last };

    last = i;
    yield { start: true, value: i };
  }
  for (; last && last.pos !== Tag.root; last = last.parent)
    yield { start: false, value: last };
}

/**
 * converts each element of `s:Iterable<Value>` into two elements
 * `{start:boolean,value:Value}` with `start:true` on entering the token
 * and `start:false` on exit
 */
export function hier(inner) {
  return share(hierImpl(inner));
}

function Reset(inner) {
  const iter = (this.inner = inner[Symbol.iterator]());
  const item = iter.next();
  if (item.done) {
    this.first = this.buf = null;
    return;
  }
  const buf = item.value;
  const first = buf.parent;
  buf.prev = first;
  first.next = buf;
  first.level = 0;
  this.buf = buf;
  this.first = first;
  this.levels = [first, null];
}

Reset.prototype[Symbol.iterator] = function() {
  return this;
};

Reset.prototype.next = function() {
  const value = this.step();
  return value ? { done: false, value } : { done: true };
};

Reset.prototype.step = function step() {
  const cur = this.buf;
  if (!cur) return null;
  const nextItem = this.inner.next();
  const levels = this.levels;
  if (nextItem.done) {
    const first = this.first;
    cur.nextSibling = first;
    this.buf = null;
    return cur;
  }
  const next = nextItem.value;
  const level = next.parent.level + 1;
  const prevSibling = levels[level];
  levels[level] = cur;
  if (prevSibling) {
    prevSibling.nextSibling = next;
    next.prevSibling = prevSibling;
  } else {
    next.parent.firstChild = next;
    next.prevSibling = next;
  }
  levels[level + 1] = null;
  this.buf = next;
  cur.nextSibling = next;
  return cur;
};

/**
 * takes an iterable of values and returns another iterable
 * with same elements but all the DOM fields re-calculated
 * this calculates only 1 token ahead
 */
export function lookahead(s) {
  return new Reset(s);
}

/**
 * converts AST `node` into the AST representation with
 */
export function produceNode(pos, babelNode) {
  if (Array.isArray(babelNode)) {
    const res = arr(pos);
    for (const i of babelNode)
      append(res, i ? produceNode(Tag.push, i) : tok(Tag.push, Tag.Null, null));
    return res;
  }
  const type = babelNode.type;
  const keys = VISITOR_KEYS[type];
  const res = tok(pos, Tag[type], babelNode);
  if (keys.length) {
    for (const i of keys) {
      const v = babelNode[i];
      if (v != null) append(res, produceNode(Tag[i], v));
    }
  }
  return res;
}

/** next node strictly after `node` */
export function after(node) {
  for (let i = node; ; ) {
    const { parent, nextSibling } = i;
    if (!parent) return nextSibling;
    if (nextSibling !== parent.firstChild) return nextSibling;
    i = parent;
  }
}

/** next node in DFT order after `node` */
export function next(node) {
  return node.firstChild || after(node);
}

/** prev node in DFT order before `node` */
export function prev(node) {
  const { parent } = node;
  if (parent && parent.firstChild === node)
    return parent;
  for(let i = node.prevSibling;;) {
    const {firstChild} = i
    if (!firstChild)
      return i;
    i = firstChild.prevSibling;
  }
}

/** traverses range [from,to) */
export function* dft(from, to = from.nextSibling) {
  let i = from;
  do {
    const n = next(i);
    yield i;
    i = n;
  } while (i !== to);
}

/**
 * like `produce` but wraps the resulting node with `Tag.root` element
 */
export function produce(babelNode) {
  const root = node(Tag.root, Tag.Root);
  append(root, produceNode(Tag.top, babelNode));
  return root;
}

/**
 * converts DOM root node into a babel AST node
 */
export function consume(root) {
  consumeRange(root.firstChild, root);
  return root.firstChild.node;
}

/**
 * resets babel AST properties in [from..to) range
 */
export function consumeRange(from, to) {
  for (const i of dft(from, to)) {
    const { parent, node } = i;
    if (parent) {
      if (i.pos === Tag.push) {
        parent.node.push(node);
      } else parent.node[symName(i.pos)] = node;
    }
    if (i.type === Tag.Array) node.length = 0;
    else if (i.type === Tag.Null) i.node = null;
    else {
      const ti = symInfo(i.type);
      if (ti) {
        if (ti.esType != null) i.node.type = ti.esType;
        if (ti.fields) Object.assign(i.node, ti.fields);
      }
    }
  }
}

/**
 * Resets `fieldInfo` field in each `value`.
 * The field descripts AST node context.
 */
export function resetFieldInfo(root) {
  root.typeInfo = typeInfo(root);
  let i = root;
  do {
    let f = i.parent && i.parent.typeInfo;
    if (f && f.fieldsMap) f = i.fieldInfo = f.fieldsMap.get(i.pos);
    let ti = (f && f.ti) || typeInfo(i);
    switch (i.type) {
      case Tag.Array:
        ti = f;
        break;
      case Tag.ArrayPattern:
        ti = f && f.declVar ? arrayPattern : arrayAssignmentPattern;
        break;
      case Tag.ObjectPattern:
        ti = f && f.declVar ? objectPattern : objectAssignmentPattern;
        break;
      case Tag.RestElement:
        ti = f && f.declVar ? restElement : restElementAssignment;
        break;
      case Tag.AssignmentExpression:
        ti = i.node.operator === "=" ? assignmentOpEq : assignmentOpDefault;
        break;
      case Tag.ObjectProperty:
        if (i.node.computed) ti = ti.propAlt;
        else if (f && f.declVar) ti = assignmentProperty;
        break;
      case Tag.AssignmentPattern:
        if (!f || !f.declVar) ti = symInfo(Tag.AssignmentExpression);
        break;
      case Tag.MemberExpression:
      case Tag.ObjectMethod:
      case Tag.ClassProperty:
      case Tag.ClassMethod:
      case Tag.ClassPrivateMethod:
      case Tag.ClassPrivateProperty:
        if (i.node.computed) ti = ti.propAlt;
        break;
    }
    i.typeInfo = ti;
  } while ((i = next(i)) !== root);
  return root;
}

/** runs iterable `s` and ignores its output, returns its result */
export function skip(s) {
  const iter = s[Symbol.iterator]();
  let item;
  /* eslint-disable no-empty */
  for (; !(item = iter.next()).done; ) {}
  return item.value;
}

export function error(msg, doc) {
  const file = config.babelFile;
  if (!file) return new SyntaxError(msg);
  for (let i = doc; i; i = i.parent) {
    if (i.node.loc || i.node._loc) return file.buildCodeFrameError(i.node, msg);
  }
  return file.buildCodeFrameError(doc.node, msg);
}

/**  same as `Array.from` but outputs the array into `buf` and returns iterable result */
export function result(s, buf) {
  const iter = s[Symbol.iterator]();
  let item;
  while (!(item = iter.next()).done) buf.push(item.value);
  return item.value;
}

/**
 * same as `Array.from` but returns `s` if it is already `Array`
 */
export function toArray(s) {
  if (Array.isArray(s)) return s;
  const res = [];
  result(s, res);
  return res;
}

/** converts stream to a fully calculated DOM node */
export function fromIterable(s) {
  const iter = lookahead(s);
  while (iter.step()) {}
  return iter.first;
}

/** returns all ancestors of `node` (until and including root) */
export function* ancestors(value) {
  for (let i = value.parent; i; i = i.parent) yield i;
}

export function clone(doc) {
  if (!doc) return doc;
  let i = doc;
  do {
    const node = i.node;
    i.data = {
      ...i,
      node: Array.isArray(node) ? [...node] : { ...node },
      id: valCount++
    };
  } while ((i = next(i)) !== doc);
  i = doc;
  do {
    const { data } = i;
    if (i.parent) data.parent = i.parent.data;
    if (i.firstChild) data.firstChild = i.firstChild.data;
    data.prevSibling = i.prevSibling.data;
    data.nextSibling = i.nextSibling.data;
  } while ((i = next(i)) !== doc);
  const res = doc.data;
  res.prevSibling = res.nextSibling = res;
  return res;
}
