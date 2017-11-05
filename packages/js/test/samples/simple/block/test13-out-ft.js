function a() {
  var a = M.context();
  a._i = 0;

  if (t) {
    return M.chain(eff1(a._i), a_1, a_4);
  } else {
    a._i++;
    return M.jump(a_1, a_4);
  }
}

function a_1(a) {
  return M.chain(eff2(a._i), a_2, a_4);
}

function a_2(a) {
  return M.chain(eff3(a._i), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}