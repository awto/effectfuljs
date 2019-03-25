import * as M from "@effectful/core";
module.exports = M.exports(function (module, exports) {
  var other,
      b2,
      somethingElse = function _somethingElse() {
    var somethingElse = M.context();
    somethingElse._f = ctx;
    return M.scope(somethingElse_1);
  },
      ctx = {};

  ctx._a1 = function a1() {};

  ctx._Some = class Some {
    a() {
      var _ctx = M.context();

      _ctx._f = ctx;
      return M.scope(a_1);
    }

  };

  ctx._Something = function Something() {
    var f = ctx;

    f._a1(f._b);
  };

  {
    ctx._b = a;
    [, other, b2] = ctx._Some;
  }
});

function zz_1(_zz) {
  var a;
  a = eff_1(_zz._f._Something());
  return M.chain(a, zz_2);
}

function zz_2(_zz) {
  var a;
  a = eff_2(new _zz._f._Some());
  return M.chain(a, zz_3);
}

function zz_3(_zz) {
  var b;
  b = eff_3(a, _zz._f._b);
  return M.chain(b, zz_4);
}

function zz_4(_zz) {
  return M.pure();
}

function zz_5(_zz, r) {
  return M.pure(r);
}

function somethingElse_1(somethingElse) {
  return M.pure(function zz() {
    var _zz = M.context();

    _zz._f = somethingElse._f;
    return M.scope(zz_1);
  });
}

function somethingElse_2(somethingElse, r) {
  return M.pure(r);
}

function a_1(_ctx) {
  return M.chain(new _ctx._f._Some(), a_2);
}

function a_2(_ctx) {
  return M.chain(new _ctx._f._Something(), a_3);
}

function a_3(_ctx) {
  _ctx._f._a1();

  return M.pure();
}

function a_4(_ctx, r) {
  return M.pure(r);
}