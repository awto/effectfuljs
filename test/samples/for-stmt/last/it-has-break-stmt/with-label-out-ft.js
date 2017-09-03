(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.i = 0;
  return _1(_v);
});

function _1(_v) {
  if (_v.i < 3) return _2(_v);else return _9();
}

function _2(_v) {
  return M.j(eff(_v.i), _3, _v);
}

function _3(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _4(_v);
}

function _4(_v) {
  if (_v.j < _v.len) return _5(_v);else return _8(_v);
}

function _5(_v) {
  d = _v.ref[_v.j];
  return M.jB(eff(d), _6, _v);
}

function _6(a, _v) {
  if (a) return _8(_v);else {
    return M.jB(eff(2), _7, _v);
  }
}

function _7(a, _v) {
  if (a) return _9();else {
    _v.j++;
    return M.jR(_4, _v);
  }
}

function _8(_v) {
  _v.i++;
  return M.jR(_1, _v);
}

function _9() {
  return M.pure();
}