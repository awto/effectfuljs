function a() {
  var _a = M.context();

  function a() {
    var a = M.context();
    console.log('hi');
    return M.chain(e1(), a_1, _a_3);
  }

  function b() {
    var b = M.context();
    p4();
    p5();
    return M.chain(e1(), b_1, b_3);
  }

  return M.chain(p1(), _a_1, a_5);
}

function a_1(a) {
  return M.chain(e2(), _a_2, _a_3);
}

function _a_2(a) {
  return M.pure();
}

function _a_3(a, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chain(e(2), b_2, b_3);
}

function b_2(b) {
  return M.pure();
}

function b_3(b, e) {
  return M.raise(e);
}

function _a_1(_a) {
  return M.chain(p2(), a_2, a_5);
}

function a_2(_a) {
  return M.chain(p2(), a_3, a_5);
}

function a_3(_a) {
  return M.chain(p3(), a_4, a_5);
}

function a_4(_a) {
  return M.pure();
}

function a_5(_a, e) {
  return M.raise(e);
}