// *- should inject forPar
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
  if (i < 10) {
    return M.chain(eff3(i), a_4, a_7, i);
  } else {
    return M.chain(eff7(i), a_6, a_7);
  }
}

function a_4(a, i) {
  var j, b;
  j = a;
  b = j++;
  return M.chain(eff4(b), a_5, a_7, i);
}

function a_5(i) {
  i++;
  return M.repeat(a_3, a_7, i);
}

function a_6(a) {
  console.log(a);
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}