function a() {
  var a = M.context();
  return M.chain(eff1(), a_1, a_7);
}

function a_1(a) {
  return M.chain(eff2(), a_2, a_7);
}

function a_2(a, b) {
  a._i = b;
  return M.jump(a_3, a_7);
}

function a_3(a) {
  if (a._i < 10) {
    return M.chain(eff3(a._i, a._j), a_4, a_7);
  } else {
    return M.chain(eff7(a._i), a_6, a_7);
  }
}

function a_4(a) {
  var b;
  b = a._j++;
  return M.chain(eff4(b), a_5, a_7);
}

function a_5(a) {
  a._i++;
  return M.repeat(a_3, a_7);
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}