import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var b;
  a._i = 0;
  b = a._i++;
  return M.chain(eff5(b), a_2);
}

function a_2(a) {
  var b;

  if (ee) {
    b = a._i++;
    return M.chain(eff7(b), a_3);
  } else {
    return M.jump(void 0, a_3);
  }
}

function a_3(a) {
  var b;
  b = a._i, a._i = null;
  return M.chain(eff8(b), a_4);
}

function a_4(a) {}