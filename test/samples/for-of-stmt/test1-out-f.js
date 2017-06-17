function a() {
  var i;
  loop = M.iterator(some);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
    i = loop.value;
    return M.jMR(eff(1), _1);
  }
}

function b() {
  var i;
  return M.jMB(eff('d'), _1);

  function _1(a) {
    _loop = M.iterator(a);
    return _2();
  }

  function _2() {
    if (_loop = _loop()) return _3();else {
      return eff(i);
    }
  }

  function _3() {
    i = _loop.value;
    return M.jMR(eff(i), _2);
  }
}

function c() {
  var i, j;
  loop1 = M.iterator(some);
  return _1();

  function _1() {
    if (loop1 = loop1()) return _2();else {
      return eff(i, j);
    }
  }

  function _2() {
    i = loop1.value;
    loop2 = M.iterator(other);
    return _3();
  }

  function _3() {
    if (loop2 = loop2()) return _4();else return _1();
  }

  function _4() {
    j = loop2.value;
    return M.jMR(eff(i, j), _3);
  }
}

function d() {
  var i;
  loop3 = M.iterator(some);
  return _1();

  function _1() {
    if (loop3 = loop3()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
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