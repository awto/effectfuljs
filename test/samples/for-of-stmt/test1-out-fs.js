function a() {
  loop = M.iterator(some);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
    var i;
    i = loop.value;
    return M.jMR(eff(1), _1);
  }
}

function b() {
  return M.jMB(eff('d'), _1);

  function _1(a) {
    _loop = M.iterator(a);
    return _2(undefined);
  }

  function _2(i) {
    if (_loop = _loop()) return _3();else {
      return eff(i);
    }
  }

  function _3() {
    var i;
    i = _loop.value;
    return M.jM1R(eff(i), _2, i);
  }
}

function c() {
  loop1 = M.iterator(some);
  return _1();

  function _1(i, j) {
    if (loop1 = loop1()) return _2(j);else {
      return eff(i, j);
    }
  }

  function _2(j) {
    var i;
    i = loop1.value;
    loop2 = M.iterator(other);
    return _3(i, j);
  }

  function _3(i, j) {
    if (loop2 = loop2()) return _4(i);else return _1(i, j);
  }

  function _4(i) {
    var j;
    j = loop2.value;
    return M.jM2R(eff(i, j), _3, i, j);
  }
}

function d() {
  loop3 = M.iterator(some);
  return _1();

  function _1() {
    if (loop3 = loop3()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
    var i;
    i = loop3.value;
    return M.jMR(eff(1), _1);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}