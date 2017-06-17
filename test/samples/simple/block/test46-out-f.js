function a() {
  var i;
  const a = i = 0;
  return M.jMB(eff2(a), _1);

  function _1(a) {
    return M.jM(eff1(a, i++), _2);
  }

  function _2() {
    return M.jM(eff3(i++), _3);
  }

  function _3() {
    return M.jM(eff4(i++), _4);
  }

  function _4() {
    return M.jM(eff5(i++), _5);
  }

  function _5() {
    var a;
    const a = i++;
    return M.jMB(eff6(a), _6);
  }

  function _6(a) {
    if (a) return _7();else {
      return M.jMB(eff7(i), _8);
    }
  }

  function _7() {
    return M.jM(eff7(i++), _12);
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
    return M.jM(eff7(i++), _11);
  }

  function _11() {
    return M.jM(eff8(i++), _12);
  }

  function _12() {
    return M.jM(eff9(i++), _13);
  }

  function _13() {
    return eff10(i++);
  }
}