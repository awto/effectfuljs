(function () {
  var ctx = M.context();
  return M.scopeH(f_1, f_8);
});

(function () {
  var ctx = M.context();
  return M.scopeH(_f_1, f_9);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_11, f_81);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_12, f_52);
});

(function () {
  var ctx = M.context();
  return M.scopeH(f_13, f_62);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jumpH(f_2, f_8);
}

function f_2(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff(ctx._i), f_3, f_8);
  } else {
    return M.pure();
  }
}

function f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpRH(f_4, f_8);
}

function f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chainBH(eff(d), f_5, f_8);
  } else {
    return M.jumpH(f_7, f_8);
  }
}

function f_5(ctx, a) {
  if (a) {
    return M.jumpRH(f_6, f_8);
  } else {
    if (t1) {
      return M.jumpH(f_7, f_8);
    } else {
      return M.jumpRH(f_6, f_8);
    }
  }
}

function f_6(ctx) {
  ctx._j++;
  return M.jumpRH(f_4, f_8);
}

function f_7(ctx) {
  ctx._i++;
  return M.jumpRH(f_2, f_8);
}

function f_8(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jumpH(_f_2, f_9);
}

function _f_2(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff(ctx._i), _f_3, f_9);
  } else {
    return M.pure();
  }
}

function _f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpRH(_f_4, f_9);
}

function _f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chainBH(eff(d), _f_5, f_9);
  } else {
    return M.jumpH(_f_8, f_9);
  }
}

function _f_5(ctx, a) {
  if (a) {
    return M.jumpRH(_f_7, f_9);
  } else {
    return M.chainBH(eff(2), _f_6, f_9);
  }
}

function _f_6(ctx, a) {
  if (a) {
    return M.jumpH(_f_8, f_9);
  } else {
    return M.jumpRH(_f_7, f_9);
  }
}

function _f_7(ctx) {
  ctx._j++;
  return M.jumpRH(_f_4, f_9);
}

function _f_8(ctx) {
  ctx._i++;
  return M.jumpRH(_f_2, f_9);
}

function f_9(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jumpH(f_21, f_81);
}

function f_21(ctx) {
  if (ctx._i < 3) {
    return M.chainBH(eff(ctx._i), f_31, f_81);
  } else {
    return M.chainBH(eff(ctx._j), f_71, f_81);
  }
}

function f_31(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpRH(f_41, f_81);
}

function f_41(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chainBH(eff(d), f_51, f_81);
  } else {
    return M.jumpH(f_61, f_81);
  }
}

function f_51(ctx) {
  ctx._j++;

  if (t2) {
    return M.jumpH(f_61, f_81);
  } else {
    ctx._j++;
    return M.jumpRH(f_41, f_81);
  }
}

function f_61(ctx) {
  ctx._i++;
  return M.jumpRH(f_21, f_81);
}

function f_71(ctx) {
  return M.pure();
}

function f_81(ctx, e) {
  return M.raise(e);
}

function f_12(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jumpH(f_22, f_52);
}

function f_22(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chainBH(eff(d), f_32, f_52);
  } else {
    return M.pure();
  }
}

function f_32(ctx) {
  ctx._i++;

  if (t2) {
    return M.jumpRH(f_42, f_52);
  } else {
    return M.jumpRH(f_42, f_52);
  }
}

function f_42(ctx) {
  ctx._j++;
  return M.jumpRH(f_22, f_52);
}

function f_52(ctx, e) {
  return M.raise(e);
}

function f_13(ctx) {
  ctx._j = 0;
  return M.jumpH(f_23, f_62);
}

function f_23(ctx) {
  if (true) {
    return M.chainBH(eff(ctx._j), f_33, f_62);
  } else {
    return M.jumpH(f_43, f_62);
  }
}

function f_33(ctx) {
  ctx._j++;

  if (t2) {
    return M.jumpH(f_43, f_62);
  } else {
    ctx._j--;
    return M.jumpRH(f_23, f_62);
  }
}

function f_43(ctx) {
  return M.chainBH(eff(ctx._j), f_53, f_62);
}

function f_53(ctx) {
  return M.pure();
}

function f_62(ctx, e) {
  return M.raise(e);
}