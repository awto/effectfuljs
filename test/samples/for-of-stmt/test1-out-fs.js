function a() {
  var loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(1), _1, loop);
  }
}

function b() {
  return M.jMB(eff('d'), _1);

  function _1(a) {
    var loop;
    loop = M.iterator(a);
    return _2(undefined, loop);
  }

  function _2(i, loop) {
    if (loop = loop()) return _3(loop);else {
      return eff(i);
    }
  }

  function _3(loop) {
    var i;
    i = loop.value;
    return M.jM2R(eff(i), _2, i, loop);
  }
}

function c() {
  var loop;
  loop = M.iterator(some);
  return _1(undefined, undefined, loop);

  function _1(i, j, loop) {
    if (loop = loop()) return _2(j, loop);else {
      return eff(i, j);
    }
  }

  function _2(j, loop) {
    var i, _loop;

    i = loop.value;
    _loop = M.iterator(other);
    return _3(i, j, loop, _loop);
  }

  function _3(i, j, loop, _loop) {
    if (_loop = _loop()) return _4(i, loop, _loop);else return _1(i, j, loop);
  }

  function _4(i, loop, _loop) {
    var j;
    j = _loop.value;
    return M.jM4R(eff(i, j), _3, i, j, loop, _loop);
  }
}

function d() {
  var loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    var i;
    i = loop.value;
    return M.jM1R(eff(1), _1, loop);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}