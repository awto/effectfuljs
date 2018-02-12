import * as M from '@effectful/core';

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1, j, len, ref);

  function _1(j, len, ref) {
    var i;

    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, j, len, ref);
    }
  }

  function _2(a, j, len, ref) {
    if (a) {
      return M.jump(void 0, _3, j, len, ref);
    } else {
      return M.jump(void 0, _3, j, len, ref);
    }
  }

  function _3(j, len, ref) {
    j++;
    return M.jump(void 0, _1, j, len, ref);
  }
});

(function () {
  return M.chain(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return M.jump(void 0, _2, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chain(eff('bi:', i), _3, i);
    } else {
      return M.chain(eff('ai'), _4);
    }
  }

  function _3(i) {
    i++;
    return M.jump(void 0, _2, i);
  }

  function _4() {}
});

(function () {
  return M.chain(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return M.jump(void 0, _2, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chain(eff('bi:', i), _3, i);
    } else {
      return M.chain(eff('ai'), _4);
    }
  }

  function _3(i) {
    i++;
    return M.jump(void 0, _2, i);
  }

  function _4() {}
});

(function () {
  return M.chain(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return M.jump(void 0, _2, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chain(eff('bj:' + i), _3, i);
    } else {
      return M.jump(void 0, _7);
    }
  }

  function _3(i) {
    var j;
    j = 0;
    return M.jump(void 0, _4, i, j);
  }

  function _4(i, j) {
    if (j < 40) {
      if (j === 10) {
        return M.jump(void 0, _6, i);
      } else {
        if (j === 30) {
          return M.jump(void 0, _7);
        } else {
          return M.chain(eff(i + j), _5, i, j);
        }
      }
    } else {
      return M.chain(eff('aj:' + i), _6, i);
    }
  }

  function _5(i, j) {
    j += 10;
    return M.jump(void 0, _4, i, j);
  }

  function _6(a, i) {
    i++;
    return M.jump(void 0, _2, i);
  }

  function _7() {
    return M.chain(eff('ai'), _8);
  }

  function _8() {}
});

function a() {
  return M.chain(eff('b'), _1);

  function _1() {
    var i;
    i = 0;
    return M.jump(void 0, _2, i);
  }

  function _2(i) {
    if (i < 3) {
      if (i === 2) {
        console.log(i);
      }

      return M.chain(eff(i), _3, i);
    } else {
      return M.chain(eff('a'), _4);
    }
  }

  function _3(i) {
    i++;
    return M.jump(void 0, _2, i);
  }

  function _4() {}
}

;

function a1() {
  return M.chain(eff('b'), _1);

  function _1() {
    var i, j;
    i = 0;
    j = 10;
    return M.jump(void 0, _2, i, j);
  }

  function _2(i, j) {
    if (i < 3) {
      if (i === 2) {
        console.log(i, j);
      }

      return M.chain(eff(i, j), _3, i, j);
    } else {
      return M.chain(effRes(i, j), _4);
    }
  }

  function _3(i, j) {
    i++, j += 2;
    return M.jump(void 0, _2, i, j);
  }

  function _4() {}
}

function b() {
  return M.chain(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    return M.chain(eff(i), _1);
  }
}

function c() {
  return M.chain(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    if (i === 3) {
      return 10;
    } else {
      return M.chain(eff(i), _1);
    }
  }
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, result, i);

  function _1(result, i) {
    if (i < 10) {
      return M.chain(eff(result, i), _2, i);
    } else {
      return M.chain(eff(result), _3);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jump(void 0, _1, result, i);
  }

  function _3() {}
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, i);

  function _1(i) {
    if (i < 10) {
      return M.chain(eff(i), _2, i);
    } else {
      return M.chain(eff(), _3);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jump(void 0, _1, i);
  }

  function _3() {}
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, result, i);

  function _1(result, i) {
    if (i < 10) {
      return M.chain(eff(i), _2, i);
    } else {
      return M.chain(eff(result), _3);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jump(void 0, _1, result, i);
  }

  function _3() {}
}

function c1() {
  var result, i, a;
  result = [];

  for (i = 0; i < 10;) {
    (i => {
      result[i] = function cc() {
        var a;
        a = result += i++;
        return M.chain(eff(a), _1);

        function _1() {}
      };
    })(i);
  }

  a = result;
  return M.chain(eff(a), _1);

  function _1() {}
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jump(void 0, _1, i);

  function _1(b, i) {
    var a;

    if (i < 10) {
      return M.chain((i => {
        return M.chain(eff(function cc() {
          var a;
          a = result += i++;
          return M.chain(eff(a), _1);

          function _1() {}
        }), _1);

        function _1(a) {
          result[i] = a;
        }
      })(i), _1, i);
    } else {
      a = result;
      return M.chain(eff(a), _2);
    }
  }

  function _2() {}
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jump(void 0, _1, i);

  function _1(b, i) {
    var a;

    if (i < 10) {
      return M.chain((i => {
        var a;
        a = i++;
        return M.chain(function cc(j) {
          var a;
          a = result += i += j;
          return M.chain(eff(a), _1);

          function _1() {}
        }(a), _1);

        function _1(a) {
          return M.chain(eff(a), _2);
        }

        function _2(a) {
          result[i] = a;
        }
      })(i), _1, i);
    } else {
      a = result;
      return M.chain(eff(a), _2);
    }
  }

  function _2() {}
}