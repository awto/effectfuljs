import * as M from "@effectful/core";

function scope() {
  var scope = M.context();
  return M.otherScope(scope_1);
}

function scope_1(scope) {
  return M.chain(eff_1(), scope_2);
}

function scope_2(scope) {
  return M.chain(eff_2(), scope_3);
}

function scope_3(scope) {}