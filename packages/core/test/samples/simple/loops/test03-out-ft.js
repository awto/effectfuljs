import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._k = 0;
  return M.chain(eff1(), a_2);
}

function a_2(a) {
  return M.chain(eff2(), a_3);
}

function a_3(a, b) {
  a._i = b;
  return M.jump(void 0, a_4);
}

function a_4(a) {
  var b, c, d;

  if (a._i < 10) {
    a._k++;
    a._j = null;
    return M.chain(eff3(a._i), a_5);
  } else {
    b = a._i, c = a._j, d = a._k, a._k = null, a._i = null, a._j = null;
    return M.chain(eff6(b, c, d), a_8);
  }
}

function a_5(a, b) {
  a._j = b;
  return M.chain(eff4(a._i), a_6);
}

function a_6(a, b) {
  var l, c;
  l = b;
  l++;
  c = a._j++;
  return M.chain(eff5(c, a._k, l), a_7);
}

function a_7(a) {
  a._i++;
  return M.jump(void 0, a_4);
}

function a_8(a) {}