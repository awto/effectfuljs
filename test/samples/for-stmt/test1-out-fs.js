(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);

  function _1(j, len, ref) {
    var i;

    if (j < len) {
      i = ref[j];
      return M.jMB3(eff(i), _2, j, len, ref);
    } else return M.pure();
  }

  function _2(a, j, len, ref) {
    if (a) return _3(j, len, ref);else return _3(j, len, ref);
  }

  function _3(j, len, ref) {
    j++;
    return M.jR3(_1, j, len, ref);
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
  return M.jM(eff('b'), _1);

  function _1() {
    var i;
    i = 0;
    return _2(i);
  }

  function _2(i) {
    if (i < 3) return _3(i);else {
      return eff('a');
    }
  }

  function _3(i) {
    if (i === 2) {
      console.log(i);
    }

    return M.jM1(eff(i), _4, i);
  }

  function _4(i) {
    i++;
    return M.jR1(_2, i);
  }
}

;

function a1() {
  return M.jM(eff('b'), _1);

  function _1() {
    var i, j;
    i = 0;
    j = 10;
    return _2(i, j);
  }

  function _2(i, j) {
    if (i < 3) return _3(i, j);else {
      return effRes(i, j);
    }
  }

  function _3(i, j) {
    if (i === 2) {
      console.log(i, j);
    }

    return M.jM2(eff(i, j), _4, i, j);
  }

  function _4(i, j) {
    i++, j += 2;
    return M.jR2(_2, i, j);
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
  return _1(result, i);

  function _1(result, i) {
    if (i < 10) return _2(result, i);else {
      return eff(result);
    }
  }

  function _2(result, i) {
    return M.jMB1(eff(result, i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR2(_1, result, i);
  }
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return _1(i);

  function _1(i) {
    if (i < 10) return _2(i);else {
      return eff();
    }
  }

  function _2(i) {
    return M.jMB1(eff(i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR1(_1, i);
  }
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return _1(result, i);

  function _1(result, i) {
    if (i < 10) return _2(i);else {
      return eff(result);
    }
  }

  function _2(i) {
    return M.jMB1(eff(i), _3, i);
  }

  function _3(result, i) {
    i++;
    return M.jR2(_1, result, i);
  }
}