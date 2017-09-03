function a1() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? _2(a) : M.j(eff(2), _2);
  }

  function _2() {
    return M.pure();
  }
}

function a2() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? M.j(eff(2), _2) : _2(a);
  }

  function _2() {
    return M.pure();
  }
}

function a3() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? _2(a) : M.jB(eff(2), _2);
  }

  function _2(a) {
    return a ? _3(a) : M.j(eff(3), _3);
  }

  function _3() {
    return M.pure();
  }
}

function a4() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? M.jB(eff(2), _2) : _2(a);
  }

  function _2(a) {
    return a ? M.j(eff(3), _3) : _3(a);
  }

  function _3() {
    return M.pure();
  }
}

function a5() {
  var a;
  a = 1;
  return a ? _1(a) : M.j(eff(2), _1);

  function _1() {
    return M.pure();
  }
}

function a6() {
  return M.jB(eff(2), _1);

  function _1(a) {
    a ? a : 1;
    return M.pure();
  }
}

function a7() {
  var a;
  a = 1 + 1;
  return a ? _1(a) : M.j(eff(2), _1);

  function _1() {
    return M.pure();
  }
}

function a8() {
  return M.jB(eff(2), _1);

  function _1(a) {
    a ? a : 1 + 1;
    return M.pure();
  }
}

function a9() {
  var a;
  a = 1;
  return a ? M.j(eff(2), _1) : _1(a);

  function _1() {
    return M.pure();
  }
}

function a10() {
  return M.jB(eff(2), _1);

  function _1(a) {
    a ? 1 : a;
    return M.pure();
  }
}

function a11() {
  var a;
  a = 1 + 1;
  return a ? M.j(eff(2), _1) : _1(a);

  function _1() {
    return M.pure();
  }
}

function a12() {
  return M.jB(eff(2), _1);

  function _1(a) {
    a ? 1 + 1 : a;
    return M.pure();
  }
}

function a13() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? M.j(eff(2), _2) : M.j(eff(3), _2);
  }

  function _2() {
    return M.pure();
  }
}

function a14() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? _2(2) : M.j(eff(3), _2);
  }

  function _2() {
    return M.pure();
  }
}

function a15() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? M.j(eff(2), _2) : _2(3);
  }

  function _2() {
    return M.pure();
  }
}

function a16() {
  return 1 ? M.j(eff(2), _1) : M.j(eff(3), _1);

  function _1() {
    return M.pure();
  }
}

function a17() {
  return M.jB(eff(1), _1);

  function _1(a) {
    console.log(a ? 2 : 3);
    return M.pure();
  }
}

function a18() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return M.jB(eff(2), _2, a);
  }

  function _2(b, a) {
    a + b ? 2 : 3;
    return M.pure();
  }
}

function a19() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? _3(a) : M.j(eff(2), _2);
  }

  function _2() {
    return M.jB(eff(3), _3);
  }

  function _3(a) {
    return M.j(eff(a), _4);
  }

  function _4() {
    return M.pure();
  }
}

function b() {
  return M.jB(eff(1), _1);

  function _1(a) {
    return a ? _2(a) : M.j(eff(2), _2);
  }

  function _2() {
    return M.jB(eff(1), _3);
  }

  function _3(a) {
    return a ? M.j(eff(2), _4) : _4(a);
  }

  function _4() {
    var a;
    a = 1;
    return a ? _5(a) : M.j(eff(2), _5);
  }

  function _5() {
    return M.jB(eff(2), _6);
  }

  function _6(a) {
    var b;
    a ? a : 1;
    b = 1 + 1;
    return b ? _7(b) : M.j(eff(2), _7);
  }

  function _7() {
    return M.jB(eff(2), _8);
  }

  function _8(a) {
    var b;
    a ? a : 1 + 1;
    b = 1;
    return b ? M.j(eff(2), _9) : _9(b);
  }

  function _9() {
    return M.jB(eff(2), _10);
  }

  function _10(a) {
    var b;
    a ? 1 : a;
    b = 1 + 1;
    return b ? M.j(eff(2), _11) : _11(b);
  }

  function _11() {
    return M.jB(eff(2), _12);
  }

  function _12(a) {
    a ? 1 + 1 : a;
    return M.jB(eff(1), _13);
  }

  function _13(a) {
    return a ? M.j(eff(2), _14) : M.j(eff(3), _14);
  }

  function _14() {
    return M.jB(eff(1), _15);
  }

  function _15(a) {
    return a ? _16(2) : M.j(eff(3), _16);
  }

  function _16() {
    return M.jB(eff(1), _17);
  }

  function _17(a) {
    return a ? M.j(eff(2), _18) : _18(3);
  }

  function _18() {
    return 1 ? M.j(eff(2), _19) : M.j(eff(3), _19);
  }

  function _19() {
    return M.jB(eff(1), _20);
  }

  function _20(a) {
    a ? 2 : 3;
    return M.pure();
  }
}