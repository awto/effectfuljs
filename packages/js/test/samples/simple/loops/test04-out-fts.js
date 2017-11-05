function a() {
  return M.chain(eff1(), a_1, a_7);
}

function a_1() {
  return M.chain(eff2(), a_2, a_7);
}

function a_2(a) {
  var i;
  i = a;
  return M.jump(a_3, a_7, i);
}

function a_3(i) {
  var j;

  if (i < 10) {
    return M.chain(eff3(i, j), a_4, a_7, j, i);
  } else {
    return M.chain(eff7(i), a_6, a_7);
  }
}

function a_4(j, i) {
  var a;
  a = j++;
  return M.chain(eff4(a), a_5, a_7, i);
}

function a_5(i) {
  i++;
  return M.repeat(a_3, a_7, i);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}