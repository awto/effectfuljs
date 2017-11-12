(function () {
  var ctx = M.context();
  return M.scope(f_1, f_8);
});

function f_1(ctx) {
  return M.chain(eff(1), f_2, f_8);
}

function f_2(ctx, a) {
  if (a) {
    return M.chain(eff('before break'), f_5, f_7);
  } else {
    return M.chain(eff(2), f_4, f_7);
  }
}

function f_3(ctx) {
  ctx._e = ctx._ex;
  return M.chain(eff(3), f_4, f_7);
}

function f_4(ctx) {
  return M.chain(eff(4), f_5, f_7);
}

function f_5(ctx) {
  return M.chain(eff(5), f_6, f_7);
}

function f_6(ctx) {
  return M.pure();
}

function f_7(ctx, e) {
  return M.raise(e);
}

function f_8(ctx, a) {
  ctx._ex = a;
  return M.jump(f_3, f_7);
}