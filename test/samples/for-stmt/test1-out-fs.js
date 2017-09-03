(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);

  function _1(j, len, ref) {
    var i;

    if (j < len) {
      i = ref[j];
      return M.jB(eff(i), _2, j, len, ref);
    } else {
      return M.pure();
    }
  }

  function _2(a, j, len, ref) {
    if (a) return _3(j, len, ref);else return _3(j, len, ref);
  }

  function _3(j, len, ref) {
    j++;
    return M.jR(_1, j, len, ref);
  }
});

(function () {
  return M.j(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return _2(i);
  }

  function _2(i) {
    if (i < 3) return _3(i);else {
      return M.j(eff('ai'), _5);
    }
  }

  function _3(i) {
    return M.j(eff('bi:', i), _4, i);
  }

  function _4(i) {
    i++;
    return M.jR(_2, i);
  }

  function _5() {
    return M.pure();
  }
});

(function () {
  return M.j(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return _2(i);
  }

  function _2(i) {
    if (i < 3) return _3(i);else {
      return M.j(eff('ai'), _5);
    }
  }

  function _3(i) {
    return M.j(eff('bi:', i), _4, i);
  }

  function _4(i) {
    i++;
    return M.jR(_2, i);
  }

  function _5() {
    return M.pure();
  }
});

(function () {
  return M.j(eff('bi'), _1);

  function _1() {
    var i;
    i = 0;
    return _2(i);
  }

  function _2(i) {
    if (i < 3) {
      return M.j(eff('bj:' + i), _3, i);
    } else return _8();
  }

  function _3(i) {
    var j;
    j = 0;
    return _4(i, j);
  }

  function _4(i, j) {
    if (j < 40) return _5(i, j);else {
      return M.j(eff('aj:' + i), _7, i);
    }
  }

  function _5(i, j) {
    if (j === 10) return _7(i);else {
      if (j === 30) return _8();else {
        return M.j(eff(i + j), _6, i, j);
      }
    }
  }

  function _6(i, j) {
    j += 10;
    return M.jR(_4, i, j);
  }

  function _7(i) {
    i++;
    return M.jR(_2, i);
  }

  function _8() {
    return M.j(eff('ai'), _9);
  }

  function _9() {
    return M.pure();
  }
});

function a() {
  return M.j(eff('b'), _1);

  function _1() {
    var i;
    i = 0;
    return _2(i);
  }

  function _2(i) {
    if (i < 3) return _3(i);else {
      return M.j(eff('a'), _5);
    }
  }

  function _3(i) {
    if (i === 2) {
      console.log(i);
    }

    return M.j(eff(i), _4, i);
  }

  function _4(i) {
    i++;
    return M.jR(_2, i);
  }

  function _5() {
    return M.pure();
  }
}

;

function a1() {
  return M.j(eff('b'), _1);

  function _1() {
    var i, j;
    i = 0;
    j = 10;
    return _2(i, j);
  }

  function _2(i, j) {
    if (i < 3) return _3(i, j);else {
      return M.j(effRes(i, j), _5);
    }
  }

  function _3(i, j) {
    if (i === 2) {
      console.log(i, j);
    }

    return M.j(eff(i, j), _4, i, j);
  }

  function _4(i, j) {
    i++, j += 2;
    return M.jR(_2, i, j);
  }

  function _5() {
    return M.pure();
  }
}

function b() {
  return M.j(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    return M.jR(eff(i), _1);
  }

  function _2() {
    return M.j(eff('a'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function c() {
  return M.j(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    if (i === 3) return _2();else {
      return M.jR(eff(i), _1);
    }
  }

  function _2() {
    return M.pure(10);
  }

  function _3() {
    return M.j(eff('a'), _4);
  }

  function _4() {
    return M.pure();
  }
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return _1(result, i);

  function _1(result, i) {
    if (i < 10) return _2(result, i);else {
      return M.j(eff(result), _4);
    }
  }

  function _2(result, i) {
    return M.jB(eff(result, i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR(_1, result, i);
  }

  function _4() {
    return M.pure();
  }
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return _1(i);

  function _1(i) {
    if (i < 10) return _2(i);else {
      return M.j(eff(), _4);
    }
  }

  function _2(i) {
    return M.jB(eff(i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR(_1, i);
  }

  function _4() {
    return M.pure();
  }
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return _1(result, i);

  function _1(result, i) {
    if (i < 10) return _2(i);else {
      return M.j(eff(result), _4);
    }
  }

  function _2(i) {
    return M.jB(eff(i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR(_1, result, i);
  }

  function _4() {
    return M.pure();
  }
}

function c1() {
  var result,
      i,
      a = i => {
    result[i] = function cc() {
      var a, b;
      b = i++;
      a = result += b;
      return M.j(eff(a), _1);

      function _1() {
        return M.pure();
      }
    };

    return;
  };

  result = [];

  for (i = 0; i < 10;) {
    a(i);
  }

  return M.j(eff(result), _1);

  function _1() {
    return M.pure();
  }
}

function c2() {
  var result,
      i,
      a = i => {
    var cc = function cc() {
      var a, b;
      b = i++;
      a = result += b;
      return M.j(eff(a), _1);

      function _1() {
        return M.pure();
      }
    };

    return M.jB(eff(cc), _1);

    function _1(a) {
      result[i] = a;
      return M.pure();
    }
  };

  result = [];
  i = 0;
  return _1(i, a);

  function _1(i, a) {
    if (i < 10) return _2(i, a);else {
      return M.j(eff(result), _3);
    }
  }

  function _2(i, a) {
    return M.jR(a(i), _1, i, a);
  }

  function _3() {
    return M.pure();
  }
}

function _c2() {
  var result,
      i,
      a = i => {
    var cc = function cc(j) {
      var a, b;
      b = i += j;
      a = result += b;
      return M.j(eff(a), _1);

      function _1() {
        return M.pure();
      }
    },
        a;

    a = i++;
    return M.jB(cc(a), _1);

    function _1(a) {
      return M.jB(eff(a), _2);
    }

    function _2(a) {
      result[i] = a;
      return M.pure();
    }
  };

  result = [];
  i = 0;
  return _1(i, a);

  function _1(i, a) {
    if (i < 10) return _2(i, a);else {
      return M.j(eff(result), _3);
    }
  }

  function _2(i, a) {
    return M.jR(a(i), _1, i, a);
  }

  function _3() {
    return M.pure();
  }
}