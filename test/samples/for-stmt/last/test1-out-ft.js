(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.j = 0, _v.len = _v.ref.length;
  return _1(_v);
});

function _1(_v) {
  if (_v.j < _v.len) return _2(_v);else return _4();
}

function _2(_v) {
  _v.i = _v.ref[_v.j];
  return M.jB(eff(_v.i), _3, _v);
}

function _3(a, _v) {
  if (a) return _4();else {
    _v.j++;
    return M.jR(_1, _v);
  }
}

function _4() {
  return M.pure();
}