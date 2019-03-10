import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();
  a1.$sc = a1_1;
  return M.scope(a1_5);
}

function a2() {
  var a2 = M.context();
  a2.$sc = a2_1;
  return M.scope(a2_6);
}

function a3() {
  var a3 = M.context();
  a3.$sc = a3_1;
  return M.scope(a3_9);
}

function a4() {
  var a4 = M.context();
  a4.$sc = a4_1;
  return M.scope(a4_11);
}

function a5(i) {
  var a5 = M.context();
  a5._i = i;
  a5.$sc = _a5_1;
  return M.scope(a5_16);
}

function a5_1(i) {
  var a5_1 = M.context();
  a5_1._i = i;
  a5_1.$sc = a5_1_1;
  return M.scope(a5_1_12);
}

function a5_2(i) {
  var a5_2 = M.context();
  a5_2._i = i;
  a5_2.$sc = a5_2_1;
  return M.scope(a5_2_16);
}

function a5_2(i) {
  var a5_2 = M.context();
  a5_2._i = i;
  a5_2.$sc = _a5_2_1;
  return M.scope(_a5_2_16);
}

function a1_1(a1) {
  a1._loop = M.iterator(b());
  a1.$sc = a1_2;
  return M.jumpForOf(void 0, a1_7, a1_3, a1._loop);
}

function a1_2(a1, _i) {
  var i;
  {
    i = _i;
    return M.yldStar(M.yld(i), a1_7);
  }
}

function a1_3(a1) {
  var a, b;

  if (a1._loop.exit) {
    a1._loop.exit();
  }

  a1.$sc = a1._fc;
  (a = a1._fc),
    (b = a1._fe),
    (a1._loop = null),
    (a1._fc = null),
    (a1._fe = null);
  return M.jump(void 0, b);
}

function a1_4(a1) {
  return M.pure();
}

function a1_5(a1, e) {
  return M.raise(e);
}

function a1_6(a1) {
  return M.raise(a1._err1);
}

function a1_7(a1, a) {
  a1.$sc = a1_3;
  (a1._fc = a1_6), (a1._fe = a1_5), (a1._err1 = a);
  return M.jump(void 0, a1_5);
}

function a2_1(a2) {
  a2._loop = M.iterator(b());
  a2.$sc = a2_2;
  return M.jumpForOf(void 0, a2_8, a2_3, a2._loop);
}

function a2_2(a2, _i) {
  var i;
  {
    i = _i;
    return M.yldStar(M.yld(i), a2_8);
  }
}

function a2_3(a2) {
  var a, b;

  if (a2._loop.exit) {
    a2._loop.exit();
  }

  a2.$sc = a2._fc;
  (a = a2._fc),
    (b = a2._fe),
    (a2._loop = null),
    (a2._fc = null),
    (a2._fe = null);
  return M.jump(void 0, b);
}

function a2_4(a2) {
  return M.yldStar(M.yld("f"), a2_6);
}

function a2_5(a2) {
  return M.pure();
}

function a2_6(a2, e) {
  return M.raise(e);
}

function a2_7(a2) {
  return M.raise(a2._err1);
}

function a2_8(a2, a) {
  a2.$sc = a2_3;
  (a2._fc = a2_7), (a2._fe = a2_6), (a2._err1 = a);
  return M.jump(void 0, a2_6);
}

function a3_1(a3) {
  a3._loop = M.iterator(b());
  a3.$sc = a3_2;
  return M.jumpForOf(void 0, a3_11, a3_6, a3._loop);
}

function a3_2(a3, i) {
  {
    a3._i = i;
    return M.yldStar(M.yld(a3._i), a3_11);
  }
}

function a3_3(a3) {
  var a;
  a = a3._i++;
  return M.yldStar(M.yld(a), a3_11);
}

function a3_4(a3, a) {
  var b;

  if (a) {
    a3.$sc = a3_2;
    return M.jumpForOf(void 0, a3_11, a3_6, a3._loop);
  } else {
    b = a3._i += 2;
    return M.yldStar(M.yld(b), a3_11);
  }
}

function a3_5(a3, a) {
  if (a) {
    a3.$sc = a3_6;
    (a3._fc = a3_7), (a3._fe = a3_9);
    return M.jump(void 0, a3_9);
  } else {
    a3.$sc = a3_2;
    return M.jumpForOf(void 0, a3_11, a3_6, a3._loop);
  }
}

function a3_6(a3) {
  var a, b;

  if (a3._loop.exit) {
    a3._loop.exit();
  }

  a3.$sc = a3._fc;
  (a = a3._fc),
    (b = a3._fe),
    (a3._loop = null),
    (a3._fc = null),
    (a3._fe = null);
  return M.jump(void 0, b);
}

function a3_7(a3) {
  return M.yldStar(M.yld("f"), a3_9);
}

function a3_8(a3) {
  return M.pure();
}

function a3_9(a3, e) {
  return M.raise(e);
}

function a3_10(a3) {
  return M.raise(a3._err1);
}

function a3_11(a3, a) {
  a3.$sc = a3_6;
  (a3._fc = a3_10), (a3._fe = a3_9), (a3._err1 = a);
  return M.jump(void 0, a3_9);
}

function a4_1(a4) {
  a4._loop = M.iterator(b());
  a4.$sc = a4_2;
  return M.jumpForOf(void 0, a4_12, a4_5, a4._loop);
}

function a4_2(a4, i) {
  {
    a4._i = i;
    a4.$sc = a4_3;
    return M.jump(void 0, a4_13);
  }
}

function a4_3(a4) {
  return M.yldStar(M.yld(a4._i), a4_12);
}

function a4_4(a4) {
  var e, a;
  e = a4._ex;
  a = e.message;
  a4._ex = null;
  return M.yldStar(M.yld(a), a4_12);
}

function a4_5(a4) {
  var a, b;

  if (a4._loop.exit) {
    a4._loop.exit();
  }

  a4.$sc = a4._fc;
  (a4._ex1 = a4._err2),
    (a = a4._fc),
    (b = a4._fe),
    (a4._loop = null),
    (a4._fc = null),
    (a4._fe = null),
    (a4._err2 = null);
  return M.jump(void 0, b);
}

function a4_6(a4) {
  var e;
  e = a4._ex1;
  (a4._fc1 = a4_8), (a4._fe1 = a4_9), (a4._ex1 = null);
  return M.yldStar(M.yld(e), a4_9);
}

function a4_7(a4) {
  var a, b;
  (a = a4._fc1), (b = a4._fe1), (a4._fc1 = null), (a4._fe1 = null);
  return M.yldStar(M.yld("f"), b);
}

function a4_8(a4) {
  return M.pure(r);
}

function a4_9(a4, e) {
  return M.raise(e);
}

function a4_10(a4) {
  return M.raise(a4._err1);
}

function a4_11(a4, a) {
  a4.$sc = a4_6;
  a4._ex1 = a;
  return M.jump(void 0, a4_14);
}

function a4_12(a4, a) {
  a4.$sc = a4_5;
  (a4._fc = a4_6), (a4._fe = a4_14), (a4._err2 = a);
  return M.jump(void 0, a4_11);
}

function a4_13(a4, a) {
  a4.$sc = a4_4;
  a4._ex = a;
  return M.jump(void 0, a4_12);
}

function a4_14(a4, a) {
  a4.$sc = a4_7;
  (a4._fc1 = a4_10), (a4._fe1 = a4_9), (a4._err1 = a);
  return M.jump(void 0, a4_9);
}

function _a5_1(a5) {
  a5._loop = M.iterator(some);
  a5.$sc = _a5_2;
  return M.jumpForOf(void 0, a5_20, a5_14, a5._loop);
}

function _a5_2(a5, i) {
  {
    a5._i1 = i;
    a5._loop1 = M.iterator(a5._i1);
    a5.$sc = a5_3;
    return M.jumpForOf(void 0, a5_21, a5_13, a5._loop1);
  }
}

function a5_3(a5, i) {
  var j;
  {
    j = i;
    a5.$sc = a5_4;
    return M.jump(void 0, a5_22);
  }
}

function a5_4(a5) {
  return M.yldStar(M.yld(a5._i1), a5_22);
}

function a5_5(a5, a) {
  switch (a) {
    case 1:
      a5.$sc = a5_12;
      (a5._fc = a5_3), (a5._fe = a5_21);
      return M.jump(void 0, a5_21);

    case 2:
      a5.$sc = a5_12;
      (a5._fc = a5_13), (a5._fe = a5_20), (a5._fc1 = _a5_2), (a5._fe1 = a5_20);
      return M.jump(void 0, a5_21);

    case 3:
      a5.$sc = a5_12;
      (a5._fc = a5_13), (a5._fe = a5_20), (a5._fc1 = _a5_2), (a5._fe1 = a5_20);
      return M.jump(void 0, a5_21);

    case 4:
      a5.$sc = a5_12;
      (a5._fc = a5_13),
        (a5._fe = a5_20),
        (a5._fc1 = a5_14),
        (a5._fe1 = a5_16),
        (a5._fc2 = a5_15),
        (a5._fe2 = a5_16);
      return M.jump(void 0, a5_21);

    case 5:
      a5.$sc = a5_12;
      (a5._fc = a5_13),
        (a5._fe = a5_20),
        (a5._fc1 = a5_14),
        (a5._fe1 = a5_16),
        (a5._fc2 = a5_15),
        (a5._fe2 = a5_16),
        (a5._r = 10);
      return M.jump(void 0, a5_21);

    case 6:
      a5.$sc = a5_12;
      (a5._fc = a5_3), (a5._fe = a5_21);
      return M.jump(void 0, a5_21);

    case 7:
      return M.yldStar(M.yld(7), a5_22);

    case 8:
      return M.yldStar(M.yld(8), a5_22);

    case 9:
      return M.yldStar(M.yld(9), a5_22);

    case 10:
      return M.yldStar(M.yld(10), a5_22);

    case 11:
      return M.yldStar(M.yld(11), a5_22);

    case 12:
      return M.yldStar(M.yld(12), a5_22);

    default:
      a5.$sc = a5_12;
      (a5._fc = a5_3), (a5._fe = a5_21);
      return M.jump(void 0, a5_21);
  }
}

function a5_6(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_3), (a5._fe = a5_21);
  return M.jump(void 0, a5_21);
}

function a5_7(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_13), (a5._fe = a5_20), (a5._fc1 = _a5_2), (a5._fe1 = a5_20);
  return M.jump(void 0, a5_21);
}

function a5_8(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_13), (a5._fe = a5_20), (a5._fc1 = _a5_2), (a5._fe1 = a5_20);
  return M.jump(void 0, a5_21);
}

function a5_9(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_13),
    (a5._fe = a5_20),
    (a5._fc1 = a5_14),
    (a5._fe1 = a5_16),
    (a5._fc2 = a5_15),
    (a5._fe2 = a5_16);
  return M.jump(void 0, a5_21);
}

function a5_10(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_13),
    (a5._fe = a5_20),
    (a5._fc1 = a5_14),
    (a5._fe1 = a5_16),
    (a5._fc2 = a5_15),
    (a5._fe2 = a5_16),
    (a5._r = 10);
  return M.jump(void 0, a5_21);
}

function a5_11(a5) {
  a5.$sc = a5_12;
  (a5._fc = a5_3), (a5._fe = a5_21);
  return M.jump(void 0, a5_21);
}

function a5_12(a5) {
  var a, b;
  console.log("F");
  a5.$sc = a5._fc;
  (a5._err2 = a5._err3),
    (a = a5._fc),
    (b = a5._fe),
    (a5._fc = null),
    (a5._fe = null);
  return M.jump(void 0, b);
}

function a5_13(a5) {
  if (a5._loop1.exit) {
    a5._loop1.exit();
  }

  a5.$sc = a5._fc1;
  a5._err1 = a5._err2;
  return M.jump(void 0, a5._fe1);
}

function a5_14(a5) {
  var a, b;

  if (a5._loop.exit) {
    a5._loop.exit();
  }

  a5.$sc = a5._fc2;
  (a = a5._fc2),
    (b = a5._fe2),
    (a5._loop = null),
    (a5._fc2 = null),
    (a5._fe2 = null);
  return M.jump(void 0, b);
}

function a5_15(a5) {
  return M.pure(a5._r);
}

function a5_16(a5, e) {
  return M.raise(e);
}

function a5_17(a5) {
  return M.raise(a5._err1);
}

function a5_18(a5) {
  return M.raise(a5._err2);
}

function a5_19(a5) {
  return M.raise(a5._err3);
}

function a5_20(a5, a) {
  a5.$sc = a5_14;
  (a5._fc2 = a5_17), (a5._fe2 = a5_16), (a5._err1 = a);
  return M.jump(void 0, a5_16);
}

function a5_21(a5, a) {
  a5.$sc = a5_13;
  (a5._fc1 = a5_14),
    (a5._fe1 = a5_16),
    (a5._fc2 = a5_18),
    (a5._fe2 = a5_16),
    (a5._err2 = a);
  return M.jump(void 0, a5_20);
}

function a5_22(a5, a) {
  a5.$sc = a5_12;
  (a5._fc = a5_13),
    (a5._fe = a5_20),
    (a5._fc1 = a5_14),
    (a5._fe1 = a5_16),
    (a5._fc2 = a5_19),
    (a5._fe2 = a5_16),
    (a5._err3 = a);
  return M.jump(void 0, a5_21);
}

function a5_1_1(a5_1) {
  a5_1._loop = M.iterator(some);
  a5_1.$sc = a5_1_2;
  return M.jumpForOf(void 0, a5_1_15, a5_1_10, a5_1._loop);
}

function a5_1_2(a5_1, i) {
  {
    a5_1._i1 = i;
    a5_1._loop1 = M.iterator(a5_1._i1);
    a5_1.$sc = a5_1_3;
    return M.jumpForOf(void 0, a5_1_16, a5_1_9, a5_1._loop1);
  }
}

function a5_1_3(a5_1, i) {
  var j;
  {
    j = i;
    return M.yldStar(M.yld(a5_1._i1), a5_1_16);
  }
}

function a5_1_4(a5_1, a) {
  switch (a) {
    case 1:
      a5_1.$sc = a5_1_3;
      return M.jumpForOf(void 0, a5_1_16, a5_1_9, a5_1._loop1);

    case 2:
      a5_1.$sc = a5_1_9;
      (a5_1._fc = a5_1_2), (a5_1._fe = a5_1_15);
      return M.jump(void 0, a5_1_15);

    case 3:
      a5_1.$sc = a5_1_9;
      (a5_1._fc = a5_1_2), (a5_1._fe = a5_1_15);
      return M.jump(void 0, a5_1_15);

    case 4:
      a5_1.$sc = a5_1_9;
      (a5_1._fc = a5_1_10),
        (a5_1._fe = a5_1_12),
        (a5_1._fc1 = a5_1_11),
        (a5_1._fe1 = a5_1_12);
      return M.jump(void 0, a5_1_15);

    case 5:
      a5_1.$sc = a5_1_9;
      (a5_1._fc = a5_1_10),
        (a5_1._fe = a5_1_12),
        (a5_1._fc1 = a5_1_11),
        (a5_1._fe1 = a5_1_12),
        (a5_1._r = 10);
      return M.jump(void 0, a5_1_15);

    case 6:
      a5_1.$sc = a5_1_3;
      return M.jumpForOf(void 0, a5_1_16, a5_1_9, a5_1._loop1);

    case 7:
      return M.yldStar(M.yld(7), a5_1_16);

    case 8:
      return M.yldStar(M.yld(8), a5_1_16);

    case 9:
      return M.yldStar(M.yld(9), a5_1_16);

    case 10:
      return M.yldStar(M.yld(10), a5_1_16);

    case 11:
      return M.yldStar(M.yld(11), a5_1_16);

    case 12:
      return M.yldStar(M.yld(12), a5_1_16);

    default:
      a5_1.$sc = a5_1_3;
      return M.jumpForOf(void 0, a5_1_16, a5_1_9, a5_1._loop1);
  }
}

function a5_1_5(a5_1) {
  a5_1.$sc = a5_1_9;
  (a5_1._fc = a5_1_2), (a5_1._fe = a5_1_15);
  return M.jump(void 0, a5_1_15);
}

function a5_1_6(a5_1) {
  a5_1.$sc = a5_1_9;
  (a5_1._fc = a5_1_2), (a5_1._fe = a5_1_15);
  return M.jump(void 0, a5_1_15);
}

function a5_1_7(a5_1) {
  a5_1.$sc = a5_1_9;
  (a5_1._fc = a5_1_10),
    (a5_1._fe = a5_1_12),
    (a5_1._fc1 = a5_1_11),
    (a5_1._fe1 = a5_1_12);
  return M.jump(void 0, a5_1_15);
}

function a5_1_8(a5_1) {
  a5_1.$sc = a5_1_9;
  (a5_1._fc = a5_1_10),
    (a5_1._fe = a5_1_12),
    (a5_1._fc1 = a5_1_11),
    (a5_1._fe1 = a5_1_12),
    (a5_1._r = 10);
  return M.jump(void 0, a5_1_15);
}

function a5_1_9(a5_1) {
  var a, b;

  if (a5_1._loop1.exit) {
    a5_1._loop1.exit();
  }

  a5_1.$sc = a5_1._fc;
  (a5_1._err1 = a5_1._err2),
    (a = a5_1._fc),
    (b = a5_1._fe),
    (a5_1._fc = null),
    (a5_1._fe = null);
  return M.jump(void 0, b);
}

function a5_1_10(a5_1) {
  var a, b;

  if (a5_1._loop.exit) {
    a5_1._loop.exit();
  }

  a5_1.$sc = a5_1._fc1;
  (a = a5_1._fc1),
    (b = a5_1._fe1),
    (a5_1._loop = null),
    (a5_1._fc1 = null),
    (a5_1._fe1 = null);
  return M.jump(void 0, b);
}

function a5_1_11(a5_1) {
  return M.pure(a5_1._r);
}

function a5_1_12(a5_1, e) {
  return M.raise(e);
}

function a5_1_13(a5_1) {
  return M.raise(a5_1._err1);
}

function a5_1_14(a5_1) {
  return M.raise(a5_1._err2);
}

function a5_1_15(a5_1, a) {
  a5_1.$sc = a5_1_10;
  (a5_1._fc1 = a5_1_13), (a5_1._fe1 = a5_1_12), (a5_1._err1 = a);
  return M.jump(void 0, a5_1_12);
}

function a5_1_16(a5_1, a) {
  a5_1.$sc = a5_1_9;
  (a5_1._fc = a5_1_10),
    (a5_1._fe = a5_1_12),
    (a5_1._fc1 = a5_1_14),
    (a5_1._fe1 = a5_1_12),
    (a5_1._err2 = a);
  return M.jump(void 0, a5_1_15);
}

function a5_2_1(a5_2) {
  a5_2._loop = M.iterator(some);
  a5_2.$sc = a5_2_2;
  return M.jumpForOf(void 0, a5_2_20, a5_2_14, a5_2._loop);
}

function a5_2_2(a5_2, i) {
  {
    a5_2._i1 = i;
    a5_2._loop1 = M.iterator(a5_2._i1);
    a5_2.$sc = a5_2_3;
    return M.jumpForOf(void 0, a5_2_21, a5_2_13, a5_2._loop1);
  }
}

function a5_2_3(a5_2, i) {
  var j;
  {
    j = i;
    a5_2.$sc = a5_2_4;
    return M.jump(void 0, a5_2_22);
  }
}

function a5_2_4(a5_2) {
  return M.yldStar(M.yld(a5_2._i1), a5_2_22);
}

function a5_2_5(a5_2, a) {
  switch (a) {
    case 1:
      a5_2.$sc = a5_2_12;
      (a5_2._fc = a5_2_3), (a5_2._fe = a5_2_21);
      return M.jump(void 0, a5_2_21);

    case 2:
      a5_2.$sc = a5_2_12;
      (a5_2._fc = a5_2_13),
        (a5_2._fe = a5_2_20),
        (a5_2._fc1 = a5_2_2),
        (a5_2._fe1 = a5_2_20);
      return M.jump(void 0, a5_2_21);

    case 3:
      a5_2.$sc = a5_2_12;
      (a5_2._fc = a5_2_13),
        (a5_2._fe = a5_2_20),
        (a5_2._fc1 = a5_2_2),
        (a5_2._fe1 = a5_2_20);
      return M.jump(void 0, a5_2_21);

    case 4:
      a5_2.$sc = a5_2_12;
      (a5_2._fc = a5_2_13),
        (a5_2._fe = a5_2_20),
        (a5_2._fc1 = a5_2_14),
        (a5_2._fe1 = a5_2_16),
        (a5_2._fc2 = a5_2_15),
        (a5_2._fe2 = a5_2_16);
      return M.jump(void 0, a5_2_21);

    case 5:
      a5_2.$sc = a5_2_12;
      (a5_2._fc = a5_2_13),
        (a5_2._fe = a5_2_20),
        (a5_2._fc1 = a5_2_14),
        (a5_2._fe1 = a5_2_16),
        (a5_2._fc2 = a5_2_15),
        (a5_2._fe2 = a5_2_16),
        (a5_2._r = 10);
      return M.jump(void 0, a5_2_21);

    case 6:
      a5_2.$sc = a5_2_11;
      return M.jump(void 0, a5_2_22);

    case 7:
      return M.yldStar(M.yld(7), a5_2_22);

    case 8:
      return M.yldStar(M.yld(8), a5_2_22);

    case 9:
      return M.yldStar(M.yld(9), a5_2_22);

    case 10:
      return M.yldStar(M.yld(10), a5_2_22);

    case 11:
      return M.yldStar(M.yld(11), a5_2_22);

    case 12:
      return M.yldStar(M.yld(12), a5_2_22);

    default:
      a5_2.$sc = a5_2_11;
      return M.jump(void 0, a5_2_22);
  }
}

function a5_2_6(a5_2) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_3), (a5_2._fe = a5_2_21);
  return M.jump(void 0, a5_2_21);
}

function a5_2_7(a5_2) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_13),
    (a5_2._fe = a5_2_20),
    (a5_2._fc1 = a5_2_2),
    (a5_2._fe1 = a5_2_20);
  return M.jump(void 0, a5_2_21);
}

function a5_2_8(a5_2) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_13),
    (a5_2._fe = a5_2_20),
    (a5_2._fc1 = a5_2_2),
    (a5_2._fe1 = a5_2_20);
  return M.jump(void 0, a5_2_21);
}

function a5_2_9(a5_2) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_13),
    (a5_2._fe = a5_2_20),
    (a5_2._fc1 = a5_2_14),
    (a5_2._fe1 = a5_2_16),
    (a5_2._fc2 = a5_2_15),
    (a5_2._fe2 = a5_2_16);
  return M.jump(void 0, a5_2_21);
}

function a5_2_10(a5_2) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_13),
    (a5_2._fe = a5_2_20),
    (a5_2._fc1 = a5_2_14),
    (a5_2._fe1 = a5_2_16),
    (a5_2._fc2 = a5_2_15),
    (a5_2._fe2 = a5_2_16),
    (a5_2._r = 10);
  return M.jump(void 0, a5_2_21);
}

function a5_2_11(a5_2) {
  (a5_2._fc = a5_2_3), (a5_2._fe = a5_2_21);
  return M.yldStar(M.yld(a5_2._i1), a5_2_21);
}

function a5_2_12(a5_2) {
  var a, b;
  console.log("F");
  a5_2.$sc = a5_2._fc;
  (a5_2._err2 = a5_2._err3),
    (a = a5_2._fc),
    (b = a5_2._fe),
    (a5_2._fc = null),
    (a5_2._fe = null);
  return M.jump(void 0, b);
}

function a5_2_13(a5_2) {
  if (a5_2._loop1.exit) {
    a5_2._loop1.exit();
  }

  a5_2.$sc = a5_2._fc1;
  a5_2._err1 = a5_2._err2;
  return M.jump(void 0, a5_2._fe1);
}

function a5_2_14(a5_2) {
  var a, b;

  if (a5_2._loop.exit) {
    a5_2._loop.exit();
  }

  a5_2.$sc = a5_2._fc2;
  (a = a5_2._fc2),
    (b = a5_2._fe2),
    (a5_2._loop = null),
    (a5_2._fc2 = null),
    (a5_2._fe2 = null);
  return M.jump(void 0, b);
}

function a5_2_15(a5_2) {
  return M.pure(a5_2._r);
}

function a5_2_16(a5_2, e) {
  return M.raise(e);
}

function a5_2_17(a5_2) {
  return M.raise(a5_2._err1);
}

function a5_2_18(a5_2) {
  return M.raise(a5_2._err2);
}

function a5_2_19(a5_2) {
  return M.raise(a5_2._err3);
}

function a5_2_20(a5_2, a) {
  a5_2.$sc = a5_2_14;
  (a5_2._fc2 = a5_2_17), (a5_2._fe2 = a5_2_16), (a5_2._err1 = a);
  return M.jump(void 0, a5_2_16);
}

function a5_2_21(a5_2, a) {
  a5_2.$sc = a5_2_13;
  (a5_2._fc1 = a5_2_14),
    (a5_2._fe1 = a5_2_16),
    (a5_2._fc2 = a5_2_18),
    (a5_2._fe2 = a5_2_16),
    (a5_2._err2 = a);
  return M.jump(void 0, a5_2_20);
}

function a5_2_22(a5_2, a) {
  a5_2.$sc = a5_2_12;
  (a5_2._fc = a5_2_13),
    (a5_2._fe = a5_2_20),
    (a5_2._fc1 = a5_2_14),
    (a5_2._fe1 = a5_2_16),
    (a5_2._fc2 = a5_2_19),
    (a5_2._fe2 = a5_2_16),
    (a5_2._err3 = a);
  return M.jump(void 0, a5_2_21);
}

function _a5_2_1(a5_2) {
  a5_2._loop = M.iterator(some);
  a5_2.$sc = _a5_2_2;
  return M.jumpForOf(void 0, _a5_2_20, _a5_2_14, a5_2._loop);
}

function _a5_2_2(a5_2, i) {
  {
    a5_2._i1 = i;
    a5_2._loop1 = M.iterator(a5_2._i1);
    a5_2.$sc = _a5_2_3;
    return M.jumpForOf(void 0, _a5_2_21, _a5_2_13, a5_2._loop1);
  }
}

function _a5_2_3(a5_2, i) {
  var j;
  {
    j = i;
    a5_2.$sc = _a5_2_4;
    return M.jump(void 0, _a5_2_22);
  }
}

function _a5_2_4(a5_2) {
  return M.yldStar(M.yld(a5_2._i1), _a5_2_22);
}

function _a5_2_5(a5_2, a) {
  switch (a) {
    case 1:
      a5_2.$sc = _a5_2_12;
      (a5_2._fc = _a5_2_3), (a5_2._fe = _a5_2_21);
      return M.jump(void 0, _a5_2_21);

    case 2:
      a5_2.$sc = _a5_2_12;
      (a5_2._fc = _a5_2_13),
        (a5_2._fe = _a5_2_20),
        (a5_2._fc1 = _a5_2_2),
        (a5_2._fe1 = _a5_2_20);
      return M.jump(void 0, _a5_2_21);

    case 3:
      a5_2.$sc = _a5_2_12;
      (a5_2._fc = _a5_2_13),
        (a5_2._fe = _a5_2_20),
        (a5_2._fc1 = _a5_2_2),
        (a5_2._fe1 = _a5_2_20);
      return M.jump(void 0, _a5_2_21);

    case 4:
      a5_2.$sc = _a5_2_12;
      (a5_2._fc = _a5_2_13),
        (a5_2._fe = _a5_2_20),
        (a5_2._fc1 = _a5_2_14),
        (a5_2._fe1 = _a5_2_16),
        (a5_2._fc2 = _a5_2_15),
        (a5_2._fe2 = _a5_2_16);
      return M.jump(void 0, _a5_2_21);

    case 5:
      a5_2.$sc = _a5_2_12;
      (a5_2._fc = _a5_2_13),
        (a5_2._fe = _a5_2_20),
        (a5_2._fc1 = _a5_2_14),
        (a5_2._fe1 = _a5_2_16),
        (a5_2._fc2 = _a5_2_15),
        (a5_2._fe2 = _a5_2_16),
        (a5_2._r = 10);
      return M.jump(void 0, _a5_2_21);

    case 6:
      a5_2.$sc = _a5_2_11;
      return M.jump(void 0, _a5_2_22);

    case 7:
      return M.yldStar(M.yld(7), _a5_2_22);

    case 8:
      return M.yldStar(M.yld(8), _a5_2_22);

    case 9:
      return M.yldStar(M.yld(9), _a5_2_22);

    case 10:
      return M.yldStar(M.yld(10), _a5_2_22);

    case 11:
      return M.yldStar(M.yld(11), _a5_2_22);

    case 12:
      return M.yldStar(M.yld(12), _a5_2_22);

    default:
      a5_2.$sc = _a5_2_11;
      return M.jump(void 0, _a5_2_22);
  }
}

function _a5_2_6(a5_2) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_3), (a5_2._fe = _a5_2_21);
  return M.jump(void 0, _a5_2_21);
}

function _a5_2_7(a5_2) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_13),
    (a5_2._fe = _a5_2_20),
    (a5_2._fc1 = _a5_2_2),
    (a5_2._fe1 = _a5_2_20);
  return M.jump(void 0, _a5_2_21);
}

function _a5_2_8(a5_2) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_13),
    (a5_2._fe = _a5_2_20),
    (a5_2._fc1 = _a5_2_2),
    (a5_2._fe1 = _a5_2_20);
  return M.jump(void 0, _a5_2_21);
}

function _a5_2_9(a5_2) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_13),
    (a5_2._fe = _a5_2_20),
    (a5_2._fc1 = _a5_2_14),
    (a5_2._fe1 = _a5_2_16),
    (a5_2._fc2 = _a5_2_15),
    (a5_2._fe2 = _a5_2_16);
  return M.jump(void 0, _a5_2_21);
}

function _a5_2_10(a5_2) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_13),
    (a5_2._fe = _a5_2_20),
    (a5_2._fc1 = _a5_2_14),
    (a5_2._fe1 = _a5_2_16),
    (a5_2._fc2 = _a5_2_15),
    (a5_2._fe2 = _a5_2_16),
    (a5_2._r = 10);
  return M.jump(void 0, _a5_2_21);
}

function _a5_2_11(a5_2) {
  (a5_2._fc = _a5_2_3), (a5_2._fe = _a5_2_21);
  return M.yldStar(M.yld(a5_2._i1), _a5_2_21);
}

function _a5_2_12(a5_2) {
  var a, b;
  (a5_2._err2 = a5_2._err3),
    (a = a5_2._fc),
    (b = a5_2._fe),
    (a5_2._fc = null),
    (a5_2._fe = null);
  return M.yldStar(M.yld("F"), b);
}

function _a5_2_13(a5_2) {
  if (a5_2._loop1.exit) {
    a5_2._loop1.exit();
  }

  a5_2.$sc = a5_2._fc1;
  a5_2._err1 = a5_2._err2;
  return M.jump(void 0, a5_2._fe1);
}

function _a5_2_14(a5_2) {
  var a, b;

  if (a5_2._loop.exit) {
    a5_2._loop.exit();
  }

  a5_2.$sc = a5_2._fc2;
  (a = a5_2._fc2),
    (b = a5_2._fe2),
    (a5_2._loop = null),
    (a5_2._fc2 = null),
    (a5_2._fe2 = null);
  return M.jump(void 0, b);
}

function _a5_2_15(a5_2) {
  return M.pure(a5_2._r);
}

function _a5_2_16(a5_2, e) {
  return M.raise(e);
}

function _a5_2_17(a5_2) {
  return M.raise(a5_2._err1);
}

function _a5_2_18(a5_2) {
  return M.raise(a5_2._err2);
}

function _a5_2_19(a5_2) {
  return M.raise(a5_2._err3);
}

function _a5_2_20(a5_2, a) {
  a5_2.$sc = _a5_2_14;
  (a5_2._fc2 = _a5_2_17), (a5_2._fe2 = _a5_2_16), (a5_2._err1 = a);
  return M.jump(void 0, _a5_2_16);
}

function _a5_2_21(a5_2, a) {
  a5_2.$sc = _a5_2_13;
  (a5_2._fc1 = _a5_2_14),
    (a5_2._fe1 = _a5_2_16),
    (a5_2._fc2 = _a5_2_18),
    (a5_2._fe2 = _a5_2_16),
    (a5_2._err2 = a);
  return M.jump(void 0, _a5_2_20);
}

function _a5_2_22(a5_2, a) {
  a5_2.$sc = _a5_2_12;
  (a5_2._fc = _a5_2_13),
    (a5_2._fe = _a5_2_20),
    (a5_2._fc1 = _a5_2_14),
    (a5_2._fe1 = _a5_2_16),
    (a5_2._fc2 = _a5_2_19),
    (a5_2._fe2 = _a5_2_16),
    (a5_2._err3 = a);
  return M.jump(void 0, _a5_2_21);
}
