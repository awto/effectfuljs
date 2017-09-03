function a() {
  var _this = this;

  return M.j(eff(1), a_1, _this);
}

function a_1(_this) {
  return M.j(_this.eff(2), a_2, _this);
}

function a_2(_this) {
  return M.j(eff3(_this), a_3);
}

function a_3() {
  return M.pure();
}