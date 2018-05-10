import * as M from "@effectful/core";

(function () {
  var ctx = M.context();
  return M.scope(f_1);
});

(function () {
  var ctx = M.context();
  return M.scope(_f_1);
});

(function () {
  var ctx = M.context();
  return M.scope(f_11);
});

(function () {
  var ctx = M.context();
  return M.scope(f_12);
});

(function () {
  var ctx = M.context();
  return M.scope(f_13);
});

function f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(void 0, f_2);
}

function f_2(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), f_3);
  }
}

function f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, f_4);
}

function f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_5);
  } else {
    ctx._j = null, ctx._len = null;
    return M.jump(void 0, f_7);
  }
}

function f_5(ctx, a) {
  if (a) {
    return M.jump(void 0, f_6);
  } else {
    if (t1) {
      return M.jump(void 0, f_7);
    } else {
      return M.jump(void 0, f_6);
    }
  }
}

function f_6(ctx) {
  ctx._j++;
  return M.jump(void 0, f_4);
}

function f_7(ctx) {
  ctx._i++;
  return M.jump(void 0, f_2);
}

function _f_1(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(void 0, _f_2);
}

function _f_2(ctx) {
  if (ctx._i < 3) {
    return M.chain(eff(ctx._i), _f_3);
  }
}

function _f_3(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, _f_4);
}

function _f_4(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), _f_5);
  } else {
    ctx._j = null, ctx._len = null;
    return M.jump(void 0, f_8);
  }
}

function _f_5(ctx, a) {
  if (a) {
    return M.jump(void 0, _f_7);
  } else {
    return M.chain(eff(2), _f_6);
  }
}

function _f_6(ctx, a) {
  if (a) {
    return M.jump(void 0, f_8);
  } else {
    return M.jump(void 0, _f_7);
  }
}

function _f_7(ctx) {
  ctx._j++;
  return M.jump(void 0, _f_4);
}

function f_8(ctx) {
  ctx._i++;
  return M.jump(void 0, _f_2);
}

function f_11(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._i = 0;
  return M.jump(void 0, f_21);
}

function f_21(ctx) {
  var a;

  if (ctx._i < 3) {
    ctx._j = null;
    return M.chain(eff(ctx._i), f_31);
  } else {
    a = ctx._j, ctx._i = null, ctx._j = null;
    return M.chain(eff(a), f_71);
  }
}

function f_31(ctx) {
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, f_41);
}

function f_41(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_51);
  } else {
    ctx._len = null;
    return M.jump(void 0, f_61);
  }
}

function f_51(ctx) {
  ctx._j++;

  if (t2) {
    return M.jump(void 0, f_61);
  } else {
    ctx._j++;
    return M.jump(void 0, f_41);
  }
}

function f_61(ctx) {
  ctx._i++;
  return M.jump(void 0, f_21);
}

function f_71(ctx) {}

function f_12(ctx) {
  ctx._ref = [1, 2, 3];
  ctx._j = 0, ctx._len = ctx._ref.length;
  return M.jump(void 0, f_22);
}

function f_22(ctx) {
  if (ctx._j < ctx._len) {
    d = ctx._ref[ctx._j];
    return M.chain(eff(d), f_32);
  }
}

function f_32(ctx) {
  var i;
  i++;

  if (t2) {
    return M.jump(void 0, f_42);
  } else {
    return M.jump(void 0, f_42);
  }
}

function f_42(ctx) {
  ctx._j++;
  return M.jump(void 0, f_22);
}

function f_13(ctx) {
  ctx._j = 0;
  return M.jump(void 0, f_23);
}

function f_23(ctx) {
  if (true) {
    return M.chain(eff(ctx._j), f_33);
  } else {
    return M.jump(void 0, f_43);
  }
}

function f_33(ctx) {
  ctx._j++;

  if (t2) {
    return M.jump(void 0, f_43);
  } else {
    ctx._j--;
    return M.jump(void 0, f_23);
  }
}

function f_43(ctx) {
  var a;
  a = ctx._j, ctx._j = null;
  return M.chain(eff(a), f_52);
}

function f_52(ctx) {}