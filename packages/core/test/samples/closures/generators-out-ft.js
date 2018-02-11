import * as M from '@effectful/core';

const a = w => {
  var ctx = {};
  ctx._w = w;
  return function mfs(s) {
    var _mfs = M.generator();

    _mfs._f = ctx;
    _mfs._s = s;
    return M.scope(mfs_1, mfs_2);
  };
};

function e1(k) {
  var e1 = M.generator();
  e1._k = k;
  return M.scope(e1_1, e1_4);
}

function e1(k) {
  var e1 = M.generator();
  e1._k = k;
  return M.scope(_e1_1, _e1_4);
}

function nn_1(nn) {
  return M.yldStar(M.yld(m => {
    var f = nn._f,
        mfs = nn._mfs,
        kk = nn._kk,
        vv = nn._vv,
        _nn = nn;
    return vv._id(kk._k, mfs._v, f._w, m, vv._ww, _nn._mm);
  }), nn_2, nn_4);
}

function nn_2(nn) {
  var a;
  a = nn._kk._k++;
  return M.yldStar(M.yld(a), nn_3, nn_4);
}

function nn_3(nn) {
  return M.pure();
}

function nn_4(nn, e) {
  return M.raise(e);
}

function vv_1(_vv) {
  _vv._id = void 0;
  return M.yldStar(M.yld(function _nn(mm) {
    var nn = M.generator();
    nn._f = _vv._f;
    nn._mfs = _vv._mfs;
    nn._kk = _vv._kk;
    nn._vv = _vv;
    nn._mm = mm;
    return M.scope(nn_1, nn_4);
  }), vv_2, vv_3);
}

function vv_2(_vv) {
  return M.pure();
}

function vv_3(_vv, e) {
  return M.raise(e);
}

function mfs_1(_mfs) {
  _mfs._v = void 0;
  _mfs._k = void 0;
  return M.pure(function kk(k) {
    var _kk = {};
    _kk._k = k;
    return function vv(ww) {
      var _vv = M.generator();

      _vv._f = _mfs._f;
      _vv._mfs = _mfs;
      _vv._kk = _kk;
      _vv._ww = ww;
      return M.scope(vv_1, vv_3);
    };
  });
}

function mfs_2(_mfs, e) {
  return M.raise(e);
}

function e1_1(e1) {
  var a;
  a = e1._k;
  return M.yldStar(M.yld(a), e1_2, e1_4);
}

function e2_1(_e2) {
  var a;
  a = _e2._e1._k += _e2._l;
  return M.yldStar(M.yld(a), e2_2, e2_3);
}

function e2_2(_e2) {
  return M.pure();
}

function e2_3(_e2, e) {
  return M.raise(e);
}

function e1_2(e1) {
  return M.yldStar(M.yld(function p1(m) {
    return function e2(l) {
      var _e2 = M.generator();

      _e2._e1 = e1;
      _e2._l = l;
      return M.scope(e2_1, e2_3);
    };
  }), e1_3, e1_4);
}

function e1_3(e1) {
  return M.pure();
}

function e1_4(e1, e) {
  return M.raise(e);
}

function _e1_1(e1) {
  var a;
  a = e1._k;
  return M.yldStar(M.yld(a), _e1_2, _e1_4);
}

function e3_1(_e3) {
  var a;
  a = _e3._e1._k += _e3._l;
  return M.yldStar(M.yld(a), e3_2, e3_3);
}

function e3_2(_e3) {
  return M.pure();
}

function e3_3(_e3, e) {
  return M.raise(e);
}

function _e2_1(_e2) {
  return M.yldStar(M.yld(function e3(l) {
    var _e3 = M.generator();

    _e3._e1 = _e2._e1;
    _e3._l = l;
    return M.scope(e3_1, e3_3);
  }), _e2_2, _e2_3);
}

function _e2_2(_e2) {
  return M.pure();
}

function _e2_3(_e2, e) {
  return M.raise(e);
}

function _e1_2(e1) {
  return M.yldStar(M.yld(function e2(m) {
    var _e2 = M.generator();

    _e2._e1 = e1;
    _e2._m = m;
    return M.scope(_e2_1, _e2_3);
  }), _e1_3, _e1_4);
}

function _e1_3(e1) {
  return M.pure();
}

function _e1_4(e1, e) {
  return M.raise(e);
}