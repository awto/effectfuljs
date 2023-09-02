import * as M from "@effectful/core";
function a() {
  var e, error, _error, ex;
  return M.jump(void 0, _1, _5);
  function _1() {
    console.log("1");
    return M.chain(eff(1), _3);
  }
  function _2() {
    _error = ex;
    e = _error;
    console.log("2");
    return M.jump(void 0, _3);
  }
  function _3() {
    return M.chain(eff(e), _4);
  }
  function _4() {}
  function _5(a) {
    ex = a;
    return M.jump(void 0, _2);
  }
}
function b() {
  var e, error, _error, ex;
  return M.jump(void 0, _1, _5);
  function _1() {
    console.log("1");
    return M.chain(eff(1), _3);
  }
  function _2() {
    _error = ex;
    e = _error;
    console.log("2");
    _error = null;
    return M.jump(void 0, _3);
  }
  function _3() {
    return M.chain(eff(e), _4);
  }
  function _4() {}
  function _5(a) {
    ex = a;
    return M.jump(void 0, _2);
  }
}