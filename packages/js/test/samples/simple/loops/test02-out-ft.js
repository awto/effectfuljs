// *- should inject forPar
function a() {
  var a = M.context();
  return M.chain(eff1(), a_1, a_8);
}

function a_1(a) {
  return M.chain(eff2(), a_2, a_8);
}

function a_2(a, b) {
  a._i = b;
  return M.chain(eff3(), a_3, a_8);
}

function a_3(a, b) {
  a._j = b;
  return M.jump(a_4, a_8);
}

function a_4(a) {
  if (a._i < 10 && a._j > -10) {
    return M.chain(eff3(a._i), a_5, a_8);
  } else {
    return M.chain(eff5(a._i, a._j), a_7, a_8);
  }
}

function a_5(a, b) {
  var c;
  a._k = b;
  c = a._k++;
  return M.chain(eff4(c), a_6, a_8);
}

function a_6(a) {
  a._i++, a._j--;
  return M.repeat(a_4, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}