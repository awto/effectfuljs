(function () {
  var ctx = M.context();
  return M.chain(eff(1), f_1, f_61);
});

(function () {
  var ctx = M.context();
  return M.chain(eff(1), _f_1, _f_6);
});

(function () {
  var ctx = M.context();
  return M.chain(eff(1), f_11, f_7);
});

function a() {
  var a = M.context();

  if (e) {
    return M.chain(eff('b'), a_1, a_2);
  } else {
    return M.pure(a._r);
  }
}

function f_1(ctx) {
  return M.chain(eff(2), f_2, f_61);
}

function f_2(ctx, a) {
  if (a) {
    return M.jump(f_3, f_61);
  } else {
    return M.chain(eff(3), f_3, f_61);
  }
}

function f_3(ctx) {
  return M.chain(eff(4), f_4, f_61);
}

function f_4(ctx) {
  return M.chain(eff(5), f_51, f_61);
}

function f_51(ctx) {
  return M.pure();
}

function f_61(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  return M.chain(eff(2), _f_2, _f_6);
}

function _f_2(ctx, a) {
  if (a) {
    return M.chain(eff('a'), _f_3, _f_6);
  } else {
    return M.chain(eff(3), _f_3, _f_6);
  }
}

function _f_3(ctx) {
  return M.chain(eff(4), _f_4, _f_6);
}

function _f_4(ctx) {
  return M.chain(eff(5), _f_5, _f_6);
}

function _f_5(ctx) {
  return M.pure();
}

function _f_6(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  return M.chain(eff(2), f_21, f_7);
}

function f_21(ctx, a) {
  if (a) {
    return M.chain(eff('a'), f_31, f_7);
  } else {
    return M.chain(eff(4), f_41, f_7);
  }
}

function f_31(ctx) {
  return M.chain(eff('b'), f_6, f_7);
}

function f_41(ctx) {
  return M.chain(eff(5), f_5, f_7);
}

function f_5(ctx) {
  return M.pure(ctx._r);
}

function f_6(ctx, r) {
  return M.pure(r);
}

function f_7(ctx, e) {
  return M.raise(e);
}

function a_1(a, r) {
  return M.pure(r);
}

function a_2(a, e) {
  return M.raise(e);
}