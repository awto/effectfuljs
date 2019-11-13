import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";

const { Tag } = Kit;
const { sysSym } = Scope;

function needsResult(doc) {
  switch (doc.pos) {
    case Tag.update:
    case Tag.expression:
      return false;
    case Tag.push:
      const parent = doc.parent;
      if (parent.parent.type === Tag.SequenceExpression)
        return (
          doc.nextSibling === parent.firstChild && needsResult(parent.parent)
        );
  }
  return true;
}

/**
 * converts update expressions and assignments without `=` operation into
 * assignments with `=`
 */

export function normalizeAssign() {
  const file = Ctx.root;
  for (let i = file.nextUpdateExpression, n; i !== file; i = n) {
    n = i.nextUpdateExpression;
    const operator = i.node.operator[0];
    const p = i.prevUpdateExpression;
    (p.nextUpdateExpression = n).prevUpdateExpression = p;
    i.nextAssignmentExpression = file;
    file.prevAssignmentExpression = (i.prevAssignmentExpression =
      file.prevAssignmentExpression).nextAssignmentExpression = i;
    op(
      i,
      i.firstChild,
      Kit.num(Tag.right, 1),
      operator[0],
      !i.node.prefix && needsResult(i)
    );
  }
  for (
    let i = file.nextAssignmentExpression;
    i !== file;
    i = i.nextAssignmentExpression
  ) {
    const { operator } = i.node;
    if (operator === "=") continue;
    const arg = i.firstChild;
    const rarg = Kit.detach(arg.nextSibling);
    op(i, arg, rarg, operator.substr(0, operator.length - 1), false);
  }
  function op(i, arg, rarg, operator, retOld) {
    const seq = Kit.arr(Tag.expressions);
    const seqExpr = Kit.node(i.pos, Tag.SequenceExpression);
    i.pos = Tag.push;
    Kit.replace(i, seqExpr);
    Kit.append(seq, i);
    Kit.append(seqExpr, seq);
    let lhs, larg;
    const scope = i.parentFunc;
    const root = scope.funcDef;
    if (arg.type === Tag.MemberExpression) {
      let tempObj, tempProp;
      const obj = arg.firstChild;
      const prop = obj.nextSibling;
      const { computed } = arg.node;
      if (computed && !isPure(prop)) tempProp = absTemp(root, prop, i);
      if (!isPure(obj)) tempObj = absTemp(root, obj, i);
      lhs = memExpr(computed, prop, tempProp, obj, tempObj, scope);
      Kit.replace(arg, lhs);
      larg = memExpr(computed, prop, tempProp, obj, tempObj, scope);
    } else if (arg.type === Tag.Identifier) {
      lhs = arg;
      lhs.pos = Tag.left;
      larg = Scope.id(Tag.left, arg.sym, arg.scope);
    } else {
      throw Kit.error(`Invalid left-hand side expression`, i);
    }
    if (retOld) {
      const oldTmp = Scope.tempSym(root, scope);
      assignTemp(oldTmp, larg, i);
      larg = Scope.tempId(Tag.left, oldTmp, scope);
      Kit.insertAfter(i, Scope.tempId(Tag.push, oldTmp, scope));
    }
    i.type = Tag.AssignmentExpression;
    i.node.operator = "=";
    const binExpr = Kit.tok(Tag.right, Tag.BinaryExpression, { operator });
    Kit.insertBefore(Kit.append(binExpr, rarg), larg);
    Kit.insertAfter(lhs, binExpr);
  }
}

function assignTemp(sym, doc, before) {
  const expr = Kit.assign(Tag.push);
  doc.pos = Tag.right;
  Kit.insertAfter(Kit.append(expr, Kit.id(Tag.left, sym)), doc);
  Kit.insertBefore(before, expr);
  return expr;
}

function copy(pos, doc, tempObj, scope) {
  return tempObj
    ? Scope.tempId(pos, tempObj, scope)
    : doc.type === Tag.Identifier
    ? Scope.id(pos, doc.sym, scope)
    : Kit.clone(doc);
}

function absTemp(root, doc, before) {
  const scope = root.origFunc;
  const expr = Kit.assign(Tag.push);
  const sym = Scope.tempSym(root, scope);
  Kit.detach(doc);
  doc.pos = Tag.right;
  Kit.insertAfter(Kit.append(expr, Kit.id(Tag.left, sym)), doc);
  Kit.insertBefore(before, expr);
  return sym;
}

function memExpr(computed, prop, tempProp, obj, tempObj, scope) {
  const memExpr = Kit.tok(Tag.left, Tag.MemberExpression, { computed });
  Kit.insertAfter(
    Kit.append(memExpr, copy(Tag.object, obj, tempObj, scope)),
    computed
      ? copy(Tag.property, prop, tempProp, scope)
      : Kit.tok(Tag.property, Tag.Identifier, { name: prop.node.name })
  );
  return memExpr;
}

function isPure(doc) {
  switch (doc.type) {
    case Tag.Identifier:
    case Tag.RegExpLiteral:
    case Tag.NullLiteral:
    case Tag.StringLiteral:
    case Tag.BooleanLiteral:
    case Tag.NumericLiteral:
      return true;
  }
  return false;
}

/** replaces assignments with API calls */
export function setters() {
  const file = Ctx.root;
  const opSym = Scope.sysSym("set");
  const opLocSym = Scope.sysSym("lset");
  const opGlobSym = Scope.sysSym("gset");
  for (
    let i = file.nextAssignmentExpression;
    i !== file;
    i = i.nextAssignmentExpression
  ) {
    const arg = i.firstChild;
    const rarg = arg.nextSibling;
    Kit.detach(arg);
    Kit.detach(rarg);
    replaceModOp(i, arg, rarg, opSym, opLocSym, opGlobSym);
  }
}

/** replaces delete operations with API calls */
export function deleters() {
  const file = Ctx.root;
  const opSym = Scope.sysSym("del");
  const opLocSym = Scope.sysSym("ldel");
  const opGlobSym = Scope.sysSym("gdel");
  for (
    let i = file.nextDeleteExpression;
    i !== file;
    i = i.nextDeleteExpression
  ) {
    replaceModOp(i, Kit.detach(i.firstChild), null, opSym, opLocSym, opGlobSym);
  }
}

function replaceModOp(i, arg, rarg, opSym, opLocSym, opGlobSym) {
  const args = Kit.arr(Tag.arguments);
  const scope = Scope.parentScope(i);
  i.type = Tag.CallExpression;
  let calleeSym;
  if (arg.type === Tag.MemberExpression) {
    calleeSym = opSym;
    const obj = arg.firstChild;
    const prop = obj.nextSibling;
    prop.pos = obj.pos = Tag.push;
    Kit.append(args, Kit.detach(obj));
    if (arg.node.computed) Kit.append(args, Kit.detach(prop));
    else Kit.append(args, Kit.str(Tag.push, prop.node.name));
  } else if (arg.type === Tag.Identifier) {
    const sym = arg.sym;
    if (sym.decl) {
      calleeSym = opLocSym;
      Kit.append(args, Scope.scopeExpr(Tag.push, scope, sym.scope));
    } else {
      calleeSym = opGlobSym;
      Kit.append(args, Kit.id(Tag.push, Scope.globalSym));
    }
    Kit.append(args, Kit.str(Tag.push, sym.name));
  } else throw Kit.error(`Invalid left-hand side expression`, i);
  if (rarg) {
    rarg.pos = Tag.push;
    Kit.append(args, rarg);
  }
  Kit.insertBefore(Kit.append(i, args), Scope.sysId(Tag.callee, calleeSym));
}

/** replaces `a.b(...args)` with `mcall(b, a, ...args)` */
export function methodCalls() {
  const file = Ctx.root;
  const opSym = Scope.sysSym("mcall");
  for (let i = file.nextCallExpression, n; i !== file; i = n) {
    n = i.nextCallExpression;
    if (i.type !== Tag.CallExpression) continue;
    const callee = i.firstChild;
    if (callee.type !== Tag.MemberExpression) continue;
    const obj = callee.firstChild;
    const args = callee.nextSibling;
    Kit.replace(callee, Scope.sysId(callee.pos, opSym));
    let prop = Kit.detach(obj.nextSibling);
    prop.pos = obj.pos = Tag.push;
    if (!callee.node.computed) prop = Kit.str(Tag.push, prop.node.name);
    Kit.insertAfter(Kit.prepend(args, prop), Kit.detach(obj));
    (n.prevCallExpression = i.prevCallExpression).nextCallExpression = n;
  }
}

/** replaces `a(...args)` with `(context.call = a)(...args)` */
export function assignCall() {
  const file = Ctx.root;
  const opSym = Scope.sysSym("context");
  for (let i = file.nextCallExpression; i !== file; i = i.nextCallExpression) {
    const callee = i.firstChild;
    const assign = Kit.assign(Tag.callee);
    callee.pos = Tag.right;
    callee.type === Tag.MemberExpression && callee.firstChild;
    Kit.replace(callee, assign);
    Kit.append(assign, callee);
    Kit.insertAfter(
      Kit.append(
        Kit.insertBefore(callee, Kit.node(Tag.left, Tag.MemberExpression)),
        Scope.sysId(Tag.object, opSym)
      ),
      Kit.tok(Tag.property, Tag.Identifier, { name: "call" })
    );
    if (callee.type === Tag.MemberExpression && i.type === Tag.CallExpression) {
      const obj = callee.firstChild;
      const args = assign.nextSibling;
      assign.pos = Tag.object;
      const callProp = Kit.node(Tag.callee, Tag.MemberExpression);
      Kit.replace(assign, callProp);
      Kit.insertBefore(
        Kit.append(
          callProp,
          Kit.tok(Tag.property, Tag.Identifier, { name: "dbg$call" })
        ),
        assign
      );
      const objCopy =
        obj.type === Tag.Identifier && obj.sym
          ? Scope.id(Tag.push, obj.sym, Scope.parentScope(i))
          : Kit.clone(obj);
      objCopy.pos = Tag.push;
      Kit.prepend(args, objCopy);
    }
  }
}

const assignmentOps = {
  "=": sysSym("set"),
  "+=": sysSym("plusAssignOp"),
  "-=": sysSym("minusAssignOp"),
  "*=": sysSym("multAssignOp"),
  "/=": sysSym("divAssignOp"),
  "%=": sysSym("modAssignOp"),
  "<<=": sysSym("lshiftAssignOp"),
  ">>=": sysSym("rshiftAssignOp"),
  ">>>=": sysSym("rushiftAssignOp"),
  "|=": sysSym("bwOrAssignOp"),
  "^=": sysSym("bwXorAssignOp"),
  "&=": sysSym("bwAndAssignOp")
};

const unaryOps = {
  "-": sysSym("unaryMinusOp"),
  "+": sysSym("unaryPlusOp"),
  "!": sysSym("notOp"),
  "~": sysSym("invertOp"),
  typeof: sysSym("typeofOp"),
  void: sysSym("voidOp"),
  delete: sysSym("del")
};

const binaryOps = {
  "==": sysSym("eqOp"),
  "!=": sysSym("neqOp"),
  "===": sysSym("strictEqOp"),
  "!==": sysSym("strictNeqOp"),
  "<": sysSym("lsOp"),
  "<=": sysSym("leOp"),
  ">": sysSym("mrOp"),
  ">=": sysSym("meOp"),
  "<<": sysSym("lshiftOp"),
  ">>": sysSym("rshiftOp"),
  ">>>": sysSym("urshiftEqOp"),
  "+": sysSym("plusOp"),
  "-": sysSym("minusOp"),
  "*": sysSym("multOp"),
  "/": sysSym("divOp"),
  "%": sysSym("modOp"),
  "|": sysSym("bwOrOp"),
  "^": sysSym("bwXorOp"),
  "&": sysSym("bwAndOp"),
  in: sysSym("inOp"),
  instanceof: sysSym("instanceOfOp")
};

const updateOps = {
  "++": sysSym("incrOp"),
  "--": sysSym("decrOp")
};

const prefixUpdateOps = {
  "++": sysSym("prefixIncrOp"),
  "--": sysSym("prefixDecrOp")
};

const logicalOps = {
  "||": sysSym("orOp"),
  "&&": sysSym("andOp")
};

const opNamesMap = new Map();

export function getOpName(i) {
  switch (i.type) {
    case Tag.AssignmentExpression:
      return assignmentOps[i.node.operator];
    case Tag.BinaryExpression:
      return binaryOps[i.node.operator];
    case Tag.UnaryExpression:
      return unaryOps[i.node.operator];
    case Tag.UpdateExpression:
      return (i.node.prefix ? prefixUpdateOps : updateOps)[i.node.operator];
    case Tag.LogicalExpression:
      return logicalOps[i.node.operator];
    case Tag.YieldExpression:
      if (i.node.delegate) return sysSym("yldStar");
      return sysSym("yld");
    case Tag.AwaitExpression:
      return sysSym("chain");
  }
  let res = opNamesMap.get(i.type);
  if (res != null) return res;
  res = sysSym(
    Kit.symName(i.type)
      .match(/[A-Z]/g)
      .join("")
  );
  opNamesMap.set(i.type, res);
  return res;
}
