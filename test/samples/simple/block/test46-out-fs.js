function a() {
  var i;
  const a = i = 0;
  return M.jMB1(eff2(a), _1, i);

  function _1(a, i) {
    return M.jM1(eff1(a, i++), _2, i);
  }

  function _2(i) {
    return M.jM1(eff3(i++), _3, i);
  }

  function _3(i) {
    return M.jM1(eff4(i++), _4, i);
  }

  function _4(i) {
    return M.jM1(eff5(i++), _5, i);
  }

  function _5(i) {
    var a;
    const a = i++;
    return M.jMB1(eff6(a), _6, i);
  }

  function _6(a, i) {
    if (a) return _7(i);else {
      return M.jMB1(eff7(i), _8, i);
    }
  }

  function _7(i) {
    return M.jM1(eff7(i++), _12, i);
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
    var i;
    return M.jM1(eff7(i++), _11, i);
  }

  function _11(i) {
    return M.jM1(eff8(i++), _12, i);
  }

  function _12(i) {
    return M.jM1(eff9(i++), _13, i);
  }

  function _13(i) {
    return eff10(i++);
  }
}