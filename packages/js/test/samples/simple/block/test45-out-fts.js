function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.chain(eff5(a), a_1, a_4, i);
}

function a_1(i) {
  var a;

  if (ee) {
    a = i++;
    return M.chain(eff7(a), a_2, a_4, i);
  } else {
    return M.jump(a_2, a_4, i);
  }
}

function a_2(i) {
  return M.chain(eff8(i), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}