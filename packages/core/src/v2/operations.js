import config from "./config";
import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
import * as Dom from "./dom";
import * as path from "path";

const { Tag, append, num, insertAfter, insertBefore, arr, node } = Kit;

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
  file.nextSymStr = file.prevSymStr = file;
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
      num(Tag.right, 1),
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
    const seq = arr(Tag.expressions);
    const seqExpr = node(i.pos, Tag.SequenceExpression);
    i.pos = Tag.push;
    Kit.replace(i, seqExpr);
    append(seq, i);
    append(seqExpr, seq);
    let lhs, larg;
    const scope = Scope.parentScope(i);
    const root = i.parentFunc.funcDef;
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
      larg.nextGetterExpression = file;
      file.prevGetterExpression = (larg.prevGetterExpression =
        file.prevGetterExpression).nextGetterExpression = larg;
    } else if (arg.type === Tag.Identifier) {
      lhs = arg;
      lhs.pos = Tag.left;
      larg = Scope.id(Tag.left, arg.sym, arg.scope);
    } else {
      throw Kit.error(`Invalid left-hand side expression`, i);
    }
    if (retOld) {
      const oldTmp = Scope.tempSym(root, scope);
      const expr = Kit.assign(Tag.push);
      larg.pos = Tag.right;
      insertAfter(append(expr, Kit.id(Tag.left, oldTmp)), larg);
      insertBefore(i, expr);
      larg = Scope.tempId(Tag.left, oldTmp, scope);
      insertAfter(i, Scope.tempId(Tag.push, oldTmp, scope));
    }
    i.type = Tag.AssignmentExpression;
    i.node.operator = "=";
    const binExpr = Kit.tok(Tag.right, Tag.BinaryExpression, { operator });
    binExpr.isExpr = true;
    insertBefore(append(binExpr, rarg), larg);
    insertAfter(lhs, binExpr);
  }
}

function copy(pos, doc, tempObj, scope) {
  return tempObj ? Scope.tempId(pos, tempObj, scope) : Dom.clone(doc);
}

function absTemp(root, doc, before) {
  const scope = root.origFunc;
  const expr = Kit.assign(Tag.push);
  const sym = Scope.tempSym(root, scope);
  Kit.detach(doc);
  doc.pos = Tag.right;
  insertAfter(append(expr, Kit.id(Tag.left, sym)), doc);
  insertBefore(before, expr);
  return sym;
}

function memExpr(computed, prop, tempProp, obj, tempObj, scope) {
  const memExpr = Kit.tok(Tag.left, Tag.MemberExpression, { computed });
  memExpr.isExpr = true;
  insertAfter(
    append(memExpr, copy(Tag.object, obj, tempObj, scope)),
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

export function implicitCalls() {
  const file = Ctx.root;
  const getSym = Scope.sysSym("get");
  const hasSym = Scope.sysSym("has");
  for (
    let i = file.nextDeleteExpression;
    i !== file;
    i = i.nextDeleteExpression
  ) {
    if (i.firstChild.type === Tag.MemberExpression) i.eff = true;
  }
  for (
    let i = file.nextAssignmentExpression;
    i !== file;
    i = i.nextAssignmentExpression
  ) {
    if (i.firstChild.type === Tag.MemberExpression) i.eff = true;
  }
  for (
    let i = file.nextGetterExpression;
    i !== file;
    i = i.nextGetterExpression
  ) {
    const obj = i.firstChild;
    const prop = obj.nextSibling;
    Kit.detach(obj);
    Kit.detach(prop);
    const sym = i.type === Tag.MemberExpression ? getSym : hasSym;
    i.type = Tag.CallExpression;
    Kit.append(i, Scope.sysId(Tag.callee, sym));
    const args = Kit.append(i, Kit.arr(Tag.arguments));
    obj.pos = Tag.push;
    prop.pos = Tag.push;
    if (sym === getSym && !i.node.computed) {
      prop.type = Tag.StringLiteral;
      prop.node = { value: prop.node.name };
    }
    Kit.append(args, obj);
    Kit.append(args, prop);
    i.eff = true;
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
  const args = arr(Tag.arguments);
  const scope = Scope.parentScope(i);
  i.type = Tag.CallExpression;
  let calleeSym;
  if (arg.type === Tag.MemberExpression) {
    calleeSym = opSym;
    const obj = arg.firstChild;
    const prop = obj.nextSibling;
    prop.pos = obj.pos = Tag.push;
    append(args, Kit.detach(obj));
    if (arg.node.computed) append(args, Kit.detach(prop));
    else append(args, Kit.str(Tag.push, prop.node.name));
  } else if (arg.type === Tag.Identifier) {
    const sym = arg.sym;
    if (sym.decl) {
      calleeSym = opLocSym;
      append(args, Scope.scopeExpr(Tag.push, scope, sym));
    } else {
      calleeSym = opGlobSym;
      append(args, Kit.id(Tag.push, Scope.globalSym));
    }
    append(args, symStr(sym));
  } else throw Kit.error(`Invalid left-hand side expression`, i);
  if (rarg) {
    rarg.pos = Tag.push;
    append(args, rarg);
  }
  insertBefore(append(i, args), Scope.sysId(Tag.callee, calleeSym));
}

function symStr(sym) {
  if (!sym.decl) return Kit.str(Tag.push, sym.orig);
  const res = num(Tag.push, sym.index);
  if (config.debug && sym.orig)
    res.node.trailingComments = [
      {
        type: "CommentBlock",
        value: sym.orig || sym.name
      }
    ];
  const file = (res.prevSymStr = Ctx.root);
  const before = (res.nextSymStr = file.nextSymStr);
  before.prevSymStr = file.nextSymStr = res;
  res.sym = sym;
  return res;
}

export function replaceSymNames() {
  const file = Ctx.root;
  for (let i = file.nextSymStr; i !== file; i = i.nextSymStr)
    i.node.value = i.sym.index;
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
    // helping webpack
    if (obj.type === Tag.Identifier && obj.sym === Scope.requireSym) continue;
    const args = callee.nextSibling;
    Kit.replace(callee, Scope.sysId(callee.pos, opSym));
    let prop = Kit.detach(obj.nextSibling);
    prop.pos = obj.pos = Tag.push;
    if (!callee.node.computed) prop = Kit.str(Tag.push, prop.node.name);
    insertAfter(Kit.prepend(args, prop), Kit.detach(obj));
    (n.prevCallExpression = i.prevCallExpression).nextCallExpression = n;
  }
}

/** replaces `a(...args)` with `(context.call = a)(...args)` */
export function assignCall() {
  const { root } = Ctx;
  const { nsSym, ctxSym } = root;
  const aliases = config.moduleAliases || {};
  const relAlias = aliases["."];
  const opSym = Scope.contextSym;
  for (let i = root.nextCallExpression; i !== root; i = i.nextCallExpression) {
    const callee = i.firstChild;
    if (callee.type === Tag.Import) continue;
    let calleeObj;
    if (callee.type === Tag.MemberExpression) {
      calleeObj = callee.firstChild;
      if (
        calleeObj.type === Tag.Identifier &&
        calleeObj.sym === Scope.requireSym
      )
        continue;
    }
    if (
      i.type === Tag.CallExpression &&
      callee.type === Tag.Identifier &&
      callee.sym === Scope.requireSym
    ) {
      (i.prevCallExpression = i.nextCallExpression).prevCallExpression =
        i.prevCallExpression;
      const arg = callee.nextSibling.firstChild;
      if (arg.type === Tag.StringLiteral) {
        const alias = getAlias(arg.node.value);
        if (alias) arg.node.value = alias;
      }
      const seq = node(i.pos, Tag.SequenceExpression);
      Scope.replaceRhs(i, seq);
      const exprs = append(seq, arr(Tag.expressions));
      i.pos = Tag.push;
      append(
        insertAfter(
          append(
            insertAfter(
              append(
                append(exprs, Kit.assign(Tag.push)),
                Scope.sysMemExpr(Tag.left, opSym, "moduleId")
              ),
              node(Tag.right, Tag.CallExpression)
            ),
            Kit.memExpr(Tag.callee, Scope.requireSym, "resolve")
          ),
          arr(Tag.arguments)
        ),
        Dom.clone(arg)
      );
      append(
        insertAfter(
          append(
            append(exprs, node(Tag.push, Tag.CallExpression)),
            Kit.memExpr(Tag.callee, nsSym, "force")
          ),
          arr(Tag.arguments)
        ),
        i
      );
      continue;
    }
    if (config.expInlineCalls && i.type === Tag.CallExpression) {
      const seq = node(i.pos, Tag.SequenceExpression);
      const exprs = append(seq, arr(Tag.expressions));
      Scope.replaceRhs(i, seq);
      const root = i.parentFunc.funcDef;
      const args = callee.nextSibling;
      const firstArg = args.firstChild;
      let lastArg = firstArg;
      let calleeSym = root.calleeSym;
      let frameSym, shiftSym, argsSym, objSym;
      if (!root.calleeSym) {
        calleeSym = root.calleeSym = Scope.locFrameSym(root);
        frameSym = root.frameSym = Scope.locFrameSym(root);
        shiftSym = root.shiftSym = Scope.locFrameSym(root);
        argsSym = root.argsSym = Scope.locFrameSym(root);
      } else ({ calleeSym, frameSym, shiftSym, argsSym } = root);
      if (callee.type === Tag.MemberExpression)
        objSym = root.objSym || (root.objSym = Scope.locFrameSym(root));
      if (objSym) {
        const assignObj = append(exprs, Kit.assign(Tag.push));
        append(assignObj, Kit.id(Tag.left, objSym));
        const obj = callee.firstChild;
        Kit.replace(obj, Kit.id(Tag.object, objSym));
        obj.pos = Tag.right;
        Kit.append(assignObj, obj);
        Kit.replace(
          callee,
          Scope.sysMemExpr(Tag.callee, Scope.contextSym, "call")
        );
        Kit.prepend(args, (lastArg = Kit.id(Tag.push, objSym)));
      } else {
        Kit.replace(callee, Kit.id(Tag.callee, calleeSym));
      }
      const assignCallee = append(exprs, Kit.assign(Tag.push));
      append(assignCallee, Kit.id(Tag.left, calleeSym));
      append(assignCallee, callee);
      callee.pos = Tag.right;
      const assignShift = append(exprs, Kit.assign(Tag.push));
      append(assignShift, Kit.id(Tag.left, shiftSym));
      const shiftExpr = Kit.tok(Tag.right, Tag.MemberExpression, {
        computed: true
      });
      shiftExpr.isExpr = true;
      append(assignShift, shiftExpr);
      append(shiftExpr, Kit.id(Tag.object, calleeSym));
      append(shiftExpr, Scope.sysId(Tag.property, Scope.shiftPropSym));
      const cond = node(Tag.push, Tag.ConditionalExpression);
      append(exprs, cond);
      append(cond, Kit.id(Tag.test, shiftSym));
      const consequent = append(
        append(cond, node(Tag.consequent, Tag.SequenceExpression)),
        arr(Tag.expressions)
      );
      append(cond, i);
      i.pos = Tag.alternate;
      const frameAssign = append(consequent, Kit.assign(Tag.push));
      append(frameAssign, Kit.id(Tag.left, frameSym));
      const frameConstr = node(Tag.right, Tag.CallExpression);
      append(frameAssign, frameConstr);
      append(frameConstr, Scope.sysId(Tag.callee, Scope.callSym));
      const constrArgs = append(frameConstr, arr(Tag.arguments));
      append(
        constrArgs,
        objSym ? Kit.id(Tag.push, objSym) : Kit.void0(Tag.push)
      );
      append(constrArgs, Kit.id(Tag.push, calleeSym));
      append(constrArgs, Kit.id(Tag.push, ctxSym));
      let argsCount = 0;
      if (firstArg) {
        let arg = firstArg;
        const argsAssign = append(consequent, Kit.assign(Tag.push));
        append(argsAssign, Kit.id(Tag.left, argsSym));
        append(argsAssign, Kit.memExpr(Tag.right, frameSym, "$"));
        do {
          const argAssign = append(consequent, Kit.assign(Tag.push));
          const argMemExpr = node(Tag.left, Tag.MemberExpression);
          append(argAssign, argMemExpr);
          argMemExpr.node.computed = true;
          append(argMemExpr, Kit.id(Tag.object, argsSym));
          append(argMemExpr, plusShift(Tag.property, shiftSym, argsCount++));
          const clone = Dom.clone(arg);
          clone.pos = Tag.right;
          append(argAssign, clone);
        } while ((arg = arg.nextSibling) !== lastArg);
      }
      Kit.append(constrArgs, Kit.num(Tag.push, argsCount));
      const call = node(Tag.push, Tag.CallExpression);
      append(consequent, call);
      const handler = Kit.node(Tag.callee, Tag.MemberExpression);
      append(handler, Kit.memExpr(Tag.object, frameSym, "meta"));
      append(
        handler,
        Kit.tok(Tag.property, Tag.Identifier, { name: "handler" })
      );
      append(call, handler);
      const hargs = append(call, arr(Tag.arguments));
      append(hargs, Kit.id(Tag.push, frameSym));
      append(hargs, Kit.id(Tag.push, argsSym));
      continue;
    }
    const assign = Kit.assign(Tag.callee);
    callee.pos = Tag.right;
    Kit.replace(callee, assign);
    append(assign, callee);
    insertBefore(callee, Scope.sysMemExpr(Tag.left, opSym, "call"));
  }
  function getAlias(str) {
    let alias = null;
    if (relAlias && str[0] === ".") {
      str = path.normalize(`${relAlias}/${str}`);
      if (Kit.isWindows) str = str.replace(/\\/g, "/");
      alias = aliases[str] || str;
    } else alias = aliases[str];
    return alias;
  }
  function plusShift(pos, sym, shift) {
    if (shift === 0) return Kit.id(pos, sym);
    const res = Kit.node(pos, Tag.BinaryExpression);
    res.node.operator = "+";
    Kit.append(res, Kit.id(Tag.left, sym));
    Kit.append(res, Kit.num(Tag.right, shift));
    return res;
  }
}
