function a() {
  var i, a;
  a = i = 0;
  return M.jMB(eff2(a), _1);

  function _1(a) {
    var b;
    b = i++;
    return M.jM(eff1(a, b), _2);
  }

  function _2() {
    var a;
    a = i++;
    return M.jM(eff3(a), _3);
  }

  function _3() {
    var a;
    a = i++;
    return M.jM(eff4(a), _4);
  }

  function _4() {
    var a;
    a = i++;
    return M.jM(eff5(a), _5);
  }

  function _5() {
    var a;
    a = i++;
    return M.jMB(eff6(a), _6);
  }

  function _6(a) {
    if (a) return _7();else {
      return M.jMB(eff7(i), _8);
    }
  }

  function _7() {
    var a;
    a = i++;
    return M.jM(eff7(a), _12);
  }

  function _8(a) {
    if (a) return _9();else {
      return M.pure(10);
    }
  }

  function _9() {
    i++;
    return _11();
  }

  function _10() {
    var a;
    a = i++;
    return M.jM(eff7(a), _11);
  }

  function _11() {
    var a;
    a = i++;
    return M.jM(eff8(a), _12);
  }

  function _12() {
    var a;
    a = i++;
    return M.jM(eff9(a), _13);
  }

  function _13() {
    var a;
    a = i++;
    return eff10(a);
  }
}