(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7);

  function _1() {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7);
    } else {
      return M.jumpH(_6, _7);
    }
  }

  function _4(a) {
    if (a) {
      return M.jumpRH(_5, _7);
    } else {
      if (t1) {
        return M.jumpH(_6, _7);
      } else {
        return M.jumpRH(_5, _7);
      }
    }
  }

  function _5() {
    j++;
    return M.jumpRH(_3, _7);
  }

  function _6() {
    i++;
    return M.jumpRH(_1, _7);
  }

  function _7(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _8);

  function _1() {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _8);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jumpRH(_3, _8);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _8);
    } else {
      return M.jumpH(_7, _8);
    }
  }

  function _4(a) {
    if (a) {
      return M.jumpRH(_6, _8);
    } else {
      return M.chainBH(eff(2), _5, _8);
    }
  }

  function _5(a) {
    if (a) {
      return M.jumpH(_7, _8);
    } else {
      return M.jumpRH(_6, _8);
    }
  }

  function _6() {
    j++;
    return M.jumpRH(_3, _8);
  }

  function _7() {
    i++;
    return M.jumpRH(_1, _8);
  }

  function _8(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7);

  function _1() {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7);
    } else {
      return M.chainBH(eff(j), _6, _7);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7);
    } else {
      return M.jumpH(_5, _7);
    }
  }

  function _4() {
    j++;

    if (t2) {
      return M.jumpH(_5, _7);
    } else {
      j++;
      return M.jumpRH(_3, _7);
    }
  }

  function _5() {
    i++;
    return M.jumpRH(_1, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jumpH(_1, _4);

  function _1() {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _2, _4);
    } else {
      return M.pure();
    }
  }

  function _2() {
    i++;

    if (t2) {
      return M.jumpRH(_3, _4);
    } else {
      return M.jumpRH(_3, _4);
    }
  }

  function _3() {
    j++;
    return M.jumpRH(_1, _4);
  }

  function _4(e) {
    return M.raise(e);
  }
});

(function () {
  var j, len;
  j = 0;
  return M.jumpH(_1, _5);

  function _1() {
    if (true) {
      return M.chainBH(eff(j), _2, _5);
    } else {
      return M.jumpH(_3, _5);
    }
  }

  function _2() {
    j++;

    if (t2) {
      return M.jumpH(_3, _5);
    } else {
      j--;
      return M.jumpRH(_1, _5);
    }
  }

  function _3() {
    return M.chainBH(eff(j), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});