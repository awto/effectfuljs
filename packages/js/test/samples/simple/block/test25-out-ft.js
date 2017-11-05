function a() {
  var a = M.context(),
      b,
      c;

  if (ee) {
    b = a._i++;
    return M.chain(eff1(b), a_1, a_4);
  } else {
    c = a._i++;
    return M.chain(eff1(c), a_2, a_4);
  }
}

function a_1(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_3, a_4);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}