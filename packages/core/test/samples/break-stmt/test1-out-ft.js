import * as M from '@effectful/core';

(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_7);
});

(function () {
  var ctx = M.context();
  return M.scopeH(_f_1, _f_7);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_11, f_8);
});

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function f_1(ctx) {
  return M.chainBH(eff(1), f_2, f_7);
}

function f_2(ctx) {
  return M.chainBH(eff(2), f_3, f_7);
}

function f_3(ctx, a) {
  if (a) {
    return M.jumpH(f_4, f_7);
  } else {
    return M.chainBH(eff(3), f_4, f_7);
  }
}

function f_4(ctx) {
  return M.chainBH(eff(4), f_5, f_7);
}

function f_5(ctx) {
  return M.chainBH(eff(5), f_6, f_7);
}

function f_6(ctx) {
  return M.pure();
}

function f_7(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  return M.chainBH(eff(1), _f_2, _f_7);
}

function _f_2(ctx) {
  return M.chainBH(eff(2), _f_3, _f_7);
}

function _f_3(ctx, a) {
  if (a) {
    return M.chainBH(eff('a'), _f_4, _f_7);
  } else {
    return M.chainBH(eff(3), _f_4, _f_7);
  }
}

function _f_4(ctx) {
  return M.chainBH(eff(4), _f_5, _f_7);
}

function _f_5(ctx) {
  return M.chainBH(eff(5), _f_6, _f_7);
}

function _f_6(ctx) {
  return M.pure();
}

function _f_7(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  return M.chainBH(eff(1), f_21, f_8);
}

function f_21(ctx) {
  return M.chainBH(eff(2), f_31, f_8);
}

function f_31(ctx, a) {
  if (a) {
    return M.chainBH(eff('a'), f_41, f_8);
  } else {
    return M.chainBH(eff(4), f_51, f_8);
  }
}

function f_41(ctx) {
  return M.chainBH(eff('b'), f_71, f_8);
}

function f_51(ctx) {
  return M.chainBH(eff(5), f_61, f_8);
}

function f_61(ctx) {
  return M.pure(ctx._r);
}

function f_71(ctx, r) {
  return M.pure(r);
}

function f_8(ctx, e) {
  return M.raise(e);
}

function a_1(a) {
  if (e) {
    return M.chainBH(eff('b'), a_2, a_3);
  } else {
    return M.pure(a._r);
  }
}

function a_2(a, r) {
  return M.pure(r);
}

function a_3(a, e) {
  return M.raise(e);
}