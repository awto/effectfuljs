function a() {
  var a = function a() {
    console.log('hi');
    return M.j(e1(), a_1);
  },
      b = function b() {
    p4();
    p5();
    return M.j(e1(), b_1);
  },
      a_v = {
    a: a,
    b: b
  };

  return M.j(p1(), _a_1);
}

function a_1() {
  return M.j(e2(), a_2);
}

function a_2() {
  return M.pure();
}

function b_1() {
  return M.j(e(2), b_2);
}

function b_2() {
  return M.pure();
}

function _a_1() {
  return M.j(p2(), _a_2);
}

function _a_2() {
  return M.j(p2(), a_3);
}

function a_3() {
  return M.j(p3(), a_4);
}

function a_4() {
  return M.pure();
}