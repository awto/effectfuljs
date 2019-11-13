import {
  VISITOR_KEYS,
  NODE_FIELDS,
  ALIAS_KEYS,
  BUILDER_KEYS
} from "@babel/types";

const SYMBOLS_IMPL = "sym";

export { VISITOR_KEYS };

const GLOBAL_SYMBOLS = SYMBOLS_IMPL === "sym";
const OBJ_SYMBOLS = SYMBOLS_IMPL === "obj";
const STR_SYMBOLS = SYMBOLS_IMPL === "str";
const NUM_SYMBOLS = SYMBOLS_IMPL === "num";
let nameCount = 0;
const symbols = NUM_SYMBOLS ? [] : new Map();
//TODO: fields used only with a single type
// const fieldTypes = new Map()

let defaultSymbol;

export const symInfo = OBJ_SYMBOLS
  ? function symInfo(sym) {
      return sym;
    }
  : NUM_SYMBOLS
  ? function symInfo(sym) {
      return symbols[sym] || defaultSymbol;
    }
  : function symInfo(sym) {
      return symbols.get(sym) || defaultSymbol;
    };

export const isSymbol = OBJ_SYMBOLS
  ? function(sym) {
      return sym && sym.kind != null;
    }
  : NUM_SYMBOLS
  ? function(sym) {
      return typeof sym === "number";
    }
  : STR_SYMBOLS
  ? function(sym) {
      return sym.substr != null;
    }
  : function(sym) {
      return typeof sym === "symbol";
    };

export function typeInfo(i) {
  return i.typeInfo || (i.typeInfo = symInfo(i.type));
}

export const symName = OBJ_SYMBOLS
  ? function symName(s) {
      return s.name;
    }
  : STR_SYMBOLS
  ? function symName(s) {
      return s;
    }
  : GLOBAL_SYMBOLS
  ? Symbol.keyFor
  : function symName(s) {
      return symInfo(s).name;
    };

const symDict = {};

export const newSymbol = OBJ_SYMBOLS
  ? function newSymbol(n) {
      return (
        symDict[n] ||
        (symDict[n] = {
          sym: null,
          name: null,
          kind: null,
          x: null,
          prop: null
        })
      );
    }
  : STR_SYMBOLS
  ? function(v) {
      return v;
    }
  : NUM_SYMBOLS
  ? function(n) {
      const x = ++nameCount;
      return (
        symDict[n] ||
        (symDict[n] = { sym: x, name: null, kind: null, x, prop: null })
      ).sym;
    }
  : GLOBAL_SYMBOLS
  ? Symbol.for
  : Symbol;

export function nodeInfo(node) {
  return symInfo(Tag[node.type]);
}

export function symKind(sym) {
  return symInfo(sym).kind;
}

export function fieldInfo(type, field) {
  const e = symInfo(type);
  if (e == null || e.fieldsMap == null) return null;
  return e.fieldsMap.get(field);
}

export const symbol = OBJ_SYMBOLS
  ? function symbol(name, kind = "ctrl") {
      const res = {
        sym: null,
        name,
        kind,
        x: ++nameCount,
        prop: null
      };
      res.sym = res;
      return (symDict[name] = res);
    }
  : NUM_SYMBOLS
  ? function symbol(name, kind = "ctrl") {
      const res = newSymbol(name);
      symbols[res] = {
        sym: res,
        name,
        kind,
        x: res,
        prop: null
      };
      return res;
    }
  : function symbol(name, kind = "ctrl") {
      const res = newSymbol(name);
      symbols.set(res, {
        sym: res,
        name,
        kind,
        x: ++nameCount,
        prop: null
      });
      return res;
    };

export const symbolDefFor = OBJ_SYMBOLS
  ? function symbolDefFor(name, kind) {
      let sym = Tag[name];
      if (sym == null) {
        Tag[name] = sym = symDict[name] = {
          sym,
          name,
          kind,
          x: ++nameCount,
          expr: false,
          block: false,
          key: false,
          lval: false,
          decl: false,
          func: false
        };
        if (kind === "node") sym.esType = name;
        sym.sym = sym;
      } else {
        invariant(kind === sym.kind);
      }
      return sym;
    }
  : NUM_SYMBOLS
  ? function symbolDefFor(name, kind) {
      let sym = Tag[name],
        def;
      if (sym == null) {
        Tag[name] = sym = newSymbol(name);
        def = {
          sym,
          name,
          kind,
          x: sym,
          expr: false,
          block: false,
          key: false,
          lval: false,
          decl: false,
          func: false
        };
        if (kind === "node") def.esType = name;
        symbols[sym] = def;
      } else {
        def = symInfo(sym);
        invariant(def);
        invariant(kind === def.kind);
      }
      return def;
    }
  : function symbolDefFor(name, kind) {
      let sym = Tag[name],
        def;
      if (sym == null) {
        Tag[name] = sym = newSymbol(name);
        def = {
          sym,
          name,
          kind,
          x: ++nameCount,
          expr: false,
          block: false,
          key: false,
          lval: false,
          decl: false,
          func: false
        };
        if (kind === "node") def.esType = name;
        symbols.set(sym, def);
      } else {
        def = symInfo(sym);
        invariant(def);
        invariant(kind === def.kind);
      }
      return def;
    };

export const TypeInfo = {};

export const Tag = {
  push: symbol("push", "pos"),
  top: symbol("top", "pos"),
  Array: symbol("Array", "array"),
  Node: symbol("Node", "node"),
  Null: symbol("Null", "null"),
  Empty: symbol("Empty", "empty"),
  root: symbol("root", "pos"),
  Root: symbol("Root", "ctrl")
};

for (const i in VISITOR_KEYS) {
  TypeInfo[i] = symbolDefFor(i, "node");
  for (const j of VISITOR_KEYS[i]) symbolDefFor(j, "pos").visitor = true;
  for (const j of BUILDER_KEYS[i]) symbolDefFor(j, "pos").builder = true;
}
for (const i in ALIAS_KEYS) {
  const def = symbolDefFor(i, "node");
  const aliases = def.aliases || (def.aliases = new Set());
  const aliasKeys = ALIAS_KEYS[i];
  if (aliasKeys != null) {
    for (const j of aliasKeys) {
      const adef = symbolDefFor(j, "alias");
      (adef.instances || (adef.instances = new Set())).add(def.sym);
      aliases.add(adef.sym);
    }
  }
}
{
  const idDef = symInfo(Tag.Identifier);
  idDef.fieldsMap = new Map([
    [
      Tag.name,
      {
        atomicType: "string",
        nodeTypes: new Set(),
        nillable: false,
        enumValues: null,
        default: null
      }
    ]
  ]);
  const meDef = symInfo(Tag.MemberExpression);
  meDef.fieldsMap = new Map([
    [
      Tag.property,
      {
        atimicType: null,
        nodeTypes: new Set([Tag.Identifier]),
        nillable: false,
        enumValues: null,
        default: null
      }
    ]
  ]);
}

for (const i in VISITOR_KEYS) {
  const nodeFields = NODE_FIELDS[i];
  const pos = Tag[i];
  const def = symInfo(pos);
  if (nodeFields != null) {
    const fieldsMap = def.fieldsMap || (def.fieldsMap = new Map());
    for (const j in nodeFields) {
      const jdef = nodeFields[j];
      const fdef = symbolDefFor(j, "pos");
      if (fieldsMap.has(fdef.sym)) continue;
      const info = getTy(jdef.validate, fdef.sym);
      info.default = jdef.default;
      fieldsMap.set(fdef.sym, info);
    }
  }
  function getTy(ty, pos) {
    let enumValues = null,
      nt = new Set(),
      atomicType = null,
      nillable = false;
    if (ty != null && ty.chainOf != null) {
      let chain = ty.chainOf.filter(
        i =>
          i.type != null ||
          i.oneOf != null ||
          i.each != null ||
          i.oneOfNodeTypes != null ||
          i.oneOfNodeOrValueTypes != null
      );
      if (chain.length === 1) {
        ty = chain[0];
      } else if (chain.length === 2) {
        if (chain[0].type === "array") {
          const elem = getTy(chain[1].each);
          if (pos === Tag.params) elem.declVar = true;
          return {
            array: true,
            elem: elem,
            fieldsMap: new Map([[Tag.push, elem]])
          };
        } else if (chain[0].type === "string") {
          invariant(chain[1].oneOf);
          enumValues = chain[1].oneOf;
          atomicType = "string";
          ty = null;
        } else {
          throw new Error("not implemented");
        }
      }
    }
    if (ty != null) {
      if (ty.type != null) {
        atomicType = ty.type;
      } else if (ty.oneOfNodeTypes != null) {
        for (const k of ty.oneOfNodeTypes) {
          const p = Tag[k];
          invariant(p);
          nt.add(p);
        }
      } else if (ty.oneOf != null) {
        const first = ty.oneOf.filter(i => i != null)[0];
        if (first.substr) {
          enumValues = ty.oneOf;
          atomicType = "string";
        } else if (first === true || first === false) {
          atomicType = "bool";
        }
      } else if (ty.oneOfNodeOrValueTypes != null) {
        nt = new Set();
        for (const k of ty.oneOfNodeOrValueTypes) {
          if (k === "null") {
            nillable = true;
          } else {
            const p = Tag[k];
            invariant(p);
            nt.add(p);
          }
        }
      } else {
        atomicType = "any";
      }
    }
    if (enumValues != null) {
      nillable = nillable || enumValues.indexOf(null) !== -1;
      enumValues = enumValues.filter(i => i != null);
      invariant(enumValues.filter(v => v.substr == null).length === 0);
    }
    const expr = nt.has(Tag.Expression),
      lval = nt.has(Tag.LVal) || nt.has(Tag.PatternLike) || pos === Tag.local;
    return {
      atomicType,
      nodeTypes: nt,
      nillable,
      enumValues,
      expr,
      stmt: nt.has(Tag.Statement),
      block: nt.has(Tag.BlockStatement) && !nt.has(Tag.Statement),
      key: nt.has(Tag.Identifier) && !expr && !lval,
      lval,
      decl: nt.has(Tag.VariableDeclaration) || nt.has(Tag.Declaration),
      mod: lval,
      declVar: pos === Tag.id
    };
  }
}

for (const i in VISITOR_KEYS) {
  const def = symInfo(Tag[i]);
  const aliases = def.aliases;
  def.func = aliases.has(Tag.Function);
  def.scope = aliases.has(Tag.FunctionParent);
  def.expr = aliases.has(Tag.Expression);
  def.decl = aliases.has(Tag.Declaration);
  def.stmt = aliases.has(Tag.BlockStatement) || aliases.has(Tag.Statement);
  def.block = aliases.has(Tag.BlockStatement) && !aliases.has(Tag.Statement);
  def.blockScope = false;
  def.funcScope = false;
  def.loopScope = false;
  def.declConstr = false;
  def.classDecl = false;
}

for (const i in Tag) {
  Tag[Tag[i]] = Tag[i];
}

function setComputed(sym, prop) {
  const me = symInfo(sym);
  me.propAlt = Object.assign({}, me, {
    fieldsMap: new Map(me.fieldsMap).set(prop, {
      atomicType: null,
      nillable: false,
      enumValues: null,
      expr: true,
      stmt: false,
      block: false,
      lval: false,
      decl: false,
      mod: false,
      declVar: false,
      nodeTypes: new Set([Tag.Expression])
    })
  });
  me.prop = Tag.computed;
}

setComputed(Tag.ObjectProperty, Tag.key);

symInfo(Tag.CatchClause).fieldsMap.get(Tag.param).declVar = true;
{
  for (const i of [
    Tag.ImportNamespaceSpecifier,
    Tag.ImportSpecifier,
    Tag.ImportDefaultSpecifier
  ])
    symInfo(i).fieldsMap.get(Tag.local).declVar = true;
}
setComputed(Tag.MemberExpression, Tag.property);
setComputed(Tag.ObjectMethod, Tag.key);
setComputed(Tag.ClassProperty, Tag.key);
setComputed(Tag.ClassMethod, Tag.key);
symInfo(Tag.UpdateExpression).fieldsMap.get(Tag.argument).mod = true;
symInfo(Tag.BlockStatement).block = true;
symInfo(Tag.SpreadElement).expr = true;
symInfo(Tag.VariableDeclaration).decl = true;
symInfo(Tag.FunctionDeclaration).decl = true;
symInfo(Tag.ClassDeclaration).decl = true;

export const assignmentOpEq = symInfo(Tag.AssignmentExpression);
export const assignmentOpDefault = Object.assign({}, assignmentOpEq, {
  fieldsMap: new Map(assignmentOpEq.fieldsMap).set(
    Tag.left,
    Object.assign({}, assignmentOpEq.fieldsMap.get(Tag.left), { expr: true })
  )
});

{
  const me = symInfo(Tag.AssignmentExpression);
  me.propAlt = Object.assign({}, me, {
    fieldsMap: new Map(me.fieldsMap).set(
      Tag.left,
      Object.assign({}, me.fieldsMap.get(Tag.left), { expr: true })
    )
  });
  me.prop = Tag.operator;
}
export const assignmentPattern = symInfo(Tag.AssignmentPattern);
export const objectProperty = symInfo(Tag.ObjectProperty);
export const assignmentProperty = symbolDefFor("AssignmentProperty", "node");
export const objectAssignmentPattern = symInfo(Tag.ObjectPattern);
export const objectPattern = Object.assign({}, objectAssignmentPattern, {
  fieldsMap: new Map(objectAssignmentPattern.fieldsMap)
});
{
  const prop = objectAssignmentPattern.fieldsMap.get(Tag.properties);
  const elem = Object.assign({}, prop.elem, { declVar: true });
  prop.elem.declVar = false;
  objectPattern.fieldsMap.set(
    Tag.properties,
    Object.assign({}, prop, { elem, fieldsMap: new Map([[Tag.push, elem]]) })
  );
}
export const arrayAssignmentPattern = symInfo(Tag.ArrayPattern);
export const arrayPattern = Object.assign({}, arrayAssignmentPattern, {
  fieldsMap: new Map(arrayAssignmentPattern.fieldsMap)
});
{
  const prop = arrayAssignmentPattern.fieldsMap.get(Tag.elements);
  const elem = Object.assign({}, prop.elem, { declVar: true });
  prop.elem.declVar = false;
  arrayPattern.fieldsMap.set(
    Tag.elements,
    Object.assign({}, prop, { elem, fieldsMap: new Map([[Tag.push, elem]]) })
  );
}
const patField = symInfo(Tag.VariableDeclarator).fieldsMap.get(Tag.id);
{
  assignmentPattern.fieldsMap.get(Tag.left).declVar = true;
  assignmentProperty.esType = "ObjectProperty";
  assignmentProperty.fieldsMap = new Map(objectProperty.fieldsMap);
  assignmentProperty.fieldsMap.set(Tag.value, patField);
}
export const restElementAssignment = symInfo(Tag.RestElement);
export const restElement = Object.assign({}, restElementAssignment, {
  fieldsMap: new Map(restElementAssignment.fieldsMap)
});
restElement.fieldsMap.set(Tag.argument, patField);

export function isNode(node) {
  if (node == null) return false;
  return typeof node === "object" && typeof node.type === "string";
}

export function invariant(value) {
  if (!value) throw new Error("INTERNAL: invariant");
}

export function isSynthetic(node) {
  return !node || node.loc == null;
}

defaultSymbol = symbolDefFor("unkn", "ctrl");

for (const i of [
  Tag.FunctionExpression,
  Tag.File,
  Tag.ArrowFunctionExpression,
  Tag.FunctionDeclaration,
  Tag.ClassMethod,
  Tag.ClassPrivateMethod,
  Tag.ObjectMethod
])
  symInfo(i).funcScope = true;

for (const i of [
  Tag.BlockStatement,
  Tag.Program,
  Tag.ForOfStatement,
  Tag.ForInStatement,
  Tag.ForStatement,
  Tag.SwitchStatement,
  Tag.CatchClause
])
  symInfo(i).blockScope = true;

for (const i of [
  Tag.WhileStatement,
  Tag.DoWhileStatement,
  Tag.ForStatement,
  Tag.ForInStatement,
  Tag.ForOfStatement
])
  symInfo(i).loopScope = true;

for (const i of [
  Tag.ClassExpression,
  Tag.ClassDeclaration,
  Tag.FunctionExpression,
  Tag.FunctionDeclaration,
  Tag.VariableDeclaration
])
  symInfo(i).declConstr = true;

for (const i of [Tag.ClassExpression, Tag.ClassDeclaration])
  symInfo(i).classDecl = true;
