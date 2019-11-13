import * as Kit from "./kit";
import * as Scope from "./scope";
import * as Ctx from "./context";

const { Tag } = Kit;

export function replaceEvalDir() {
  const { root } = Ctx;
  const sym = Scope.sysSym("evalDir");
  for (let i = root.nextCallExpression, n; i !== root; i = n) {
    n = i.nextCallExpression;
    const callee = i.firstChild;
    if (callee.type === Tag.Identifier && callee.sym === Scope.evalSym) {
      Kit.replace(callee, Scope.sysId(Tag.callee, sym));
      const p = i.prevCallExpression;
      p.nextCallExpression = n;
      n.prevCallExpression = p;
    }
  }
}
