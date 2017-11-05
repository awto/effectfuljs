function a() {
  var a = M.context();
  return M.jump(a_1, a_6);
}

function a() {
  var a = M.context();
  return M.jump(_a_1, _a_6);
}

function a_1(a) {
  console.log('1');
  return M.chain(eff(1), a_3, _a_5);
}

function a_2(a, ex) {
  var e;
  a._error1 = ex;
  e = a._error1;
  console.log('2');
  return M.jump(a_3, _a_5, e);
}

function a_3(a, e) {
  return M.chain(eff(e), _a_4, _a_5);
}

function _a_4(a) {
  return M.pure();
}

function _a_5(a, e) {
  return M.raise(e);
}

function a_6(a, b) {
  return M.jump(a_2, _a_5, b);
}

function _a_1(a) {
  console.log('1');
  return M.chain(eff(1), _a_3, a_5);
}

function _a_2(a, ex) {
  var e, error;
  error = ex;
  e = error;
  console.log('2');
  error = null;
  return M.jump(_a_3, a_5, e);
}

function _a_3(a, e) {
  return M.chain(eff(e), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function _a_6(a, b) {
  return M.jump(_a_2, a_5, b);
}