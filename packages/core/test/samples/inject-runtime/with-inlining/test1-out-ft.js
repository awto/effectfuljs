import * as M from "@effectful/core";
var somevar1 = M.somevar1;
var pure = M.pure;
var somevar2 = M.somevar2(pure, somevar1);

function _chain(_somevar1) {
  return M.chainOperation(somevar1, somevar2, _somevar1);
}

function a() {
  var a = M.context();
  return M.scope(a_1, a_6);
}

function a_1(a) {
  return _chain(eff1(), a_2, a_6);
}

function a_2(a) {
  return _chain(chain(), a_3, a_6);
}

function a_3(a) {
  var something;
  something = "vo";
  return _chain(eff2(something), a_4, a_6);
}

function a_4(a) {
  return pure();
}

function a_5(a, r) {
  return pure(r);
}

function a_6(a, e) {
  var somevar1 = e;
  return something(M, a, somevar1);
}