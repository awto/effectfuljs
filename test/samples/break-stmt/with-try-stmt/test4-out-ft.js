function _1(_v) {
  try {
    return M.jME(eff(2), _2, _v, _5);
  } catch (e) {
    return _5(_v);
  }
}

function _2(_v) {
  try {
    return M.jMBE(eff(3), _3, _v, _5);
  } catch (e) {
    return _5(_v);
  }
}

function _3(a, _v) {
  try {
    if (a) return _7();else {
      return M.jME(M.throw(new Error('error')), _4, _v, _5);
    }
  } catch (e) {
    return _5(_v);
  }
}

function _4(_v) {
  try {
    return M.jME(eff(4), _6, _5);
  } catch (e) {
    return _5(_v);
  }
}

function _5(_v) {
  _v.e = ex;
  return M.jM(eff(5), _6);
}

function _6() {
  return M.jM(eff(6), _7);
}

function _7() {
  return eff(7);
}

(function () {
  var _v = {
    e: undefined
  };
  return _1(_v);
});