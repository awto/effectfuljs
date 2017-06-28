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
  console.log('bi');

  for (var i = 0; i < 3; i++) {
    console.log('bi:', i);
  }

  console.log('ai');
});

(function () {
  console.log('bi');

  lab: for (var i = 0; i < 3; i++) {
    console.log('bj:' + i);

    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      console.log(i + j);
    }

    console.log('aj:' + i);
  }

  console.log('ai');
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

    return M.jMR(eff(i), _1);
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
      return M.jMR(eff(i), _1);
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

  function _3(result) {
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

  function _3(result) {
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

  function _3(result) {
    i++;
    return M.jR(_1);
  }
}