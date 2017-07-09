function a() {
  var i;
  var loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM1(eff(1), _1, loop);
  }
}

function b() {
  var i;
  return M.jMB(eff('d'), _1);

  function _1(a) {
    var loop;
    loop = M.iterator(a);
    return _2(loop);
  }

  function _2(loop) {
    if (loop = loop()) return _3(loop);else {
      return eff(i);
    }
  }

  function _3(loop) {
    i = loop.value;
    return M.jRM1(eff(i), _2, loop);
  }
}

function c() {
  var i, j;
  var loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else {
      return eff(i, j);
    }
  }

  function _2(loop) {
    var _loop;

    i = loop.value;
    _loop = M.iterator(other);
    return _3(loop, _loop);
  }

  function _3(loop, _loop) {
    if (_loop = _loop()) return _4(loop, _loop);else return _1(loop);
  }

  function _4(loop, _loop) {
    j = _loop.value;
    return M.jRM2(eff(i, j), _3, loop, _loop);
  }
}

function d() {
  var i;
  var loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    if (loop = loop()) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM1(eff(1), _1, loop);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}