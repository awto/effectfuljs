(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_14);
});

function f_1(ctx) {
  return M.chainBH(eff(0), f_2, f_14);
}

function f_2(ctx) {
  return M.chainBH(eff(1), f_3, f_14);
}

function f_3(ctx) {
  return M.chainBH(eff(2), f_4, f_14);
}

function f_4(ctx) {
  return M.chainBH(eff(3), f_5, f_14);
}

function f_5(ctx, a) {
  if (a) {
    return M.chainBH(eff(4), f_10, f_14);
  } else {
    return M.chainBH(eff(3), f_6, f_14);
  }
}

function f_6(ctx, a) {
  if (a) {
    return M.chainBH(eff(4), f_3, f_14);
  } else {
    return M.chainBH(eff(5), f_7, f_14);
  }
}

function f_7(ctx, a) {
  if (a) {
    return M.chainBH(eff(6), f_2, f_14);
  } else {
    return M.chainBH(eff(7), f_8, f_14);
  }
}

function f_8(ctx, a) {
  if (a) {
    return M.chainBH(eff(8), f_12, f_14);
  } else {
    return M.chainBH(eff(9), f_9, f_14);
  }
}

function f_9(ctx, a) {
  if (!a) {
    return M.jumpH(f_10, f_14);
  } else {
    return M.jumpRH(f_3, f_14);
  }
}

function f_10(ctx) {
  return M.chainBH(eff(10), f_11, f_14);
}

function f_11(ctx) {
  if (!true) {
    return M.jumpH(f_12, f_14);
  } else {
    return M.jumpRH(f_2, f_14);
  }
}

function f_12(ctx) {
  return M.chainBH(eff(11), f_13, f_14);
}

function f_13(ctx) {
  return M.pure();
}

function f_14(ctx, e) {
  return M.raise(e);
}