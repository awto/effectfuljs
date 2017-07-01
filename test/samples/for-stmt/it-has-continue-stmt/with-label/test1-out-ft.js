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
  } else return _6(_v);
}

function _4(a, _v) {
  if (a) return _5(_v);else {
    if (t1) return _6(_v);else return _5(_v);
  }
}

function _5(_v) {
  _v.j++;
  return M.jNR(_3, _v);
}

function _6(_v) {
  _v.i++;
  return M.jNR(_1, _v);
}

function __1(_v) {
  if (_v.i < 3) {
    return M.jM1(eff(_v.i), __2, _v);
  } else return M.pure();
}

function __2(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return __3(_v);
}

function __3(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.jMB1(eff(d), __4, _v);
  } else return _7(_v);
}

function __4(a, _v) {
  if (a) return __6(_v);else {
    return M.jMB1(eff(2), __5, _v);
  }
}

function __5(a, _v) {
  if (a) return _7(_v);else return __6(_v);
}

function __6(_v) {
  _v.j++;
  return M.jNR(__3, _v);
}

function _7(_v) {
  _v.i++;
  return M.jNR(__1, _v);
}

function _11(_v) {
  if (_v.i < 3) {
    return M.jM1(eff(_v.i), _21, _v);
  } else {
    return eff(_v.j);
  }
}

function _21(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _31(_v);
}

function _31(_v) {
  if (_v.j < _v.len) return _41(_v);else return _61(_v);
}

function _41(_v) {
  d = _v.ref[_v.j];
  return M.jM1(eff(d), _51, _v);
}

function _51(_v) {
  _v.j++;
  if (t2) return _61(_v);else {
    _v.j++;
    return M.jNR(_31, _v);
  }
}

function _61(_v) {
  _v.i++;
  return M.jNR(_11, _v);
}

function _12(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.jM1(eff(d), _22, _v);
  } else return M.pure();
}

function _22(_v) {
  _v.i++;
  if (t2) return _32(_v);else return _32(_v);
}

function _32(_v) {
  _v.j++;
  return M.jNR(_12, _v);
}

function _13(_v) {
  if (true) return _23(_v);else return _42(_v);
}

function _23(_v) {
  return M.jM1(eff(_v.j), _33, _v);
}

function _33(_v) {
  _v.j++;
  if (t2) return _42(_v);else {
    _v.j--;
    return M.jNR(_13, _v);
  }
}

function _42(_v) {
  return eff(_v.j);
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
  return __1(_v);
});

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
  return _11(_v);
});

(function () {
  var _v;

  _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.j = 0, _v.len = _v.ref.length;
  return _12(_v);
});

(function () {
  var _v;

  _v = {
    j: undefined,
    len: undefined
  };
  _v.j = 0;
  return _13(_v);
});