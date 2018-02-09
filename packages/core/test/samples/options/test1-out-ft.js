function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_8);
}

function c() {
  var c = M.context();
  return M.scopeH(c_1, c_8);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_6);
}

function a_2(a) {
  return M.chainBH(eff(2), a_3, a_6);
}

function a_3(a) {
  return M.chainBH(eff(3), a_4, a_6);
}

function a_4(a) {
  return M.chainBH(eff(4), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chainBH(eff(1), b_2, b_8);
}

function b_2(b) {
  return M.chainBH(eff(2), b_3, b_8);
}

function b_3(b) {
  return M.chainBH(eff(3), b_4, b_8);
}

function b_4(b) {
  return M.chainBH(eff(4), b_5, b_8);
}

function b_5(b) {
  return M.chainBH(eff(5), b_6, b_8);
}

function b_6(b) {
  return M.chainBH(eff(6), b_7, b_8);
}

function b_7(b) {
  console.log('7');
  return M.pure();
}

function b_8(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chainBH(eff(1), c_2, c_8);
}

function c_2(c) {
  return M.chainBH(eff(2), c_3, c_8);
}

function c_3(c) {
  return M.chainBH(eff(3), c_4, c_8);
}

function c_4(c) {
  return M.chainBH(eff(4), c_5, c_8);
}

function c_5(c) {
  return M.chainBH(eff(5), c_6, c_8);
}

function c_6(c) {
  return M.chainBH(eff(6), c_7, c_8);
}

function c_7(c) {
  console.log('7');
  return M.pure();
}

function c_8(c, e) {
  return M.raise(e);
}