function _1(_v) {
  try {
    return M.jMBE(eff(1), _2, _v, _4);
  } catch (e) {
    return _4(_v);
  }
}

function _2(a, _v) {
  try {
    if (a) return _3(_v);else {
      return M.jME(eff(2), _5, _4);
    }
  } catch (e) {
    return _4(_v);
  }
}

function _3(_v) {
  try {
    return M.jME(eff('before break'), _6, _4);
  } catch (e) {
    return _4(_v);
  }
}

function _4(_v) {
  _v.e = ex;
  return M.jM(eff(3), _5);
}

function _5() {
  return M.jM(eff(4), _6);
}

function _6() {
  return eff(5);
}

(function () {
  var _v = {
    e: undefined
  };
  return _1(_v);
});