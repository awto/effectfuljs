import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  var b;
  b = a._i = 0;
  return M.chain(eff2(b), a_2);
}

function a_2(a, b) {
  var c;
  c = a._i++;
  return M.chain(eff1(b, c), a_3);
}

function a_3(a) {
  var b;
  b = a._i++;
  return M.chain(eff3(b), a_4);
}

function a_4(a) {
  var b;
  b = a._i++;
  return M.chain(eff4(b), a_5);
}

function a_5(a) {
  var b;
  b = a._i++;
  return M.chain(eff5(b), a_6);
}

function a_6(a) {
  var b;
  b = a._i++;
  return M.chain(eff6(b), a_7);
}

function a_7(a, b) {
  var c;

  if (b) {
    c = a._i++;
    return M.chain(eff7(c), a_9);
  } else {
    return M.chain(eff7(a._i), a_8);
  }
}

function a_8(a, b) {
  var c;

  if (b) {
    a._i++;
    c = a._i++;
    return M.chain(eff8(c), a_9);
  } else {
    return 10;
  }
}

function a_9(a) {
  var b;
  b = a._i++;
  return M.chain(eff9(b), a_10);
}

function a_10(a) {
  var b;
  b = a._i++;
  a._i = null;
  return M.chain(eff10(b), a_11);
}

function a_11(a) {
  return a._r;
}