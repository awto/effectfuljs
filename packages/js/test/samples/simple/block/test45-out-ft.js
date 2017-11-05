function a() {
  var a = M.context(),
      b;
  a._i = 0;
  b = a._i++;
  return M.chain(eff5(b), a_1, a_4);
}

function a_1(a) {
  var b;

  if (ee) {
    b = a._i++;
    return M.chain(eff7(b), a_2, a_4);
  } else {
    return M.jump(a_2, a_4);
  }
}

function a_2(a) {
  return M.chain(eff8(a._i), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}