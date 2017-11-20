function a() {
  var a = M.context();
  return M.scope(a_1, a_6);
}

function a() {
  var a = M.context();
  return M.scope(_a_1, _a_6);
}

function a_1(a) {
  console.log('1');
  return M.chain(eff(1), a_3, a_5);
}

function a_2(a) {
  a._error1 = a._ex;
  a._e = a._error1;
  console.log('2');
  return M.jump(a_3, a_5);
}

function a_3(a) {
  return M.chain(eff(a._e), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a, b) {
  a._ex = b;
  return M.jump(a_2, a_5);
}

function _a_1(a) {
  console.log('1');
  return M.chain(eff(1), _a_3, _a_5);
}

function _a_2(a) {
  a._error1 = a._ex;
  a._e = a._error1;
  console.log('2');
  a._error1 = null;
  return M.jump(_a_3, _a_5);
}

function _a_3(a) {
  return M.chain(eff(a._e), _a_4, _a_5);
}

function _a_4(a) {
  return M.pure();
}

function _a_5(a, e) {
  return M.raise(e);
}

function _a_6(a, b) {
  a._ex = b;
  return M.jump(_a_2, _a_5);
}