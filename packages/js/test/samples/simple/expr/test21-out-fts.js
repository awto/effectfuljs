function a() {
  var _this = this;

  return M.chain(eff(1), a_1, a_4, _this);
}

function a_1(_this) {
  return M.chain(_this.eff(2), a_2, a_4, _this);
}

function a_2(_this) {
  return M.chain(eff3(_this), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}