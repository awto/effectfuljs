function a() {
  var i, a, b;

  if (ee) {
    a = i++;
    return M.chain(eff1(a), a_1, a_4, i);
  } else {
    b = i++;
    return M.chain(eff1(b), a_2, a_4, i);
  }
}

function a_1(i) {
  var a;
  a = i++;
  return M.chain(eff2(a), a_3, a_4);
}

function a_2(i) {
  var a;
  a = i++;
  return M.chain(eff2(a), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}