import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._i = 0;
  return M.chain(eff1(a._i), a_2);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_3);
}

function a_3(a) {
  var b;

  if (a._i) {
    a._i++;
    return M.jump(void 0, a_4);
  } else {
    b = a._i++;
    return M.chain(eff3(b), a_4);
  }
}

function a_4(a) {
  var b;
  b = a._i++;
  a._i = null;
  return M.chain(eff4(b), a_5);
}

function a_5(a) {}