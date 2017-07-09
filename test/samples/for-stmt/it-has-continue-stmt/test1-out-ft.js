function _1(_v) {
  if (_v.i < 3) {
    return M.jM1(eff(_v.i), _2, _v);
  } else return M.pure();
}

function _2(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _3(_v);
}

function _3(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.jMB1(eff(d), _4, _v);
  } else return _7(_v);
}

function _4(a, _v) {
  if (a) return _6(_v);else {
    return M.jMB1(eff(2), _5, _v);
  }
}

function _5(a, _v) {
  if (a) return _7(_v);else return _6(_v);
}

function _6(_v) {
  _v.j++;
  return M.jR1(_3, _v);
}

function _7(_v) {
  _v.i++;
  return M.jR1(_1, _v);
}

(function () {
  var _v;

  _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.i = 0;
  return _1(_v);
});