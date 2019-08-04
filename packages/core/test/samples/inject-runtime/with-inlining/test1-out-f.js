import * as M from "@effectful/core";
var somevar1 = M.somevar1;
var pure = M.pure;
var somevar2 = M.somevar2(pure, somevar1);

function _chain(_somevar1) {
  return M.chainOperation(somevar1, somevar2, _somevar1);
}

function a() {
  var something, r;
  return _chain(eff1(), _1, _5);

  function _1() {
    return _chain(chain(), _2, _5);
  }

  function _2() {
    something = "vo";
    return _chain(eff2(something), _3, _5);
  }

  function _3() {
    return pure();
  }

  function _4(r) {
    return pure(r);
  }

  function _5(e) {
    var _somevar1 = e;
    return something(M, somevar1, _somevar1);
  }
}