import * as M from "@effectful/core";

const a = w => {
  var ctx = {};
  ctx._w = w;
  return function mfs(s) {
    var _mfs = M.context();

    _mfs._f = ctx;
    _mfs._s = s;
    return M.scope(mfs_1);
  };
};

function e1(k) {
  var e1 = M.context();
  e1._k = k;
  return M.scope(e1_1);
}

function e1(k) {
  var e1 = M.context();
  e1._k = k;
  return M.scope(_e1_1);
}

function nn_1(nn) {
  return M.yldStar(M.yld(m => {
    var f = nn._f,
        mfs = nn._mfs,
        kk = nn._kk,
        vv = nn._vv,
        _nn = nn;
    return vv._id(kk._k, mfs._v, f._w, m, vv._ww, _nn._mm);
  }), nn_2);
}

function nn_2(nn) {
  var a;
  a = nn._kk._k++;
  return M.yldStar(M.yld(a), nn_3);
}

function nn_3(nn) {
  return M.pure();
}

function vv_1(_vv) {
  _vv._id = void 0;
  return M.yldStar(M.yld(function _nn(mm) {
    var nn = M.context();
    nn._f = _vv._f;
    nn._mfs = _vv._mfs;
    nn._kk = _vv._kk;
    nn._vv = _vv;
    nn._mm = mm;
    return M.scope(nn_1);
  }), vv_2);
}

function vv_2(_vv) {
  return M.pure();
}

function mfs_1(_mfs) {
  var k;
  _mfs._v = void 0;
  k = void 0;
  return M.pure(function kk(k) {
    var _kk = {};
    _kk._k = k;
    return function vv(ww) {
      var _vv = M.context();

      _vv._f = _mfs._f;
      _vv._mfs = _mfs;
      _vv._kk = _kk;
      _vv._ww = ww;
      return M.scope(vv_1);
    };
  });
}

function e1_1(e1) {
  var a;
  a = e1._k;
  return M.yldStar(M.yld(a), e1_2);
}

function e2_1(_e2) {
  var a;
  a = _e2._e1._k += _e2._l;
  _e2._l = null;
  return M.yldStar(M.yld(a), e2_2);
}

function e2_2(_e2) {
  return M.pure();
}

function e1_2(e1) {
  return M.yldStar(M.yld(function p1(m) {
    return function e2(l) {
      var _e2 = M.context();

      _e2._e1 = e1;
      _e2._l = l;
      return M.scope(e2_1);
    };
  }), e1_3);
}

function e1_3(e1) {
  return M.pure();
}

function _e1_1(e1) {
  var a;
  a = e1._k;
  return M.yldStar(M.yld(a), _e1_2);
}

function e3_1(_e3) {
  var a;
  a = _e3._e1._k += _e3._l;
  _e3._l = null;
  return M.yldStar(M.yld(a), e3_2);
}

function e3_2(_e3) {
  return M.pure();
}

function _e2_1(_e2) {
  return M.yldStar(M.yld(function e3(l) {
    var _e3 = M.context();

    _e3._e1 = _e2._e1;
    _e3._l = l;
    return M.scope(e3_1);
  }), _e2_2);
}

function _e2_2(_e2) {
  return M.pure();
}

function _e1_2(e1) {
  return M.yldStar(M.yld(function e2(m) {
    var _e2 = M.context();

    _e2._e1 = e1;
    _e2._m = m;
    return M.scope(_e2_1);
  }), _e1_3);
}

function _e1_3(e1) {
  return M.pure();
}