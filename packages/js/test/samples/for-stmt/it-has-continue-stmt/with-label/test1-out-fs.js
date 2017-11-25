(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7, i, ref);
    } else {
      return M.pure();
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7, i, j, len, ref);
    } else {
      return M.jumpH(_6, _7, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jumpRH(_5, _7, i, j, len, ref);
    } else {
      if (t1) {
        return M.jumpH(_6, _7, i, ref);
      } else {
        return M.jumpRH(_5, _7, i, j, len, ref);
      }
    }
  }

  function _5(i, j, len, ref) {
    j++;
    return M.jumpRH(_3, _7, i, j, len, ref);
  }

  function _6(i, ref) {
    i++;
    return M.jumpRH(_1, _7, i, ref);
  }

  function _7(e) {
    return M.raise(e);
  }
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _8, i, ref);

  function _1(i, ref) {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _8, i, ref);
    } else {
      return M.pure();
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jumpRH(_3, _8, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _8, i, j, len, ref);
    } else {
      return M.jumpH(_7, _8, i, ref);
    }
  }

  function _4(a, i, j, len, ref) {
    if (a) {
      return M.jumpRH(_6, _8, i, j, len, ref);
    } else {
      return M.chainBH(eff(2), _5, _8, i, j, len, ref);
    }
  }

  function _5(a, i, j, len, ref) {
    if (a) {
      return M.jumpH(_7, _8, i, ref);
    } else {
      return M.jumpRH(_6, _8, i, j, len, ref);
    }
  }

  function _6(i, j, len, ref) {
    j++;
    return M.jumpRH(_3, _8, i, j, len, ref);
  }

  function _7(i, ref) {
    i++;
    return M.jumpRH(_1, _8, i, ref);
  }

  function _8(e) {
    return M.raise(e);
  }
});

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jumpH(_1, _7, i, void 0, ref);

  function _1(i, j, ref) {
    if (i < 3) {
      return M.chainBH(eff(i), _2, _7, i, ref);
    } else {
      return M.chainBH(eff(j), _6, _7);
    }
  }

  function _2(i, ref) {
    var j, len;
    j = 0, len = ref.length;
    return M.jumpRH(_3, _7, i, j, len, ref);
  }

  function _3(i, j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _4, _7, i, j, len, ref);
    } else {
      return M.jumpH(_5, _7, i, j, ref);
    }
  }

  function _4(i, j, len, ref) {
    j++;

    if (t2) {
      return M.jumpH(_5, _7, i, j, ref);
    } else {
      j++;
      return M.jumpRH(_3, _7, i, j, len, ref);
    }
  }

  function _5(i, j, ref) {
    i++;
    return M.jumpRH(_1, _7, i, j, ref);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
});

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jumpH(_1, _4, j, len, ref);

  function _1(j, len, ref) {
    if (j < len) {
      d = ref[j];
      return M.chainBH(eff(d), _2, _4, j, len, ref);
    } else {
      return M.pure();
    }
  }

  function _2(j, len, ref) {
    var i;
    i++;

    if (t2) {
      return M.jumpRH(_3, _4, j, len, ref);
    } else {
      return M.jumpRH(_3, _4, j, len, ref);
    }
  }

  function _3(j, len, ref) {
    j++;
    return M.jumpRH(_1, _4, j, len, ref);
  }

  function _4(e) {
    return M.raise(e);
  }
});

(function () {
  var j, len;
  j = 0;
  return M.jumpH(_1, _5, j);

  function _1(j) {
    if (true) {
      return M.chainBH(eff(j), _2, _5, j);
    } else {
      return M.jumpH(_3, _5, j);
    }
  }

  function _2(j) {
    j++;

    if (t2) {
      return M.jumpH(_3, _5, j);
    } else {
      j--;
      return M.jumpRH(_1, _5, j);
    }
  }

  function _3(j) {
    return M.chainBH(eff(j), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});