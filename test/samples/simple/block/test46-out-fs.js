function a() {
  var i, a;
  a = i = 0;
  return M.jB(eff2(a), _1, i);

  function _1(a, i) {
    var b;
    b = i++;
    return M.j(eff1(a, b), _2, i);
  }

  function _2(i) {
    var a;
    a = i++;
    return M.j(eff3(a), _3, i);
  }

  function _3(i) {
    var a;
    a = i++;
    return M.j(eff4(a), _4, i);
  }

  function _4(i) {
    var a;
    a = i++;
    return M.j(eff5(a), _5, i);
  }

  function _5(i) {
    var a;
    a = i++;
    return M.jB(eff6(a), _6, i);
  }

  function _6(a, i) {
    if (a) return _7(i);else {
      return M.jB(eff7(i), _8, i);
    }
  }

  function _7(i) {
    var a;
    a = i++;
    return M.j(eff7(a), _12, i);
  }

  function _8(a, i) {
    if (a) return _9(i);else {
      return M.pure(10);
    }
  }

  function _9(i) {
    i++;
    return _11(i);
  }

  function _10() {
    var i, a;
    a = i++;
    return M.j(eff7(a), _11, i);
  }

  function _11(i) {
    var a;
    a = i++;
    return M.j(eff8(a), _12, i);
  }

  function _12(i) {
    var a;
    a = i++;
    return M.j(eff9(a), _13, i);
  }

  function _13(i) {
    var a;
    a = i++;
    return M.j(eff10(a), _14);
  }

  function _14() {
    return M.pure();
  }
}