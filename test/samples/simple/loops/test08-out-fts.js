function a() {
  var a_v = {
    i: undefined
  };
  return M.jB(init(), a_1, a_v);
}

function a_1(a, a_v) {
  a_v.i = a;
  return a_2();
}

function a_2() {
  return M.jB(check(), a_3);
}

function a_3(a) {
  if (a === true) {
    return M.j(b1(), a_4);
  } else {
    return M.pure();
  }
}

function a_4() {
  if (v) return a_5();else return a_6();
}

function a_5() {
  return M.j(e(), a_6);
}

function a_6() {
  return M.jR(upd(), a_2);
}