function a1() {
  var a1 = M.generator();
  a1.$sc = a1_1;
  return M.scopeH(a1_4);
}

function a2() {
  var a2 = M.generator();
  a2.$sc = a2_1;
  return M.scopeH(a2_5);
}

function a3() {
  var a3 = M.generator();
  a3.$sc = a3_1;
  return M.scopeH(a3_8);
}

function a4() {
  var a4 = M.generator();
  a4.$sc = a4_1;
  return M.scopeH(a4_10);
}

function a1_1(a1) {
  a1._loop = M.delegateIterator(b, a1_2, a1_4, a1_3);
  return a1._loop.step();
}

function a1_2(a1, i) {
  {
    a1._i = i;
    return M.delegate(M.yld(a1._i));
  }
}

function a1_3(a1) {
  return M.pure();
}

function a1_4(a1, e) {
  return M.raise(e);
}

function a2_1(a2) {
  a2._loop = M.delegateIterator(b, a2_2, a2_5, a2_3);
  return a2._loop.step();
}

function a2_2(a2, i) {
  {
    a2._i = i;
    return M.delegate(M.yld(a2._i));
  }
}

function a2_3(a2) {
  a2.$sc = a2_4;
  return M.delegate(M.yld('f'));
}

function a2_4(a2) {
  return M.pure();
}

function a2_5(a2, e) {
  return M.raise(e);
}

function a3_1(a3) {
  a3._loop = M.delegateIterator(b, a3_2, a3_8, a3_6);
  return a3._loop.step();
}

function a3_2(a3, i) {
  {
    a3._i = i;
    a3.$sc = a3_3;
    return M.delegate(M.yld(a3._i));
  }
}

function a3_3(a3) {
  var a;
  a = a3._i++;
  a3.$sc = a3_4;
  return M.delegate(M.yld(a));
}

function a3_4(a3, a) {
  var b;

  if (a) {
    return a3._loop.step();
  } else {
    b = a3._i += 2;
    a3.$sc = a3_5;
    return M.delegate(M.yld(b));
  }
}

function a3_5(a3, a) {
  if (a) {
    a3.$sc = a3_6;
    return M.jumpH(a3_8);
  } else {
    return a3._loop.step();
  }
}

function a3_6(a3) {
  a3.$sc = a3_7;
  return M.delegate(M.yld('f'));
}

function a3_7(a3) {
  return M.pure();
}

function a3_8(a3, e) {
  return M.raise(e);
}

function a4_1(a4) {
  a4._loop = M.delegateIterator(ba, a4_2, a4_10, a4_6);
  return a4._loop.step();
}

function a4_2(a4, i) {
  {
    a4._i = i;
    a4.$sc = a4_3;
    return M.jumpRH(a4_11);
  }
}

function a4_3(a4) {
  return M.delegate(M.yld(a4._i));
}

function a4_4(a4) {
  var a;
  a4._e = a4._ex;
  a = a4._e.message;
  return M.delegate(M.yld(a));
}

function a4_5(a4) {
  a4._e1 = a4._ex1;
  a4.$sc = a4_6;
  a4._fc = a4_7, a4._fe = a4_8;
  return M.delegate(M.yld(a4._e1));
}

function a4_6(a4) {
  a4.$sc = a4._fc;
  return M.delegate(M.yld('f'));
}

function a4_7(a4) {
  return M.pure(r);
}

function a4_8(a4, e) {
  return M.raise(e);
}

function a4_9(a4) {
  return M.raise(a4._err1);
}

function a4_10(a4, a) {
  a4.$sc = a4_5;
  a4._ex1 = a;
  return M.jumpH(a4_12);
}

function a4_11(a4, a) {
  a4.$sc = a4_4;
  a4._ex = a;
  return M.jumpH(a4_10);
}

function a4_12(a4, a) {
  a4.$sc = a4_6;
  a4._fc = a4_9, a4._fe = a4_8, a4._err1 = a;
  return M.jumpH(a4_8);
}