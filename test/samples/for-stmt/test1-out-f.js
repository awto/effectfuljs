(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1();

  function _1() {
    if (j < len) {
      i = ref[j];
      return M.jMB(eff(i), _2);
    } else return M.pure();
  }

  function _2(a) {
    if (a) return _3();else return _3();
  }

  function _3() {
    j++;
    return M.jR(_1);
  }
});

(function () {
  var i;
  return M.jM(eff('bi'), _1);

  function _1() {
    i = 0;
    return _2();
  }

  function _2() {
    if (i < 3) return _3();else {
      return eff('ai');
    }
  }

  function _3() {
    return M.jM(eff('bi:', i), _4);
  }

  function _4() {
    i++;
    return M.jR(_2);
  }
});

(function () {
  var i;
  return M.jM(eff('bi'), _1);

  function _1() {
    i = 0;
    return _2();
  }

  function _2() {
    if (i < 3) return _3();else {
      return eff('ai');
    }
  }

  function _3() {
    return M.jM(eff('bi:', i), _4);
  }

  function _4() {
    i++;
    return M.jR(_2);
  }
});

(function () {
  var i, j;
  return M.jM(eff('bi'), _1);

  function _1() {
    i = 0;
    return _2();
  }

  function _2() {
    if (i < 3) {
      return M.jM(eff('bj:' + i), _3);
    } else return _8();
  }

  function _3() {
    j = 0;
    return _4();
  }

  function _4() {
    if (j < 40) return _5();else {
      return M.jM(eff('aj:' + i), _7);
    }
  }

  function _5() {
    if (j === 10) return _7();else {
      if (j === 30) return _8();else {
        return M.jM(eff(i + j), _6);
      }
    }
  }

  function _6() {
    j += 10;
    return M.jR(_4);
  }

  function _7() {
    i++;
    return M.jR(_2);
  }

  function _8() {
    return eff('ai');
  }
});

function a() {
  var i;
  return M.jM(eff('b'), _1);

  function _1() {
    i = 0;
    return _2();
  }

  function _2() {
    if (i < 3) return _3();else {
      return eff('a');
    }
  }

  function _3() {
    if (i === 2) {
      console.log(i);
    }

    return M.jM(eff(i), _4);
  }

  function _4() {
    i++;
    return M.jR(_2);
  }
}

;

function a1() {
  var i, j;
  return M.jM(eff('b'), _1);

  function _1() {
    i = 0;
    j = 10;
    return _2();
  }

  function _2() {
    if (i < 3) return _3();else {
      return effRes(i, j);
    }
  }

  function _3() {
    if (i === 2) {
      console.log(i, j);
    }

    return M.jM(eff(i, j), _4);
  }

  function _4() {
    i++, j += 2;
    return M.jR(_2);
  }
}

function b() {
  return M.jM(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    return M.jRM(eff(i), _1);
  }

  function _2() {
    return eff('a');
  }
}

function c() {
  return M.jM(eff('b'), _1);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    if (i === 3) return _2();else {
      return M.jRM(eff(i), _1);
    }
  }

  function _2() {
    return M.pure(10);
  }

  function _3() {
    return eff('a');
  }
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return _1();

  function _1() {
    if (i < 10) return _2();else {
      return eff(result);
    }
  }

  function _2() {
    return M.jMB(eff(result, i), _3);
  }

  function _3(a) {
    result = a;
    i++;
    return M.jR(_1);
  }
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return _1();

  function _1() {
    if (i < 10) return _2();else {
      return eff();
    }
  }

  function _2() {
    return M.jMB(eff(i), _3);
  }

  function _3(a) {
    result = a;
    i++;
    return M.jR(_1);
  }
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return _1();

  function _1() {
    if (i < 10) return _2();else {
      return eff(result);
    }
  }

  function _2() {
    return M.jMB(eff(i), _3);
  }

  function _3(a) {
    result = a;
    i++;
    return M.jR(_1);
  }
}

function c1() {
  var result, i;
  result = [];

  for (i = 0; i < 10;) {
    result[i] = function cc() {
      var a, b;
      b = i++;
      a = result += b;
      return eff(a);
    };
  }

  return eff(result);
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return _1();

  function _1() {
    if (i < 10) return _2();else {
      return eff(result);
    }
  }

  function _2() {
    return M.jMB(eff(function cc() {
      var a, b;
      b = i++;
      a = result += b;
      return eff(a);
    }), _3);
  }

  function _3(a) {
    result[i] = a;
    return M.jR(_1);
  }
}

function _c2() {
  var result, i;
  result = [];
  i = 0;
  return _1();

  function _1() {
    if (i < 10) return _2();else {
      return eff(result);
    }
  }

  function _2() {
    var a;
    a = i++;
    return M.jMB(function cc(j) {
      var a, b;
      b = i += j;
      a = result += b;
      return eff(a);
    }(a), _3);
  }

  function _3(a) {
    return M.jMB(eff(a), _4);
  }

  function _4(a) {
    result[i] = a;
    return M.jR(_1);
  }
}