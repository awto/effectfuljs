import * as M from "@effectful/core";

function f1() {
  var f1 = M.context();
  return M.scope(f1_1);
}

function f2() {
  var f2 = M.context();
  return M.scope(f2_1);
}

function f3() {
  var f3 = M.context();
  return M.scope(f3_1);
}

function f4() {
  var f4 = M.context();
  return M.scope(f4_1);
}

function f5() {
  var f5 = M.context();
  return M.scope(f5_1);
}

function f1_1(f1) {
  f1._ref = [1, 2, 3];
  f1._i = 0;
  return M.jump(void 0, f1_2);
}

function f1_2(f1) {
  if (f1._i < 3) {
    return M.chain(eff(f1._i), f1_3);
  }
}

function f1_3(f1) {
  f1._j = 0, f1._len = f1._ref.length;
  return M.jump(void 0, f1_4);
}

function f1_4(f1) {
  if (f1._j < f1._len) {
    d = f1._ref[f1._j];
    return M.chain(eff(d), f1_5);
  } else {
    f1._j = null, f1._len = null;
    return M.jump(void 0, f1_7);
  }
}

function f1_5(f1, a) {
  if (a) {
    return M.jump(void 0, f1_6);
  } else {
    if (t1) {
      return M.jump(void 0, f1_7);
    } else {
      return M.jump(void 0, f1_6);
    }
  }
}

function f1_6(f1) {
  f1._j++;
  return M.jump(void 0, f1_4);
}

function f1_7(f1) {
  f1._i++;
  return M.jump(void 0, f1_2);
}

function f2_1(f2) {
  f2._ref = [1, 2, 3];
  f2._i = 0;
  return M.jump(void 0, f2_2);
}

function f2_2(f2) {
  if (f2._i < 3) {
    return M.chain(eff(f2._i), f2_3);
  }
}

function f2_3(f2) {
  f2._j = 0, f2._len = f2._ref.length;
  return M.jump(void 0, f2_4);
}

function f2_4(f2) {
  if (f2._j < f2._len) {
    d = f2._ref[f2._j];
    return M.chain(eff(d), f2_5);
  } else {
    f2._j = null, f2._len = null;
    return M.jump(void 0, f2_8);
  }
}

function f2_5(f2, a) {
  if (a) {
    return M.jump(void 0, f2_7);
  } else {
    return M.chain(eff(2), f2_6);
  }
}

function f2_6(f2, a) {
  if (a) {
    return M.jump(void 0, f2_8);
  } else {
    return M.jump(void 0, f2_7);
  }
}

function f2_7(f2) {
  f2._j++;
  return M.jump(void 0, f2_4);
}

function f2_8(f2) {
  f2._i++;
  return M.jump(void 0, f2_2);
}

function f3_1(f3) {
  f3._ref = [1, 2, 3];
  f3._i = 0;
  return M.jump(void 0, f3_2);
}

function f3_2(f3) {
  var a;

  if (f3._i < 3) {
    f3._j = null;
    return M.chain(eff(f3._i), f3_3);
  } else {
    a = f3._j, f3._i = null, f3._j = null;
    return M.chain(eff(a), f3_7);
  }
}

function f3_3(f3) {
  f3._j = 0, f3._len = f3._ref.length;
  return M.jump(void 0, f3_4);
}

function f3_4(f3) {
  if (f3._j < f3._len) {
    d = f3._ref[f3._j];
    return M.chain(eff(d), f3_5);
  } else {
    f3._len = null;
    return M.jump(void 0, f3_6);
  }
}

function f3_5(f3) {
  f3._j++;

  if (t2) {
    return M.jump(void 0, f3_6);
  } else {
    f3._j++;
    return M.jump(void 0, f3_4);
  }
}

function f3_6(f3) {
  f3._i++;
  return M.jump(void 0, f3_2);
}

function f3_7(f3) {}

function f4_1(f4) {
  f4._ref = [1, 2, 3];
  f4._j = 0, f4._len = f4._ref.length;
  return M.jump(void 0, f4_2);
}

function f4_2(f4) {
  if (f4._j < f4._len) {
    d = f4._ref[f4._j];
    return M.chain(eff(d), f4_3);
  }
}

function f4_3(f4) {
  f4._i++;

  if (t2) {
    return M.jump(void 0, f4_4);
  } else {
    return M.jump(void 0, f4_4);
  }
}

function f4_4(f4) {
  f4._j++;
  return M.jump(void 0, f4_2);
}

function f5_1(f5) {
  f5._j = 0;
  return M.jump(void 0, f5_2);
}

function f5_2(f5) {
  if (true) {
    return M.chain(eff(f5._j), f5_3);
  } else {
    return M.jump(void 0, f5_4);
  }
}

function f5_3(f5) {
  f5._j++;

  if (t2) {
    return M.jump(void 0, f5_4);
  } else {
    f5._j--;
    return M.jump(void 0, f5_2);
  }
}

function f5_4(f5) {
  var a;
  a = f5._j, f5._j = null;
  return M.chain(eff(a), f5_5);
}

function f5_5(f5) {}