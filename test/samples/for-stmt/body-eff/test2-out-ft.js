function _1(_v) {
  if (_v.i < _v.len) return _2(_v);else {
    return eff(3);
  }
}

function _2(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _3(_v);
}

function _3(_v) {
  if (_v.j < _v.len) return _4(_v);else {
    return M.jM1(eff(2), _6, _v);
  }
}

function _4(_v) {
  _v.d = _v.ref[_v.j];
  return M.jM1(eff(_v.i), _5, _v);
}

function _5(_v) {
  _v.j++;
  return M.jNR(_3, _v);
}

function _6(_v) {
  _v.i++;
  return M.jNR(_1, _v);
}

(function () {
  var _v;

  _v = {
    i: undefined,
    j: undefined,
    d: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.i = 0, _v.len = _v.ref.lenght;
  return _1(_v);
});