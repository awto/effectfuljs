(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(f_1, f_71);
});

(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(_f_1, f_8);
});

(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(f_11, _f_7);
});

(function () {
  var ctx = M.context();
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_12, f_43);
});

(function () {
  var ctx = M.context();
  ctx._j = 0;
  return M.jump(f_13, f_52);
});

function f_1(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), f_2, f_71);
  } else {
    return M.pure();
  }
}

function f_2(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_3, f_71);
}

function f_3(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_4, f_71);
  } else {
    return M.jump(f_6, f_71);
  }
}

function f_4(ctx, a) {
  if (a) {
    return M.jump(f_5, f_71);
  } else {
    if (t1) {
      return M.jump(f_6, f_71);
    } else {
      return M.jump(f_5, f_71);
    }
  }
}

function f_5(ctx) {
  ctx._j++;
  return M.repeat(f_3, f_71);
}

function f_6(ctx) {
  ctx._i++;
  return M.repeat(f_1, f_71);
}

function f_71(ctx, e) {
  return M.raise(e);
}

function _f_1(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), _f_2, f_8);
  } else {
    return M.pure();
  }
}

function _f_2(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(_f_3, f_8);
}

function _f_3(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), _f_4, f_8);
  } else {
    return M.jump(f_7, f_8);
  }
}

function _f_4(ctx, a) {
  if (a) {
    return M.jump(_f_6, f_8);
  } else {
    return M.chain(eff(2), _f_5, f_8);
  }
}

function _f_5(ctx, a) {
  if (a) {
    return M.jump(f_7, f_8);
  } else {
    return M.jump(_f_6, f_8);
  }
}

function _f_6(ctx) {
  ctx._j++;
  return M.repeat(_f_3, f_8);
}

function f_7(ctx) {
  ctx._i++;
  return M.repeat(_f_1, f_8);
}

function f_8(ctx, e) {
  return M.raise(e);
}

function f_11(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), f_21, _f_7);
  } else {
    return M.chain(eff(ctx._j), f_61, _f_7);
  }
}

function f_21(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(f_31, _f_7);
}

function f_31(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_41, _f_7);
  } else {
    return M.jump(f_51, _f_7);
  }
}

function f_41(ctx) {
  ctx._j++;

  if (t2) {
    return M.jump(f_51, _f_7);
  } else {
    ctx._j++;
    return M.repeat(f_31, _f_7);
  }
}

function f_51(ctx) {
  ctx._i++;
  return M.repeat(f_11, _f_7);
}

function f_61(ctx) {
  return M.pure();
}

function _f_7(ctx, e) {
  return M.raise(e);
}

function f_12(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_22, f_43);
  } else {
    return M.pure();
  }
}

function f_22(ctx) {
  ctx._i++;

  if (t2) {
    return M.jump(f_32, f_43);
  } else {
    return M.jump(f_32, f_43);
  }
}

function f_32(ctx) {
  ctx._j++;
  return M.repeat(f_12, f_43);
}

function f_43(ctx, e) {
  return M.raise(e);
}

function f_13(ctx) {
  if (true) {
    return M.chain(eff(ctx._j), f_23, f_52);
  } else {
    return M.jump(f_33, f_52);
  }
}

function f_23(ctx) {
  ctx._j++;

  if (t2) {
    return M.jump(f_33, f_52);
  } else {
    ctx._j--;
    return M.repeat(f_13, f_52);
  }
}

function f_33(ctx) {
  return M.chain(eff(ctx._j), f_42, f_52);
}

function f_42(ctx) {
  return M.pure();
}

function f_52(ctx, e) {
  return M.raise(e);
}