import * as M from '@effectful/core';

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(void 0, _1, _4);

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.chain(eff(i), _2, _4);
    } else {
      return M.pure();
    }
  }

  function _2(a) {
    if (a) {
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
  var i;
  return M.chain(eff('bi'), _1, _5);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _5);
  }

  function _2() {
    if (i < 3) {
      return M.chain(eff('bi:', i), _3, _5);
    } else {
      return M.chain(eff('ai'), _4, _5);
    }
  }

  function _3() {
    i++;
    return M.jump(void 0, _2, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});

(function () {
  var i;
  return M.chain(eff('bi'), _1, _5);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _5);
  }

  function _2() {
    if (i < 3) {
      return M.chain(eff('bi:', i), _3, _5);
    } else {
      return M.chain(eff('ai'), _4, _5);
    }
  }

  function _3() {
    i++;
    return M.jump(void 0, _2, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});

(function () {
  var i, j;
  return M.chain(eff('bi'), _1, _9);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _9);
  }

  function _2() {
    if (i < 3) {
      return M.chain(eff('bj:' + i), _3, _9);
    } else {
      return M.jump(void 0, _7, _9);
    }
  }

  function _3() {
    j = 0;
    return M.jump(void 0, _4, _9);
  }

  function _4() {
    if (j < 40) {
      if (j === 10) {
        return M.jump(void 0, _6, _9);
      } else {
        if (j === 30) {
          return M.jump(void 0, _7, _9);
        } else {
          return M.chain(eff(i + j), _5, _9);
        }
      }
    } else {
      return M.chain(eff('aj:' + i), _6, _9);
    }
  }

  function _5() {
    j += 10;
    return M.jump(void 0, _4, _9);
  }

  function _6() {
    i++;
    return M.jump(void 0, _2, _9);
  }

  function _7() {
    return M.chain(eff('ai'), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
});

function a() {
  var i;
  return M.chain(eff('b'), _1, _5);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _5);
  }

  function _2() {
    if (i < 3) {
      if (i === 2) {
        console.log(i);
      }

      return M.chain(eff(i), _3, _5);
    } else {
      return M.chain(eff('a'), _4, _5);
    }
  }

  function _3() {
    i++;
    return M.jump(void 0, _2, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

;

function a1() {
  var i, j;
  return M.chain(eff('b'), _1, _5);

  function _1() {
    i = 0;
    j = 10;
    return M.jump(void 0, _2, _5);
  }

  function _2() {
    if (i < 3) {
      if (i === 2) {
        console.log(i, j);
      }

      return M.chain(eff(i, j), _3, _5);
    } else {
      return M.chain(effRes(i, j), _4, _5);
    }
  }

  function _3() {
    i++, j += 2;
    return M.jump(void 0, _2, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b() {
  return M.chain(eff('b'), _1, _2);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    return M.chain(eff(i), _1, _2);
  }

  function _2(e) {
    return M.raise(e);
  }
}

function c() {
  var r;
  return M.chain(eff('b'), _1, _2);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    if (i === 3) {
      return M.pure(10);
    } else {
      return M.chain(eff(i), _1, _2);
    }
  }

  function _2(e) {
    return M.raise(e);
  }
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, _4);

  function _1() {
    if (i < 10) {
      return M.chain(eff(result, i), _2, _4);
    } else {
      return M.chain(eff(result), _3, _4);
    }
  }

  function _2(a) {
    result = a;
    i++;
    return M.jump(void 0, _1, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, _4);

  function _1() {
    if (i < 10) {
      return M.chain(eff(i), _2, _4);
    } else {
      return M.chain(eff(), _3, _4);
    }
  }

  function _2(a) {
    result = a;
    i++;
    return M.jump(void 0, _1, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.jump(void 0, _1, _4);

  function _1() {
    if (i < 10) {
      return M.chain(eff(i), _2, _4);
    } else {
      return M.chain(eff(result), _3, _4);
    }
  }

  function _2(a) {
    result = a;
    i++;
    return M.jump(void 0, _1, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function c1() {
  var result, i, a;
  result = [];

  for (i = 0; i < 10;) {
    (i => {
      result[i] = function cc() {
        var a;
        a = result += i++;
        return M.chain(eff(a), _1, _2);

        function _1() {
          return M.pure();
        }

        function _2(e) {
          return M.raise(e);
        }
      };
    })(i);
  }

  a = result;
  return M.chain(eff(a), _1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jump(void 0, _1, _3);

  function _1() {
    var a;

    if (i < 10) {
      return M.chain((i => {
        return M.chain(eff(function cc() {
          var a;
          a = result += i++;
          return M.chain(eff(a), _1, _2);

          function _1() {
            return M.pure();
          }

          function _2(e) {
            return M.raise(e);
          }
        }), _1, _2);

        function _1(a) {
          result[i] = a;
          return M.pure();
        }

        function _2(e) {
          return M.raise(e);
        }
      })(i), _1, _3);
    } else {
      a = result;
      return M.chain(eff(a), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jump(void 0, _1, _3);

  function _1() {
    var a;

    if (i < 10) {
      return M.chain((i => {
        var a;
        a = i++;
        return M.chain(function cc(j) {
          var a;
          a = result += i += j;
          return M.chain(eff(a), _1, _2);

          function _1() {
            return M.pure();
          }

          function _2(e) {
            return M.raise(e);
          }
        }(a), _1, _3);

        function _1(a) {
          return M.chain(eff(a), _2, _3);
        }

        function _2(a) {
          result[i] = a;
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      })(i), _1, _3);
    } else {
      a = result;
      return M.chain(eff(a), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}