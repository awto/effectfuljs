(function () {
  var ctx = M.context();
  return M.scope(f_1, f_71);
});

(function () {
  var ctx = M.context();
  return M.scope(_f_1, _f_7);
});

(function () {
  var ctx = M.context();
  return M.scope(f_11, f_8);
});

function a() {
  var a = M.context();
  return M.scope(a_1, a_3);
}

function f_1(ctx) {
  return M.chain(eff(1), f_2, f_71);
}

function f_2(ctx) {
  return M.chain(eff(2), f_3, f_71);
}

function f_3(ctx, a) {
  if (a) {
    return M.jump(f_4, f_71);
  } else {
    return M.chain(eff(3), f_4, f_71);
  }
}

function f_4(ctx) {
  return M.chain(eff(4), f_5, f_71);
}

function f_5(ctx) {
  return M.chain(eff(5), f_61, f_71);
}

function f_61(ctx) {
  return M.pure();
}

function f_71(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  return M.chain(eff(1), _f_2, _f_7);
}

function _f_2(ctx) {
  return M.chain(eff(2), _f_3, _f_7);
}

function _f_3(ctx, a) {
  if (a) {
    return M.chain(eff('a'), _f_4, _f_7);
  } else {
    return M.chain(eff(3), _f_4, _f_7);
  }
}

function _f_4(ctx) {
  return M.chain(eff(4), _f_5, _f_7);
}

function _f_5(ctx) {
  return M.chain(eff(5), _f_6, _f_7);
}

function _f_6(ctx) {
  return M.pure();
}

function _f_7(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  return M.chain(eff(1), f_21, f_8);
}

function f_21(ctx) {
  return M.chain(eff(2), f_31, f_8);
}

function f_31(ctx, a) {
  if (a) {
    return M.chain(eff('a'), f_41, f_8);
  } else {
    return M.chain(eff(4), f_51, f_8);
  }
}

function f_41(ctx) {
  return M.chain(eff('b'), f_7, f_8);
}

function f_51(ctx) {
  return M.chain(eff(5), f_6, f_8);
}

function f_6(ctx) {
  return M.pure(ctx._r);
}

function f_7(ctx, r) {
  return M.pure(r);
}

function f_8(ctx, e) {
  return M.raise(e);
}

function a_1(a) {
  if (e) {
    return M.chain(eff('b'), a_2, a_3);
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