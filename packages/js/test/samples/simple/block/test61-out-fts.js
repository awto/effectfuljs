function a() {
  var i;
  i = 0;
  return M.chain(eff1(i), a_1, a_5, i);
}

function a_1(i) {
  var a;
  a = i++;
  return M.chain(eff2(a), a_2, a_5, i);
}

function a_2(i) {
  var a;

  if (i) {
    i++;
    return M.jump(a_3, a_5, i);
  } else {
    a = i++;
    return M.chain(eff3(a), a_3, a_5, i);
  }
}

function a_3(i) {
  var a;
  a = i++;
  return M.chain(eff4(a), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}