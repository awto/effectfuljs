// *- should inject forPar
function a() {
  return M.chain(eff1(), a_1, a_8);
}

function a_1() {
  return M.chain(eff2(), a_2, a_8);
}

function a_2(a) {
  var i;
  i = a;
  return M.chain(eff3(), a_3, a_8, i);
}

function a_3(a, i) {
  var j;
  j = a;
  return M.jump(a_4, a_8, i, j);
}

function a_4(i, j) {
  if (i < 10 && j > -10) {
    return M.chain(eff3(i), a_5, a_8, i, j);
  } else {
    return M.chain(eff5(i, j), a_7, a_8);
  }
}

function a_5(a, i, j) {
  var k, b;
  k = a;
  b = k++;
  return M.chain(eff4(b), a_6, a_8, i, j);
}

function a_6(i, j) {
  i++, j--;
  return M.repeat(a_4, a_8, i, j);
}

function a_7() {
  return M.pure();
}

function a_8(e) {
  return M.raise(e);
}