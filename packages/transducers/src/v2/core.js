// drafts for the next version
import {
  invariant,
  typeInfo,
  Tag,
  VISITOR_KEYS,
  nodeInfo,
  isNode,
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
} from "../types";
import { reverse } from "./combinators";
import opts from "./config";

let valCount = 0;

export function empty() {
  return {
    type: Tag.Empty,
    pos: Tag.Empty,
    node: null,
    id: valCount++,
    parent: null
  };
}

export function build(pos, type, parent, node) {
  const res = empty();
  res.pos = pos;
  res.type = type;
  res.node = node;
  res.parent = parent;
  return res;
}

/**
 * converts each element of `s:Iterable<Value>` into two elements
 * `{start:boolean,value:Value}` with `start:true` on entering the token
 * and `start:false` on exit
 */
export function* hier(s) {
  let last = null;
  for (const i of s) {
    for (let j = i.parent; j !== last; j = j.parent)
      yield { start: false, value: j };
    last = i;
    yield { start: true, value: i };
  }
}

/**
 * converts AST `node` into a stream of tokens with initial position `pos`
 * and intial tag's value - `value`
 */
export function produce(node, pos, value, parent) {
  return _produce(build(pos || Tag.top, Tag.Empty, node, parent));

  function* _produce(value) {
    if (node == null) {
      if (value.pos === Tag.push) yield value;
    } else if (Array.isArray(node)) {
      value.type = Tag.Array;
      yield value;
      for (const i of node)
        yield* _produce(build(Tag.push, Tag.Empty, i, value));
    } else if (isNode(node)) {
      const keys = VISITOR_KEYS[node.type];
      const ti = nodeInfo(node);
      const type = ti.sym;
      value.type = type;
      if (keys.length) {
        yield value;
        for (const i of keys) {
          const v = node[i];
          if (v != null) yield* _produce(build(pos, Tag.Empty, v, value));
        }
      } else {
        value.type = type;
        yield value;
      }
    }
  }
}

/**
 * converts stream of tokens into AST node
 */
export function consume(s) {
  const stack = [{}];
  let last = null;
  for (const i of s) {
    for (let j = i.parent; j !== last; j = j.parent) {
      const node = stack.shift();
      if (j.pos === Tag.push) {
        stack[0].push(node);
      } else stack[0][symName(j.pos)] = node;
    }
    last = i;
    if (i.type === Tag.Array) stack.unshift([]);
    else {
      //TODO: another step to handle nulls
      const node = i.type === Tag.Empty ? null : i.node;
      invariant(!node || node.type);
      stack.unshift(node);
    }
  }
  return stack[0];
}

/**
 * Resets `fieldInfo` field in each `value`.
 * The field descripts AST node context.
 */
export function* resetFieldInfo(s) {
  for (const i of s) {
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
    yield i;
  }
}

/** converts compile time constant into a list of tokens */
export function* emitConst(pos, focus, value) {
  switch (typeof value) {
    case "number":
      yield build(pos, Tag.NumericLiteral, { value }, focus);
      break;
    case "string":
      yield build(pos, Tag.StringLiteral, { value }, focus);
      break;
    case "boolean":
      yield build(pos, Tag.BooleanLiteral, { value }, focus);
      break;
    case "object":
      if (value === null) {
        yield build(pos, Tag.NullLiteral, {}, focus);
        break;
      }
      if (value.emitConstMethod) {
        yield* value.emitConstMethod(pos, focus);
        break;
      }
      const saved = focus;
      if (Array.isArray(value)) {
        yield (focus = build(pos, Tag.ArrayExpression, {}, focus));
        yield (focus = build(Tag.elements, Tag.Array, [], focus));
        for (const j of value) yield* emitConst(Tag.push, focus, j);
      } else {
        yield (focus = build(pos, Tag.ObjectExpression, {}, focus));
        yield (focus = build(Tag.properties, Tag.Array, [], focus));
        for (const name in value) {
          const saved = focus;
          yield (focus = build(Tag.push, Tag.ObjectProperty, {}, focus));
          yield (focus = build(Tag.key, Tag.Identifier, { name }, focus));
          yield* emitConst(Tag.value, focus, value[name]);
          focus = saved;
        }
      }
      focus = saved;
      break;
    default:
      yield (focus = build(
        pos,
        Tag.UnaryExpression,
        { operator: "void" },
        focus
      ));
      yield build(Tag.argument, Tag.NumericLiteral, { value: "0" });
      focus = focus.parent;
  }
}

/** runs iterable `s` and ignores its output, returns its result */
export function skip(s) {
  const iter = s[Symbol.iterator]();
  const babel = opts.babel;
  let item;
  if (!babel || opts.debug) {
    /* eslint-disable no-empty */
    for (; !(item = iter.next()).done; ) {}
  } else {
    let node;
    try {
      for (; !(item = iter.next()).done; ) {
        const next = item.value.node;
        if (next && (next._loc || next.loc)) node = next;
      }
    } catch (e) {
      if (!e.esNode) e.esNode = node;
      throw e;
    }
  }
  return item.value;
}

/**
 * same as `Array.from` but outputs the array into `buf`
 * and returns iterable result
 */
export function result(s, buf) {
  const iter = s[Symbol.iterator]();
  let item;
  // for debugging purposes,
  // let the debugger catch the exception in browser
  if (!opts.babel || opts.debug) {
    for (; !(item = iter.step()).done; ) buf.push(item.value);
  } else {
    try {
      for (; !(item = iter.step()).done; ) buf.push(item.value);
    } catch (e) {
      if (e.esNode) throw e;
      let msg = (e.origMessage = e.origMessage || e.message);
      let node = e.esNode || item.node;
      if (!node || (!node.loc && !node._loc)) {
        msg += " (the position is approximated)";
        for (const i of reverse(buf)) {
          node = i.value.node;
          if (node && (node.loc || node._loc)) {
            e.esNode = node;
            break;
          }
        }
      } else e.esNode = node;
      e.message = msg;
      throw e;
    }
  }
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

function Lookahead(iter) {
  this.buf = (this.inner = iter[Symbol.iterator]()).next();
}

Lookahead.prototype[Symbol.iterator] = function() {
  return this;
};

Lookahead.next = function() {
  const res = this.buf;
  this.buf = this.iter.next();
  return res;
};

export function lookahead(iter) {
  return new Lookahead(iter);
}

export function* sub(exit, s) {
  while (s.buf.parent !== exit) {
    yield s.next();
  }
}

export function adjustFieldTypeImpl(s) {
  s = lookahead(s);
  return _adjustFieldTypeImpl(s.next().value);
  function* _adjustFieldTypeImpl(first) {
    yield first;
    for (const i of sub(first, s)) {
      const fi = i.fieldInfo || {};
      const ti = typeInfo(i);
      if (
        (i.type === Tag.Array && fi.array) ||
        (i.type !== Tag.Array && !ti.stmt && !ti.block && !ti.expr) ||
        (fi.stmt && ti.stmt) ||
        (fi.expr && ti.expr) ||
        (fi.block && ti.block) ||
        (ti.decl && fi.decl)
      ) {
        yield i;
        continue;
      }
      if (i.type === Tag.Array) {
        if (fi.block || fi.stmt) {
          yield (i.parent = build(i.pos, Tag.BlockStatement, {}, i.parent));
          i.pos = Tag.body;
          yield* _adjustFieldTypeImpl(i);
        } else if (fi.expr) {
          yield (i.parent = build(i.pos, Tag.SequenceExpression, {}, i.parent));
          i.pos = Tag.expressions;
          yield* _adjustFieldTypeImpl(i);
        } else yield i;
        continue;
      }
      let focus = i.parent;
      if (fi.block) {
        yield (focus = build(i.pos, Tag.BlockStatement, {}, focus));
        yield (focus = build(Tag.body, Tag.Array, [], focus));
        if (ti.expr) {
          if (i.value.result) {
            yield (focus = build(Tag.push, Tag.ReturnStatement, {}, focus));
            i.pos = Tag.argument;
          } else {
            yield (focus = build(Tag.push, Tag.ExpressionStatement, {}, focus));
            i.pos = Tag.expression;
          }
        } else {
          invariant(ti.stmt);
          i.pos = Tag.push;
        }
        i.parent = focus;
        yield* _adjustFieldTypeImpl(i);
        continue;
      }
      if (fi.stmt && ti.expr) {
        if (i.value.result) {
          yield (focus = build(i.pos, Tag.ReturnStatement, {}, focus));
          i.pos = Tag.argument;
        } else {
          yield (focus = build(i.pos, Tag.ExpressionStatement, {}, focus));
          i.pos = Tag.expression;
        }
        i.parent = focus;
        yield* _adjustFieldTypeImpl(i);
        continue;
      }
      if (fi.expr) {
        yield (focus = build(i.pos, Tag.CallExpression, {}, focus));
        const call = focus;
        yield (focus = build(
          Tag.callee,
          Tag.ArrowFunctionExpression,
          { expression: true },
          focus
        ));
        yield (focus = build(Tag.params, Tag.Array, [], focus));
        if (!ti.block) {
          yield (focus = build(Tag.body, Tag.BlockStatement, {}, focus));
          yield (focus = build(Tag.body, Tag.Array, [], focus));
          i.pos = Tag.push;
        } else {
          i.pos = Tag.body;
        }
        i.parent = focus;
        yield* _adjustFieldTypeImpl(i);
        yield build(Tag.arguments, Tag.Array, [], call);
        continue;
      }
      yield i;
    }
  }
}

/** clones all tags and their `value` and `value.node` fields */
export function* clone(s) {
  let focus = null;
  let cloned = null;
  for (const i of s) {
    for (let j = i.parent; focus !== j; j = j.parent) cloned = cloned.parent;
    focus = i;
    cloned = { ...i, parent: cloned };
    yield cloned;
  }
}

export function setParentArr(s, parent) {
  s[0].parent = parent;
  return s;
}

export function* setParent(s, parent) {
  const iter = s[Symbol.iterator](s);
  let item = iter.next();
  if (!item.done) {
    item.value.parent = parent;
    yield item.value;
    while (!(item = iter.next()).done) yield item.value;
  }
  return item.value;
}

export function setPosArr(s, pos) {
  s[0].pos = pos;
  return s;
}

export function* setPos(s, pos) {
  const iter = s[Symbol.iterator](s);
  let item = iter.next();
  if (!item.done) {
    item.value.pos = pos;
    yield item.value;
    while (!(item = iter.next()).done) yield item.value;
  }
  return item.value;
}
