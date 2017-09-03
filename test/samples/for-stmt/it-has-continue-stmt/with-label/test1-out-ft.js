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

(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.i = 0;
  return _7(_v);
});

(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.i = 0;
  return _14(_v);
});

(function () {
  var _v = {
    i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  _v.ref = [1, 2, 3];
  _v.j = 0, _v.len = _v.ref.length;
  return _21(_v);
});

(function () {
  var _v = {
    j: undefined,
    len: undefined
  };
  _v.j = 0;
  return _24(_v);
});

function _1(_v) {
  if (_v.i < 3) {
    return M.j(eff(_v.i), _2, _v);
  } else {
    return M.pure();
  }
}

function _2(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _3(_v);
}

function _3(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.jB(eff(d), _4, _v);
  } else return _6(_v);
}

function _4(a, _v) {
  if (a) return _5(_v);else {
    if (t1) return _6(_v);else return _5(_v);
  }
}

function _5(_v) {
  _v.j++;
  return M.jR(_3, _v);
}

function _6(_v) {
  _v.i++;
  return M.jR(_1, _v);
}

function _7(_v) {
  if (_v.i < 3) {
    return M.j(eff(_v.i), _8, _v);
  } else {
    return M.pure();
  }
}

function _8(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _9(_v);
}

function _9(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.jB(eff(d), _10, _v);
  } else return _13(_v);
}

function _10(a, _v) {
  if (a) return _12(_v);else {
    return M.jB(eff(2), _11, _v);
  }
}

function _11(a, _v) {
  if (a) return _13(_v);else return _12(_v);
}

function _12(_v) {
  _v.j++;
  return M.jR(_9, _v);
}

function _13(_v) {
  _v.i++;
  return M.jR(_7, _v);
}

function _14(_v) {
  if (_v.i < 3) {
    return M.j(eff(_v.i), _15, _v);
  } else {
    return M.j(eff(_v.j), _20);
  }
}

function _15(_v) {
  _v.j = 0, _v.len = _v.ref.length;
  return _16(_v);
}

function _16(_v) {
  if (_v.j < _v.len) return _17(_v);else return _19(_v);
}

function _17(_v) {
  d = _v.ref[_v.j];
  return M.j(eff(d), _18, _v);
}

function _18(_v) {
  _v.j++;
  if (t2) return _19(_v);else {
    _v.j++;
    return M.jR(_16, _v);
  }
}

function _19(_v) {
  _v.i++;
  return M.jR(_14, _v);
}

function _20() {
  return M.pure();
}

function _21(_v) {
  if (_v.j < _v.len) {
    d = _v.ref[_v.j];
    return M.j(eff(d), _22, _v);
  } else {
    return M.pure();
  }
}

function _22(_v) {
  _v.i++;
  if (t2) return _23(_v);else return _23(_v);
}

function _23(_v) {
  _v.j++;
  return M.jR(_21, _v);
}

function _24(_v) {
  if (true) return _25(_v);else return _27(_v);
}

function _25(_v) {
  return M.j(eff(_v.j), _26, _v);
}

function _26(_v) {
  _v.j++;
  if (t2) return _27(_v);else {
    _v.j--;
    return M.jR(_24, _v);
  }
}

function _27(_v) {
  return M.j(eff(_v.j), _28);
}

function _28() {
  return M.pure();
}