import * as M from "@effectful/core";

function a() {
  var _a = M.context();

  return M.scope(a_1);
}

function a_1(_a) {
  return M.chain(eff1(), a_2);
}

function a_2(_a) {
  if (a) {
    return M.chain(eff5(5), a_3);
  } else {
    return M.chain(eff6(), a_4);
  }
}

function a_3(_a, a) {
  return a;
}

function a_4(_a) {
  return _a._r;
}