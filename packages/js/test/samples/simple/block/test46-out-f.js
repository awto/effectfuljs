function a() {
  var i, a, r;
  a = i = 0;
  return M.chain(eff2(a), _1, _11);

  function _1(a) {
    var b;
    b = i++;
    return M.chain(eff1(a, b), _2, _11);
  }

  function _2() {
    var a;
    a = i++;
    return M.chain(eff3(a), _3, _11);
  }

  function _3() {
    var a;
    a = i++;
    return M.chain(eff4(a), _4, _11);
  }

  function _4() {
    var a;
    a = i++;
    return M.chain(eff5(a), _5, _11);
  }

  function _5() {
    var a;
    a = i++;
    return M.chain(eff6(a), _6, _11);
  }

  function _6(a) {
    var b;

    if (a) {
      b = i++;
      return M.chain(eff7(b), _8, _11);
    } else {
      return M.chain(eff7(i), _7, _11);
    }
  }

  function _7(a) {
    var b;

    if (a) {
      i++;
      b = i++;
      return M.chain(eff8(b), _8, _11);
    } else {
      return M.pure(10);
    }
  }

  function _8() {
    var a;
    a = i++;
    return M.chain(eff9(a), _9, _11);
  }

  function _9() {
    var a;
    a = i++;
    return M.chain(eff10(a), _10, _11);
  }

  function _10() {
    return M.pure(r);
  }

  function _11(e) {
    return M.raise(e);
  }
}