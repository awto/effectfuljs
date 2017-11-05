(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(f_1, f_71, i, ref);
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(_f_1, f_8, i, ref);
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(f_11, _f_7, i, void 0, ref);
});

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(f_12, f_43, j, len, ref);
});

(function () {
  var j,
      ctx = M.context();
  j = 0;
  return M.jump(f_13, f_52, j);
});

function f_1(i, ref) {
  if (i < 3) {
    return M.chain(eff(i), f_2, f_71, i, ref);
  } else {
    return M.pure();
  }
}

function f_2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return M.jump(f_3, f_71, i, j, len, ref);
}

function f_3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), f_4, f_71, i, j, len, ref);
  } else {
    return M.jump(f_6, f_71, i, ref);
  }
}

function f_4(a, i, j, len, ref) {
  if (a) {
    return M.jump(f_5, f_71, i, j, len, ref);
  } else {
    if (t1) {
      return M.jump(f_6, f_71, i, ref);
    } else {
      return M.jump(f_5, f_71, i, j, len, ref);
    }
  }
}

function f_5(i, j, len, ref) {
  j++;
  return M.repeat(f_3, f_71, i, j, len, ref);
}

function f_6(i, ref) {
  i++;
  return M.repeat(f_1, f_71, i, ref);
}

function f_71(e) {
  return M.raise(e);
}

function _f_1(i, ref) {
  if (i < 3) {
    return M.chain(eff(i), _f_2, f_8, i, ref);
  } else {
    return M.pure();
  }
}

function _f_2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return M.jump(_f_3, f_8, i, j, len, ref);
}

function _f_3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), _f_4, f_8, i, j, len, ref);
  } else {
    return M.jump(f_7, f_8, i, ref);
  }
}

function _f_4(a, i, j, len, ref) {
  if (a) {
    return M.jump(_f_6, f_8, i, j, len, ref);
  } else {
    return M.chain(eff(2), _f_5, f_8, i, j, len, ref);
  }
}

function _f_5(a, i, j, len, ref) {
  if (a) {
    return M.jump(f_7, f_8, i, ref);
  } else {
    return M.jump(_f_6, f_8, i, j, len, ref);
  }
}

function _f_6(i, j, len, ref) {
  j++;
  return M.repeat(_f_3, f_8, i, j, len, ref);
}

function f_7(i, ref) {
  i++;
  return M.repeat(_f_1, f_8, i, ref);
}

function f_8(e) {
  return M.raise(e);
}

function f_11(i, j, ref) {
  if (i < 3) {
    return M.chain(eff(i), f_21, _f_7, i, ref);
  } else {
    return M.chain(eff(j), f_61, _f_7);
  }
}

function f_21(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return M.jump(f_31, _f_7, i, j, len, ref);
}

function f_31(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), f_41, _f_7, i, j, len, ref);
  } else {
    return M.jump(f_51, _f_7, i, j, ref);
  }
}

function f_41(i, j, len, ref) {
  j++;

  if (t2) {
    return M.jump(f_51, _f_7, i, j, ref);
  } else {
    j++;
    return M.repeat(f_31, _f_7, i, j, len, ref);
  }
}

function f_51(i, j, ref) {
  i++;
  return M.repeat(f_11, _f_7, i, j, ref);
}

function f_61() {
  return M.pure();
}

function _f_7(e) {
  return M.raise(e);
}

function f_12(j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), f_22, f_43, j, len, ref);
  } else {
    return M.pure();
  }
}

function f_22(j, len, ref) {
  var i;
  i++;

  if (t2) {
    return M.jump(f_32, f_43, j, len, ref);
  } else {
    return M.jump(f_32, f_43, j, len, ref);
  }
}

function f_32(j, len, ref) {
  j++;
  return M.repeat(f_12, f_43, j, len, ref);
}

function f_43(e) {
  return M.raise(e);
}

function f_13(ctx, j) {
  if (true) {
    return M.chain(eff(j), f_23, f_52, j);
  } else {
    return M.jump(f_33, f_52, j);
  }
}

function f_23(ctx, j) {
  j++;

  if (t2) {
    return M.jump(f_33, f_52, j);
  } else {
    j--;
    return M.repeat(f_13, f_52, j);
  }
}

function f_33(ctx, j) {
  return M.chain(eff(j), f_42, f_52);
}

function f_42(ctx) {
  return M.pure();
}

function f_52(ctx, e) {
  return M.raise(e);
}