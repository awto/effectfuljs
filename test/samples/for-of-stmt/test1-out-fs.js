function a() {
  var i, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _2(loop);else {
      return M.j(eff(2), _3);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jR(eff(1), _1, loop);
  }

  function _3() {
    return M.pure();
  }
}

function b() {
  var i;
  return M.jB(eff('d'), _1);

  function _1(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _3(loop);else {
      return M.j(eff(i), _4);
    }
  }

  function _3(loop) {
    i = loop.value;
    return M.jR(eff(i), _2, loop);
  }

  function _4() {
    return M.pure();
  }
}

function c() {
  var i, j, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _2(loop);else {
      return M.j(eff(i, j), _5);
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
    b = _loop.incr();
    a = _loop = b;
    if (!a.done) return _4(loop, _loop);else return _1(loop);
  }

  function _4(loop, _loop) {
    j = _loop.value;
    return M.jR(eff(i, j), _3, loop, _loop);
  }

  function _5() {
    return M.pure();
  }
}

function d() {
  var i, loop;
  loop = M.iterator(some);
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _2(loop);else {
      return M.j(eff(2), _3);
    }
  }

  function _2(loop) {
    i = loop.value;
    return M.jR(eff(1), _1, loop);
  }

  function _3() {
    return M.pure();
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
  return;
}