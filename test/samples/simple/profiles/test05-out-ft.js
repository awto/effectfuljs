function a_1() {
  return e2();
}

function b_1() {
  return e(2);
}

function _a_1() {
  return M.jM(p2(), a_2);
}

function a_2() {
  return M.jM(p2(), a_3);
}

function a_3() {
  return p3();
}

function a() {
  var a_v = {
    a: undefined,
    b: undefined
  };

  a_v.a = function a() {
    console.log('hi');
    return M.jM(e1(), a_1);
  };

  a_v.b = function b() {
    p4();
    p5();
    return M.jM(e1(), b_1);
  };

  return M.jM(p1(), _a_1);
}