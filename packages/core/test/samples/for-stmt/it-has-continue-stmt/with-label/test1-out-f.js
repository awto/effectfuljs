import * as M from '@effectful/core';

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1, _7);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2, _7);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3, _7);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _7);
    } else {
      return M.jump(void 0, _6, _7);
    }
  }

  function _4(a) {
    if (a) {
      return M.jump(void 0, _5, _7);
    } else {
      if (t1) {
        return M.jump(void 0, _6, _7);
      } else {
        return M.jump(void 0, _5, _7);
      }
    }
  }

  function _5() {
    j++;
    return M.jump(void 0, _3, _7);
  }

  function _6() {
    i++;
    return M.jump(void 0, _1, _7);
  }

  function _7(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1, _8);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2, _8);
    } else {
      return M.pure();
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3, _8);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _8);
    } else {
      return M.jump(void 0, _7, _8);
    }
  }

  function _4(a) {
    if (a) {
      return M.jump(void 0, _6, _8);
    } else {
      return M.chain(eff(2), _5, _8);
    }
  }

  function _5(a) {
    if (a) {
      return M.jump(void 0, _7, _8);
    } else {
      return M.jump(void 0, _6, _8);
    }
  }

  function _6() {
    j++;
    return M.jump(void 0, _3, _8);
  }

  function _7() {
    i++;
    return M.jump(void 0, _1, _8);
  }

  function _8(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1, _7);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2, _7);
    } else {
      return M.chain(eff(j), _6, _7);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3, _7);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4, _7);
    } else {
      return M.jump(void 0, _5, _7);
    }
  }

  function _4() {
    j++;

    if (t2) {
      return M.jump(void 0, _5, _7);
    } else {
      j++;
      return M.jump(void 0, _3, _7);
    }
  }

  function _5() {
    i++;
    return M.jump(void 0, _1, _7);
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
  return M.jump(void 0, _1, _4);

  function _1() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _2, _4);
    } else {
      return M.pure();
    }
  }

  function _2() {
    i++;

    if (t2) {
      return M.jump(void 0, _3, _4);
    } else {
      return M.jump(void 0, _3, _4);
    }
  }

  function _3() {
    j++;
    return M.jump(void 0, _1, _4);
  }

  function _4(e) {
    return M.raise(e);
  }
});

(function () {
  var j, len;
  j = 0;
  return M.jump(void 0, _1, _5);

  function _1() {
    if (true) {
      return M.chain(eff(j), _2, _5);
    } else {
      return M.jump(void 0, _3, _5);
    }
  }

  function _2() {
    j++;

    if (t2) {
      return M.jump(void 0, _3, _5);
    } else {
      j--;
      return M.jump(void 0, _1, _5);
    }
  }

  function _3() {
    return M.chain(eff(j), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});