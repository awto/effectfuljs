function _1(_v) {
  try {
    return M.jMB1E(eff(3), _2, _v, _4);
  } catch (e) {
    return _4(e, _v);
  }
}

function _2(a, _v) {
  try {
    if (a) return _6();else {
      return M.jM1E(M.throw(new Error('error')), _3, _v, _4);
    }
  } catch (e) {
    return _4(e, _v);
  }
}

function _3(_v) {
  try {
    return M.jME(eff(4), _5, _4);
  } catch (e) {
    return _4(e, _v);
  }
}

function _4(ex, _v) {
  _v.e = ex;
  return M.jM(eff(5), _5);
}

function _5() {
  return M.jM(eff(6), _6);
}

function _6() {
  return eff(7);
}

(function () {
  var _v;

  _v = {
    e: undefined
  };
  return M.jM1(eff(2), _1, _v);
});