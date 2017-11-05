(function () {
  var ctx = M.context();
  return M.jump(f_1, f_8);
});

function f_1(ctx) {
  return M.chain(eff(1), f_2, f_8);
}

function f_2(ctx, a) {
  if (a) {
    return M.jump(f_1, f_8);
  } else {
    return M.chain(eff(2), f_3, f_8);
  }
}

function f_3(ctx, a) {
  if (a) {
    return M.jump(f_6, f_8);
  } else {
    return M.chain(eff(3), f_4, f_8);
  }
}

function f_4(ctx) {
  return M.chain(eff(4), f_5, f_8);
}

function f_5(ctx, a) {
  if (!a) {
    return M.jump(f_6, f_8);
  } else {
    return M.jump(f_1, f_8);
  }
}

function f_6(ctx) {
  return M.chain(eff(5), f_7, f_8);
}

function f_7(ctx) {
  return M.pure();
}

function f_8(ctx, e) {
  return M.raise(e);
}