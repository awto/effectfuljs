function a() {
  var i, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM(eff(1), _1, loop);
  }
}

function b() {
  var i;
  return M.jMB(eff('d'), _1);

  function _1(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else {
      return eff(i);
    }
  }

  function _3(loop) {
    i = loop.value;
    return M.jRM(eff(i), _2, loop);
  }
}

function c() {
  var i, j, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _2(loop);else {
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
    var a, b;
    b = _loop.step();
    a = _loop = b;
    if (!a.done) return _4(loop, _loop);else return _1(loop);
  }

  function _4(loop, _loop) {
    j = _loop.value;
    return M.jRM(eff(i, j), _3, loop, _loop);
  }
}

function d() {
  var i, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _2(loop);else {
      return eff(2);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM(eff(1), _1, loop);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}