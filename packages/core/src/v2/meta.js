import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";
const { Tag, next } = Kit;

const DEBUG_BRKS = true;

export const brkSym = Scope.sysSym("brk");

export function injectBrk() {
  const { root } = Ctx;
  let debNum = 0;
  let i = root;
  do {
    switch (i.type) {
      case Tag.VariableDeclaration:
        if (i.pos === Tag.left || i.pos === Tag.init) break;
      case Tag.ReturnStatement:
      case Tag.BreakStatement:
      case Tag.ContinueStatement:
      case Tag.IfStatement:
      case Tag.SwitchStatement:
      case Tag.ThrowStatement:
      case Tag.TryStatement:
      case Tag.ExpressionStatement:
      case Tag.WithStatement:
      case Tag.ForStatement:
      case Tag.WhileStatement:
      case Tag.DoWhileStatement:
      case Tag.ForOfStatement:
      case Tag.LabeledStatement:
        if (i.pos !== Tag.push && i.parent.type !== Tag.LabeledStatement) {
          const block = Kit.node(i.pos, Tag.BlockStatement);
          i.pos = Tag.push;
          const arr = Kit.append(block, Kit.arr(Tag.body, []));
          Kit.insertAfter(i, block);
          Kit.detach(i);
          Kit.append(arr, i);
        }
        Kit.insertBefore(i, brkExpr(i));
        for (; i.type === Tag.LabeldStatement; i = i.firstChild.nextSibling) {}
        break;
      case Tag.DebuggerStatement:
        Kit.replace(i, brkExpr(i));
        i.brkKind = "d";
        break;
    }
  } while ((i = next(i)) !== root);
  function brkExpr(i) {
    const call = Kit.node(Tag.expression, Tag.CallExpression);
    call.eff = true;
    call.refDoc = i;
    i.brkKind = "s";
    const res = Kit.node(Tag.push, Tag.ExpressionStatement);
    const args = Kit.insertAfter(
      Kit.append(call, Scope.sysId(Tag.callee, brkSym)),
      Kit.arr(Tag.arguments, [])
    );
    if (DEBUG_BRKS) Kit.append(args, Kit.num(Tag.push, debNum++));
    Kit.append(res, call);
    return res;
  }
}

export function stateLines(root) {
  const res = [];
  const { lastFrame } = root;
  for (let i = lastFrame.prevFrame; i !== lastFrame; i = i.prevFrame) {
    const { doc } = i;
    if (!doc) {
      res.push({});
      continue;
    }
    const ref = doc.refDoc;
    const { loc } = ref.node;
    res.push([
      loc
        ? `${loc.start.line}:${loc.start.column}-${loc.end.line}:${loc.end.column}`
        : null,
      "s",
      i.scopeInfoSym
    ]);
  }
  return res;
}

function forEachDocItem(root, func) {
  const { lastFrame } = root;
  for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame) {
    const { doc } = i;
    if (!doc) continue;
    const ref = doc.refDoc || doc;
    func(i, ref);
  }
}

export function prepare(root) {
  const { lastFrame } = root;
  const res = (root.stateArgs = []);
  for (let i = lastFrame.nextFrame; i !== lastFrame; i = i.nextFrame)
    res.push((i.metaArgs = []));
  return res;
}

export function positions(root) {
  forEachDocItem(root, function(i, ref) {
    const { loc } = ref.node;
    i.metaArgs.push(
      loc
        ? `${loc.start.line}:${loc.start.column}-${loc.end.line}:${loc.end.column}`
        : null,
      ref.brkKind || null
    );
  });
}

export function scopes(decls) {
  const file = Ctx.root;
  let num = 0;
  Scope.forEach(function(root) {
    forEachDocItem(root, function(i, ref) {
      i.metaArgs.push(getBlockDescr(ref.parentBlock));
    });
  }, file);

  function getBlockDescr(block) {
    if (!block) return null;
    let res = block.blockDescrSym;
    if (res) return res;
    const parent = getBlockDescr(block.parentBlock);
    const blockDecls = block.blockDecls;
    if (!blockDecls.size) return (block.blockDescrSym = parent);
    const vars = {};
    res = block.blockDescrSym = Scope.newSym();
    res.orig = res.name = `$s$${++num}`;
    for (const i of blockDecls) vars[i.orig] = i.name;
    const decl = Kit.node(Tag.push, Tag.VariableDeclarator);
    Kit.insertAfter(
      Kit.append(decl, Kit.id(Tag.id, res)),
      Kit.emitConst(Tag.init, [vars, parent, !!block.scopeNode])
    );
    Kit.append(decls, decl);
    return res;
  }
}

export function all(root) {
  prepare(root);
  positions(root);
}
