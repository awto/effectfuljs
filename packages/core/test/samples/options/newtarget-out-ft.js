import * as M from "@effectful/core";

function a1(a) {
  this.a = a;
}

function b() {
  var b = M.context();
  return M.scope(this, new.target, b_1);
}

function b_1(b) {
  var a;
  a = a1;
  return M.chain(a(), b_2);
}

function b_2(b) {}