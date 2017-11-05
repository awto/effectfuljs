function a() {
  var a = M.context();
  a._i = 0;
  a._i++;
  return M.chain(eff1(a._i), a_1, a_3);
}

function a_1(a) {
  if (t) {
    return M.chain(eff2(a._i), a_2, a_3);
  } else {
    return M.chain(eff3(a._i), a_2, a_3);
  }
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}