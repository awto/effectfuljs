(function () {
  var _v = {
    e: undefined
  };

  try {
    return M.jH(eff(2), _1, _5, _v);
  } catch (ex) {
    return _5(ex, _v);
  }
});

function _1(_v) {
  try {
    return M.jBH(eff(3), _2, _5, _v);
  } catch (ex) {
    return _5(ex, _v);
  }
}

function _2(a, _v) {
  try {
    if (a) return _7();else return _3(_v);
  } catch (ex) {
    return _5(ex, _v);
  }
}

function _3(_v) {
  try {
    throw new Error('error');
    return _4(_v);
  } catch (ex) {
    return _5(ex, _v);
  }
}

function _4(_v) {
  try {
    return M.jH(eff(4), _6, _5, _v);
  } catch (ex) {
    return _5(ex, _v);
  }
}

function _5(ex, _v) {
  _v.e = ex;
  return M.j(eff(5), _6, _v);
}

function _6(_v) {
  return M.j(eff(6), _7);
}

function _7() {
  return M.j(eff(7), _8);
}

function _8() {
  return M.pure();
}