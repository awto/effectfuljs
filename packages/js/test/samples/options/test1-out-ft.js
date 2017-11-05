function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_5);
}

function b() {
  var b = M.context();
  return M.chain(eff(1), b_1, b_7);
}

function c() {
  var c = M.context();
  return M.chain(eff(1), c_1, c_7);
}

function a_1(a) {
  return M.chain(eff(2), a_2, a_5);
}

function a_2(a) {
  return M.chain(eff(3), a_3, a_5);
}

function a_3(a) {
  return M.chain(eff(4), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chain(eff(2), b_2, b_7);
}

function b_2(b) {
  return M.chain(eff(3), b_3, b_7);
}

function b_3(b) {
  return M.chain(eff(4), b_4, b_7);
}

function b_4(b) {
  return M.chain(eff(5), b_5, b_7);
}

function b_5(b) {
  return M.chain(eff(6), b_6, b_7);
}

function b_6(b) {
  console.log('7');
  return M.pure();
}

function b_7(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chain(eff(2), c_2, c_7);
}

function c_2(c) {
  return M.chain(eff(3), c_3, c_7);
}

function c_3(c) {
  return M.chain(eff(4), c_4, c_7);
}

function c_4(c) {
  return M.chain(eff(5), c_5, c_7);
}

function c_5(c) {
  return M.chain(eff(6), c_6, c_7);
}

function c_6(c) {
  console.log('7');
  return M.pure();
}

function c_7(c, e) {
  return M.raise(e);
}