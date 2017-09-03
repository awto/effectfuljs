(function () {
  var _v = {
    e: undefined
  };

  try {
    return M.jBH(eff(1), _1, _4, _v);
  } catch (ex) {
    return _4(ex, _v);
  }
});

function _1(a, _v) {
  try {
    if (a) return _2(_v);else return _3(_v);
  } catch (ex) {
    return _4(ex, _v);
  }
}

function _2(_v) {
  try {
    return M.jH(eff('before break'), _6, _4, _v);
  } catch (ex) {
    return _4(ex, _v);
  }
}

function _3(_v) {
  try {
    return M.jH(eff(2), _5, _4, _v);
  } catch (ex) {
    return _4(ex, _v);
  }
}

function _4(ex, _v) {
  _v.e = ex;
  return M.j(eff(3), _5, _v);
}

function _5(_v) {
  return M.j(eff(4), _6, _v);
}

function _6(_v) {
  return M.j(eff(5), _7);
}

function _7() {
  return M.pure();
}