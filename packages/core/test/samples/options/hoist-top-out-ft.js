import b from "some";
import * as M from "@effectful/core";
export let [, a] = b;

function a1() {}

{
  Some = class Some {
    a() {
      var ctx = M.context();
      return M.scope(a_1);
    }

  };
  _b = a;
  [, other, b2] = Some;

  somethingElse = function somethingElse() {
    var _somethingElse = M.context();

    return M.scope(somethingElse_1);
  };
}

function a_1(ctx) {
  return M.chain(b_1, a_2);
}

function a_2(ctx) {
  return M.pure();
}

function a_3(ctx, r) {
  return M.pure(r);
}

function zz_1(_zz) {
  var a;
  a = eff_1(new Some());
  return M.chain(a, zz_2);
}

function zz_2(_zz) {
  var b;
  b = eff_2(a, _b);
  return M.chain(b, zz_3);
}

function zz_3(_zz) {
  return M.pure();
}

function zz_4(_zz, r) {
  return M.pure(r);
}

function somethingElse_1(_somethingElse) {
  return M.pure(function zz() {
    var _zz = M.context();

    return M.scope(zz_1);
  });
}

function somethingElse_2(_somethingElse, r) {
  return M.pure(r);
}

var Some, _b, other, b2, somethingElse;