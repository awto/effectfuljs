import * as M from "@effectful/core";

function f1() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4);
    } else {
      return M.jump(void 0, _6);
    }
  }

  function _4(a) {
    if (a) {
      return M.jump(void 0, _5);
    } else {
      if (t1) {
        return M.jump(void 0, _6);
      } else {
        return M.jump(void 0, _5);
      }
    }
  }

  function _5() {
    j++;
    return M.jump(void 0, _3);
  }

  function _6() {
    i++;
    return M.jump(void 0, _1);
  }
}

;

function f2() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4);
    } else {
      return M.jump(void 0, _7);
    }
  }

  function _4(a) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      return M.chain(eff(2), _5);
    }
  }

  function _5(a) {
    if (a) {
      return M.jump(void 0, _7);
    } else {
      return M.jump(void 0, _6);
    }
  }

  function _6() {
    j++;
    return M.jump(void 0, _3);
  }

  function _7() {
    i++;
    return M.jump(void 0, _1);
  }
}

;

function f3() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(void 0, _1);

  function _1() {
    if (i < 3) {
      return M.chain(eff(i), _2);
    } else {
      return M.chain(eff(j), _6);
    }
  }

  function _2() {
    j = 0, len = ref.length;
    return M.jump(void 0, _3);
  }

  function _3() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _4);
    } else {
      return M.jump(void 0, _5);
    }
  }

  function _4() {
    j++;

    if (t2) {
      return M.jump(void 0, _5);
    } else {
      j++;
      return M.jump(void 0, _3);
    }
  }

  function _5() {
    i++;
    return M.jump(void 0, _1);
  }

  function _6() {}
}

;

function f4() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1);

  function _1() {
    if (j < len) {
      d = ref[j];
      return M.chain(eff(d), _2);
    }
  }

  function _2() {
    i++;

    if (t2) {
      return M.jump(void 0, _3);
    } else {
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    j++;
    return M.jump(void 0, _1);
  }
}

;

function f5() {
  var j, len;
  j = 0;
  return M.jump(void 0, _1);

  function _1() {
    if (true) {
      return M.chain(eff(j), _2);
    } else {
      return M.jump(void 0, _3);
    }
  }

  function _2() {
    j++;

    if (t2) {
      return M.jump(void 0, _3);
    } else {
      j--;
      return M.jump(void 0, _1);
    }
  }

  function _3() {
    return M.chain(eff(j), _4);
  }

  function _4() {}
}

;