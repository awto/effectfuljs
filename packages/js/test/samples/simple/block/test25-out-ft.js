function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a_1(a) {
  var b, c;

  if (ee) {
    b = a._i++;
    return M.chain(eff1(b), a_2, a_5);
  } else {
    c = a._i++;
    return M.chain(eff1(c), a_3, a_5);
  }
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_4, a_5);
}

function a_3(a) {
  var b;
  b = a._i++;
  return M.chain(eff2(b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}