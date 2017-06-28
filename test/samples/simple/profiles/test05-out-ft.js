function a_1() {
  return e2();
}

function b_1() {
  return e(2);
}

function _a_1(ref_) {
  return M.jM1(p2(), a_2, ref_);
}

function a_2(ref_) {
  return M.jM1(p2(), a_3, ref_);
}

function a_3(ref_) {
  return p3();
}

function a() {
  var ref_ = {
    _a: undefined,
    b: undefined
  };

  ref_._a = function _a() {
    console.log('hi');
    return M.jM(e1(), a_1);
  };

  ref_.b = function b() {
    p4();
    p5();
    return M.jM(e1(), b_1);
  };

  return M.jM1(p1(), _a_1, ref_);
}