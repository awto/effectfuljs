import * as M from '@effectful/core';

function a1() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    if (!a) {
      return M.chain(eff(2), _2, _3);
    } else {
      return M.pure(a);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a2() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    if (a) {
      return M.chain(eff(2), _2, _3);
    } else {
      return M.pure(a);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a3() {
  var a;
  return M.chain(eff(1), _1, _4);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _4);
  }

  function _2(c) {
    var b;
    b = a || c;

    if (!b) {
      return M.chain(eff(3), _3, _4);
    } else {
      return M.pure(b);
    }
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function a4() {
  var a;
  return M.chain(eff(1), _1, _4);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _4);
  }

  function _2(c) {
    var b;
    b = a && c;

    if (b) {
      return M.chain(eff(3), _3, _4);
    } else {
      return M.pure(b);
    }
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function a5() {
  var a;
  a = 1;

  if (!a) {
    return M.chain(eff(2), _1, _2);
  } else {
    return M.pure(a);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a6() {
  return M.chain(eff(2), _1, _2);

  function _1(a) {
    if (!a) {
      a = 1;
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a7() {
  var a;
  a = 1 + 1;

  if (!a) {
    return M.chain(eff(2), _1, _2);
  } else {
    return M.pure(a);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a8() {
  return M.chain(eff(2), _1, _2);

  function _1(a) {
    if (!a) {
      a = 1 + 1;
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a9() {
  var a;
  a = 1;

  if (a) {
    return M.chain(eff(2), _1, _2);
  } else {
    return M.pure(a);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a10() {
  return M.chain(eff(2), _1, _2);

  function _1(a) {
    if (a) {
      a = 1;
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a11() {
  var a;
  a = 1 + 1;

  if (a) {
    return M.chain(eff(2), _1, _2);
  } else {
    return M.pure(a);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a12() {
  return M.chain(eff(2), _1, _2);

  function _1(a) {
    if (a) {
      a = 1 + 1;
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a13() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    if (a) {
      return M.chain(eff(2), _2, _3);
    } else {
      return M.chain(eff(3), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a14() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    var b;

    if (a) {
      b = 2;
      return M.pure(b);
    } else {
      return M.chain(eff(3), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a14_1() {
  var r;
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    var b;

    if (a) {
      b = 2;
      return M.jump(b, _2, _3);
    } else {
      return M.chain(eff(3), _2, _3);
    }
  }

  function _2(r) {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a15() {
  return M.chain(eff(1), _1, _3);

  function _1(a) {
    var b;

    if (a) {
      return M.chain(eff(2), _2, _3);
    } else {
      b = 3;
      return M.pure(b);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a16() {
  if (1) {
    return M.chain(eff(2), _1, _2);
  } else {
    return M.chain(eff(3), _1, _2);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a17() {
  return M.chain(eff(1), _1, _2);

  function _1(a) {
    var b;

    if (a) {
      b = 2;
    } else {
      b = 3;
    }

    console.log(b);
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a18() {
  var a;
  return M.chain(eff(1), _1, _3);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _3);
  }

  function _2(b) {
    if (a + b) {
      2;
    } else {
      3;
    }

    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a18_1() {
  var a, r;
  return M.chain(eff(1), _1, _3);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2, _3);
  }

  function _2(b) {
    var c;

    if (a + b) {
      c = 2;
    } else {
      c = 3;
    }

    return M.pure(c);
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a19() {
  var a;
  return M.chain(eff(1), _1, _6);

  function _1(a) {
    if (!a) {
      return M.chain(eff(2), _2, _6);
    } else {
      return M.jump(a, _4, _6);
    }
  }

  function _2(b) {
    a = b;
    return M.chain(eff(3), _3, _6);
  }

  function _3(c) {
    var b;
    b = (a, c);
    return M.jump(void 0, _4, _6);
  }

  function _4(b) {
    return M.chain(eff(b), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}

function a19_1() {
  var a, r;
  return M.chain(eff(1), _1, _6);

  function _1(a) {
    if (!a) {
      return M.chain(eff(2), _2, _6);
    } else {
      return M.jump(a, _4, _6);
    }
  }

  function _2(b) {
    a = b;
    return M.chain(eff(3), _3, _6);
  }

  function _3(c) {
    var b;
    b = (a, c);
    return M.jump(void 0, _4, _6);
  }

  function _4(b) {
    return M.chain(eff(b), _5, _6);
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }
}

function b() {
  var r;
  return M.chain(eff(1), _1, _21);

  function _1(a) {
    if (!a) {
      return M.chain(eff(2), _2, _21);
    } else {
      return M.jump(a, _2, _21);
    }
  }

  function _2() {
    return M.chain(eff(1), _3, _21);
  }

  function _3(a) {
    if (a) {
      return M.chain(eff(2), _4, _21);
    } else {
      return M.jump(a, _4, _21);
    }
  }

  function _4() {
    var a;
    a = 1;

    if (!a) {
      return M.chain(eff(2), _5, _21);
    } else {
      return M.jump(a, _5, _21);
    }
  }

  function _5() {
    return M.chain(eff(2), _6, _21);
  }

  function _6(a) {
    var b;

    if (!a) {
      a = 1;
    }

    b = 1 + 1;

    if (!b) {
      return M.chain(eff(2), _7, _21);
    } else {
      return M.jump(b, _7, _21);
    }
  }

  function _7() {
    return M.chain(eff(2), _8, _21);
  }

  function _8(a) {
    var b;

    if (!a) {
      a = 1 + 1;
    }

    b = 1;

    if (b) {
      return M.chain(eff(2), _9, _21);
    } else {
      return M.jump(b, _9, _21);
    }
  }

  function _9() {
    return M.chain(eff(2), _10, _21);
  }

  function _10(a) {
    var b;

    if (a) {
      a = 1;
    }

    b = 1 + 1;

    if (b) {
      return M.chain(eff(2), _11, _21);
    } else {
      return M.jump(b, _11, _21);
    }
  }

  function _11() {
    return M.chain(eff(2), _12, _21);
  }

  function _12(a) {
    if (a) {
      a = 1 + 1;
    }

    return M.chain(eff(1), _13, _21);
  }

  function _13(a) {
    if (a) {
      return M.chain(eff(2), _14, _21);
    } else {
      return M.chain(eff(3), _14, _21);
    }
  }

  function _14() {
    return M.chain(eff(1), _15, _21);
  }

  function _15(a) {
    var b;

    if (a) {
      b = 2;
      return M.jump(b, _16, _21);
    } else {
      return M.chain(eff(3), _16, _21);
    }
  }

  function _16() {
    return M.chain(eff(1), _17, _21);
  }

  function _17(a) {
    var b;

    if (a) {
      return M.chain(eff(2), _18, _21);
    } else {
      b = 3;
      return M.jump(b, _18, _21);
    }
  }

  function _18() {
    if (1) {
      return M.chain(eff(2), _19, _21);
    } else {
      return M.chain(eff(3), _19, _21);
    }
  }

  function _19() {
    return M.chain(eff(1), _20, _21);
  }

  function _20(a) {
    var b;

    if (a) {
      b = 2;
    } else {
      b = 3;
    }

    return M.pure(b);
  }

  function _21(e) {
    return M.raise(e);
  }
}

function a1() {
  var i, r;
  return M.scope(_1, _30);

  function _1() {
    return M.yldStar(M.yld('a1'), _2, _30);
  }

  function _2(a) {
    if (a) {
      return M.yldStar(M.yld('a2'), _3, _30);
    } else {
      return M.yldStar(M.yld('a3'), _3, _30);
    }
  }

  function _3() {
    return M.yldStar(M.yld('b1'), _4, _30);
  }

  function _4(a) {
    var b;

    if (a % 2) {
      b = 'b2';
    } else {
      b = 'b3';
    }

    return M.yldStar(M.yld(b), _5, _30);
  }

  function _5() {
    return M.yldStar(M.yld('c1'), _6, _30);
  }

  function _6(a) {
    var b;

    if (a % 2) {
      return M.yldStar(M.yld('c2'), _7, _30);
    } else {
      b = 'c3';
      return M.jump(b, _7, _30);
    }
  }

  function _7(a) {
    return M.yldStar(M.yld(a), _8, _30);
  }

  function _8() {
    return M.yldStar(M.yld('d1'), _9, _30);
  }

  function _9(a) {
    var b;

    if (a % 2) {
      b = 'd2';
      return M.jump(b, _10, _30);
    } else {
      return M.yldStar(M.yld('d3'), _10, _30);
    }
  }

  function _10(a) {
    return M.yldStar(M.yld(a), _11, _30);
  }

  function _11() {
    return M.yldStar(M.yld('e1'), _12, _30);
  }

  function _12(a) {
    if (a % 2) {
      return M.yldStar(M.yld('e2'), _13, _30);
    } else {
      return M.yldStar(M.yld('e3'), _13, _30);
    }
  }

  function _13(a) {
    return M.yldStar(M.yld(a), _14, _30);
  }

  function _14() {
    var a;
    a = 'a1l' && 'a1r';
    return M.yldStar(M.yld(a), _15, _30);
  }

  function _15() {
    var a;
    a = 'a2l' && 'a2r';
    return M.yldStar(M.yld(a), _16, _30);
  }

  function _16(a) {
    return M.yldStar(M.yld(a), _17, _30);
  }

  function _17() {
    var a;
    a = 'a3l';

    if (a) {
      return M.yldStar(M.yld('a3r'), _18, _30);
    } else {
      return M.jump(a, _18, _30);
    }
  }

  function _18(a) {
    return M.yldStar(M.yld(a), _19, _30);
  }

  function _19() {
    var a;
    a = 'a4l';

    if (a) {
      return M.yldStar(M.yld('a4r'), _20, _30);
    } else {
      return M.jump(a, _20, _30);
    }
  }

  function _20(a) {
    return M.yldStar(M.yld(a), _21, _30);
  }

  function _21(a) {
    return M.yldStar(M.yld(a), _22, _30);
  }

  function _22() {
    var a;
    a = 'o1l' || 'o1r';
    return M.yldStar(M.yld(a), _23, _30);
  }

  function _23() {
    return M.yldStar(M.yld('o2l'), _24, _30);
  }

  function _24(a) {
    if (a) {
      a = 'o2r';
    }

    return M.yldStar(M.yld(a), _25, _30);
  }

  function _25() {
    var a;
    a = 'o3l';

    if (a) {
      return M.yldStar(M.yld('o3r'), _26, _30);
    } else {
      return M.jump(a, _26, _30);
    }
  }

  function _26(a) {
    return M.yldStar(M.yld(a), _27, _30);
  }

  function _27() {
    return M.yldStar(M.yld('o4l'), _28, _30);
  }

  function _28(a) {
    if (a) {
      return M.yldStar(M.yld('o4r'), _29, _30);
    } else {
      return M.jump(a, _29, _30);
    }
  }

  function _29(r) {
    return M.pure(r);
  }

  function _30(e) {
    return M.raise(e);
  }
}