import {
  Tag,
  VISITOR_KEYS,
  nodeInfo,
  symName,
  invariant,
  isNode,
  assignmentOpEq,
  assignmentOpDefault,
  symInfo,
  typeInfo,
  arrayPattern,
  arrayAssignmentPattern,
  objectPattern,
  objectAssignmentPattern,
  restElement,
  restElementAssignment,
  assignmentProperty
} from "./v2/types";

export * from "./v2/types";

export function enter(pos, type, value) {
  invariant(pos && type && value);
  return { enter: true, leave: false, pos, type, value };
}

export function leave(pos, type, value) {
  return { enter: false, leave: true, pos, type, value };
}

export function tok(pos, type, value) {
  return { enter: true, leave: true, pos, type, value };
}

/**
 * converts AST `node` into a stream of tokens with initial position `pos`
 * and intial tag's value - `value`
 */
export function* produce(node, pos, value) {
  function* _produce(node, pos, value) {
    value.node = node;
    if (node == null) {
      if (pos === Tag.push) yield tok(pos, Tag.Empty, { node: null });
    } else if (Array.isArray(node)) {
      yield enter(pos, Tag.Array, value);
      for (const i of node) yield* _produce(i, Tag.push, {});
      yield leave(pos, Tag.Array, value);
    } else if (isNode(node)) {
      const keys = VISITOR_KEYS[node.type];
      const ti = nodeInfo(node);
      const type = ti.sym;
      if (keys.length) {
        yield enter(pos, type, value);
        for (const i of keys) {
          const v = node[i];
          if (v != null) {
            yield* _produce(node[i], Tag[i] || i, {});
          }
        }
        yield leave(pos, type, value);
      } else {
        yield tok(pos, type, value);
      }
    }
  }
  yield* _produce(node, pos || Tag.top, value || {});
}

/**
 * converts stream of tokens into AST node
 */
export function consume(s) {
  const stack = [{}];
  for (const i of s) {
    const ti = typeInfo(i);
    if (i.type == null || ti.kind === "ctrl") continue;
    if (i.enter) {
      if (i.type === Tag.Array) stack.unshift([]);
      //TODO: another step to handle nulls
      else if (i.type === Tag.Null) {
        if (i.pos !== Tag.push) stack[0][symName(i.pos)] = null;
        continue;
      } else {
        if (i.value != null) {
          if (ti.esType != null) i.value.node.type = ti.esType;
          if (ti.fields) Object.assign(i.value.node, ti.fields);
        }
        const node = i.type === Tag.Empty ? null : i.value.node;
        invariant(!node || node.type);
        stack.unshift(node);
      }
    }
    if (i.leave) {
      const node = stack.shift();
      if (i.pos === Tag.push) {
        stack[0].push(node);
      } else stack[0][symName(i.pos)] = node;
    }
  }
  return stack[0];
}

/**
 * unwraps tokens formerly folded into Node sub-token
 */
export function* reproduceNodes(s) {
  for (const i of s) {
    if (i.type === Tag.Node) {
      if (i.enter) {
        yield* produce(i.value.node, i.pos);
      } else yield i;
    }
  }
}

/**
 * Resets `fieldInfo` field in each `value`.
 * The field descripts AST node context.
 */
export function* resetFieldInfo(s) {
  const stack = [];
  for (const i of s) {
    if (i.enter) {
      let f = stack[stack.length - 1];
      if (f && f.fieldsMap) {
        f = i.value.fieldInfo = f.fieldsMap.get(i.pos);
      }
      let ti = (f && f.ti) || typeInfo(i);
      switch (ti.kind) {
        case "array":
          stack.push(i.value.fieldInfo);
          break;
        case "node":
          // babel validator hacks
          // TODO: own model description
          switch (i.type) {
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
              ti =
                i.value.node.operator === "="
                  ? assignmentOpEq
                  : assignmentOpDefault;
              break;
            case Tag.ObjectProperty:
              if (i.value.node.computed) ti = ti.propAlt;
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
              if (i.value.node.computed) ti = ti.propAlt;
              break;
          }
          stack.push(ti);
          break;
        default:
          stack.push(false);
      }
    }
    if (i.leave) stack.pop();
    yield i;
  }
}

/** interprets `Tag.Null` tokens by changing AST accordingly */
export function* removeNulls(s) {
  const stack = [];
  for (const i of s) {
    if (i.type === Tag.Null && i.pos !== Tag.push) {
      if (i.enter && stack[0]) {
        stack[0][symName(i.pos)] = null;
      }
      continue;
    }
    yield i;
    if (i.enter) stack.unshift(i.value.node);
    if (i.leave) stack.shift();
  }
}

/** converts compile time constant into a list of tokens */
export function* emitConst(pos, ...args) {
  for (const value of args) {
    switch (typeof value) {
      case "number":
        yield tok(pos, Tag.NumericLiteral, { node: { value } });
        continue;
      case "string":
        yield tok(pos, Tag.StringLiteral, { node: { value } });
        continue;
      case "boolean":
        yield tok(pos, Tag.BooleanLiteral, { node: { value } });
        continue;
      case "object":
        if (value === null) {
          yield tok(pos, Tag.NullLiteral, { node: {} });
          continue;
        }
        if (value.emitConstMethod) {
          yield* value.emitConstMethod(pos);
          continue;
        }
        if (Array.isArray(value)) {
          const ival = { node: {} };
          const aval = { node: [] };
          yield enter(pos, Tag.ArrayExpression, ival);
          yield enter(Tag.elements, Tag.Array, aval);
          for (const j of value) yield* emitConst(Tag.push, j);
          yield leave(Tag.elements, Tag.Array, aval);
          yield leave(pos, Tag.ArrayExpression, ival);
          continue;
        }
        const ival = { node: {} };
        const aval = { node: [] };
        yield enter(pos, Tag.ObjectExpression, ival);
        yield enter(Tag.properties, Tag.Array, aval);
        for (const name in value) {
          const pval = { node: {} };
          yield enter(Tag.push, Tag.ObjectProperty, pval);
          yield tok(Tag.key, Tag.Identifier, { node: { name } });
          yield* emitConst(Tag.value, value[name]);
          yield leave(Tag.push, Tag.ObjectProperty, pval);
        }
        yield leave(Tag.properties, Tag.Array, aval);
        yield leave(pos, Tag.ObjectExpression, ival);
        continue;
    }
    const val = { node: { operator: "void" } };
    yield enter(pos, Tag.UnaryExpression, val);
    yield tok(Tag.argument, Tag.NumericLiteral, { node: { value: "0" } });
    yield leave(pos, Tag.UnaryExpression, val);
  }
}
