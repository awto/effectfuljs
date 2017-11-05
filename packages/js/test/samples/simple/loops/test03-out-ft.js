function a() {
  var a = M.context();
  a._k = 0;
  return M.chain(eff1(), a_1, a_8);
}

function a_1(a) {
  return M.chain(eff2(), a_2, a_8);
}

function a_2(a, b) {
  a._i = b;
  return M.jump(a_3, a_8);
}

function a_3(a) {
  if (a._i < 10) {
    a._k++;
    return M.chain(eff3(a._i), a_4, a_8);
  } else {
    return M.chain(eff6(a._i, a._j, a._k), a_7, a_8);
  }
}

function a_4(a, b) {
  a._j = b;
  return M.chain(eff4(a._i), a_5, a_8);
}

function a_5(a, b) {
  var c;
  a._l = b;
  a._l++;
  c = a._j++;
  return M.chain(eff5(c, a._k, a._l), a_6, a_8);
}

function a_6(a) {
  a._i++;
  return M.repeat(a_3, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}