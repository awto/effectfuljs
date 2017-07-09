function a() {
  var i, loop;
  loop = M.iterator(some);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
    i = loop.value;
    return M.jRM(eff(1), _1);
  }
}

function b() {
  var i, loop;
  return M.jMB(eff('d'), _1);

  function _1(a) {
    loop = M.iterator(a);
    return _2();
  }

  function _2() {
    if (loop = loop()) return _3();else {
      return eff(i);
    }
  }

  function _3() {
    i = loop.value;
    return M.jRM(eff(i), _2);
  }
}

function c() {
  var i, j, loop, _loop;

  loop = M.iterator(some);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else {
      return eff(i, j);
    }
  }

  function _2() {
    i = loop.value;
    _loop = M.iterator(other);
    return _3();
  }

  function _3() {
    if (_loop = _loop()) return _4();else return _1();
  }

  function _4() {
    j = _loop.value;
    return M.jRM(eff(i, j), _3);
  }
}

function d() {
  var i, loop;
  loop = M.iterator(some);
  return _1();

  function _1() {
    if (loop = loop()) return _2();else {
      return eff(2);
    }
  }

  function _2() {
    i = loop.value;
    return M.jRM(eff(1), _1);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}