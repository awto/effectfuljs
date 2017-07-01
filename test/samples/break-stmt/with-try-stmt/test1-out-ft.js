function _1(a, _v) {
  try {
    if (a) return _2(_v);else {
      return M.jME(eff(2), _4, _3);
    }
  } catch (e) {
    return _3(e, _v);
  }
}

function _2(_v) {
  try {
    return M.jME(eff('before break'), _5, _3);
  } catch (e) {
    return _3(e, _v);
  }
}

function _3(ex, _v) {
  _v.e = ex;
  return M.jM(eff(3), _4);
}

function _4() {
  return M.jM(eff(4), _5);
}

function _5() {
  return eff(5);
}

(function () {
  var _v;

  _v = {
    e: undefined
  };
  return M.jMB1(eff(1), _1, _v);
});