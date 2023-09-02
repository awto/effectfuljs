import * as M from "@effectful/core";
function forOfBlockScope() {
  var forOfBlockScope = M.context();
  return M.scope(forOfBlockScope_1);
}
function iter_1(_iter) {
  return M.yldStar(M.yld(`fo1: ${_iter._f._i} ${_iter._f._j++}`), iter_2);
}
function iter_2(_iter) {
  return M.pure();
}
function iter_3(_iter, r) {
  return M.pure(r);
}
function _iter_1(_iter) {
  return M.yldStar(M.yld(`fo2: ${_iter._forOfBlockScope._i1} ${_iter._forOfBlockScope._j++}`), _iter_2);
}
function _iter_2(_iter) {
  return M.pure();
}
function _iter_3(_iter, r) {
  return M.pure(r);
}
function iter_11(_iter) {
  return M.yldStar(M.yld(`fo3: ${_iter._f._i} ${_iter._f1._j++}`), iter_21);
}
function iter_21(_iter) {
  return M.pure();
}
function iter_31(_iter, r) {
  return M.pure(r);
}
function forOfBlockScope_1(forOfBlockScope) {
  forOfBlockScope._a = [1, 2, 3, 4, 5, 6, 7, 8];
  forOfBlockScope._b = [10, 11, 12, 13, 14, 15, 16];
  forOfBlockScope._funs = [];
  for (forOfBlockScope._i of forOfBlockScope._a) {
    (i => {
      var ctx = {},
        _forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      ctx._j = 0;
      _forOfBlockScope._funs.push(function iter() {
        var _iter = M.context();
        _iter._f = ctx;
        return M.scope(iter_1);
      });
    })(forOfBlockScope._i);
  }
  for (forOfBlockScope._i1 of forOfBlockScope._a) {
    forOfBlockScope._j = 0;
    forOfBlockScope._funs.push(function iter() {
      var _iter = M.context();
      _iter._forOfBlockScope = forOfBlockScope;
      return M.scope(_iter_1);
    });
  }
  for (forOfBlockScope._i2 of forOfBlockScope._a) {
    (i => {
      var j,
        ctx = {},
        _forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      for (j of _forOfBlockScope._b) {
        (j => {
          var _ctx = {},
            forOfBlockScope = _forOfBlockScope,
            f = ctx;
          _ctx._j = j;
          forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._f = f;
            _iter._f1 = _ctx;
            return M.scope(iter_11);
          });
        })(j);
      }
    })(forOfBlockScope._i2);
  }
  forOfBlockScope._loop = M.iterator(forOfBlockScope._a);
  forOfBlockScope._i = null, forOfBlockScope._i2 = null;
  return M.jump(void 0, forOfBlockScope_2, forOfBlockScope_57);
}
function _f_1(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, _f_2, f_8);
}
function f_1(_ctx) {
  return M.yldStar(M.yld(`fo4: ${_ctx._j}`), f_2);
}
function iter_12(_iter) {
  return M.yldStar(M.yld(`fo5: ${_iter._f._i} ${_iter._f1._j++}`), iter_22);
}
function iter_22(_iter) {
  return M.pure();
}
function iter_32(_iter, r) {
  return M.pure(r);
}
function f_2(_ctx) {
  _ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();
    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return M.scope(iter_12);
  });
  return M.pure();
}
function f_3(_ctx, r) {
  return M.pure(r);
}
function _f_2(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_1);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), _f_2, f_8);
  } else {
    ctx._fc = f_4, ctx._fe = f_6, ctx._j = null;
    return M.jump(void 0, _f_3);
  }
}
function _f_3(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_4(ctx) {
  return M.pure();
}
function f_5(ctx, r) {
  return M.pure(r);
}
function f_6(ctx, e) {
  return M.raise(e);
}
function f_7(ctx) {
  return M.raise(ctx._err1);
}
function f_8(ctx, a) {
  ctx._fc = f_7, ctx._fe = f_6, ctx._err1 = a;
  return M.jump(void 0, _f_3);
}
function forOfBlockScope_2(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop = forOfBlockScope._loop.step()).done) {
    forOfBlockScope._i3 = forOfBlockScope._loop.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(_f_1);
    })(forOfBlockScope._i3);
    return M.yldStar(M.yldStar(a), forOfBlockScope_2, forOfBlockScope_57);
  } else {
    forOfBlockScope._fc = forOfBlockScope_4, forOfBlockScope._fe = forOfBlockScope_44, forOfBlockScope._i3 = null;
    return M.jump(void 0, forOfBlockScope_3);
  }
}
function forOfBlockScope_3(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop.exit) {
    forOfBlockScope._loop.exit();
  }
  a = forOfBlockScope._fc, b = forOfBlockScope._fe, forOfBlockScope._loop = null, forOfBlockScope._fc = null, forOfBlockScope._fe = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_4(forOfBlockScope) {
  forOfBlockScope._loop1 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_5, forOfBlockScope_58);
}
function f_11(ctx) {
  return M.yldStar(M.yld(`fo6: ${ctx._i}`), f_21);
}
function iter_13(_iter) {
  return M.yldStar(M.yld(`fo7: ${_iter._f._i} ${_iter._f1._j++}`), iter_23);
}
function iter_23(_iter) {
  return M.pure();
}
function iter_33(_iter, r) {
  return M.pure(r);
}
function f_21(ctx) {
  for (ctx._j of ctx._forOfBlockScope._b) {
    (j => {
      var _ctx = {},
        forOfBlockScope = ctx._forOfBlockScope,
        f = ctx;
      _ctx._j = j;
      forOfBlockScope._funs.push(function iter() {
        var _iter = M.context();
        _iter._f = f;
        _iter._f1 = _ctx;
        return M.scope(iter_13);
      });
    })(ctx._j);
  }
  return M.pure();
}
function f_31(ctx, r) {
  return M.pure(r);
}
function forOfBlockScope_5(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop1 = forOfBlockScope._loop1.step()).done) {
    forOfBlockScope._i4 = forOfBlockScope._loop1.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_11);
    })(forOfBlockScope._i4);
    return M.yldStar(M.yldStar(a), forOfBlockScope_5, forOfBlockScope_58);
  } else {
    forOfBlockScope._fc1 = forOfBlockScope_7, forOfBlockScope._fe1 = forOfBlockScope_44, forOfBlockScope._i4 = null;
    return M.jump(void 0, forOfBlockScope_6);
  }
}
function forOfBlockScope_6(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop1.exit) {
    forOfBlockScope._loop1.exit();
  }
  a = forOfBlockScope._fc1, b = forOfBlockScope._fe1, forOfBlockScope._loop1 = null, forOfBlockScope._fc1 = null, forOfBlockScope._fe1 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_7(forOfBlockScope) {
  forOfBlockScope._loop2 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_8, forOfBlockScope_59);
}
function f_13(ctx) {
  return M.yldStar(M.yld(`fo8 ${ctx._i}`), f_23);
}
function f_23(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_33, f_9);
}
function f_12(_ctx) {
  return M.yldStar(M.yld(`fo9: ${_ctx._f._i}`), f_22);
}
function iter_14(_iter) {
  return M.yldStar(M.yld(`fo10: ${_iter._f._i} ${_iter._f1._j++}`), iter_24);
}
function iter_24(_iter) {
  return M.pure();
}
function iter_34(_iter, r) {
  return M.pure(r);
}
function f_22(_ctx) {
  _ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();
    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return M.scope(iter_14);
  });
  return M.pure();
}
function f_32(_ctx, r) {
  return M.pure(r);
}
function f_33(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_12);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_33, f_9);
  } else {
    ctx._fc = _f_5, ctx._fe = _f_7, ctx._j = null;
    return M.jump(void 0, _f_4);
  }
}
function _f_4(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function _f_5(ctx) {
  return M.pure();
}
function _f_6(ctx, r) {
  return M.pure(r);
}
function _f_7(ctx, e) {
  return M.raise(e);
}
function _f_8(ctx) {
  return M.raise(ctx._err1);
}
function f_9(ctx, a) {
  ctx._fc = _f_8, ctx._fe = _f_7, ctx._err1 = a;
  return M.jump(void 0, _f_4);
}
function forOfBlockScope_8(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop2 = forOfBlockScope._loop2.step()).done) {
    forOfBlockScope._i5 = forOfBlockScope._loop2.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_13);
    })(forOfBlockScope._i5);
    return M.yldStar(M.yldStar(a), forOfBlockScope_8, forOfBlockScope_59);
  } else {
    forOfBlockScope._fc2 = forOfBlockScope_10, forOfBlockScope._fe2 = forOfBlockScope_44, forOfBlockScope._i5 = null;
    return M.jump(void 0, forOfBlockScope_9);
  }
}
function forOfBlockScope_9(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop2.exit) {
    forOfBlockScope._loop2.exit();
  }
  a = forOfBlockScope._fc2, b = forOfBlockScope._fe2, forOfBlockScope._loop2 = null, forOfBlockScope._fc2 = null, forOfBlockScope._fe2 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_10(forOfBlockScope) {
  forOfBlockScope._loop3 = M.iterator(forOfBlockScope._funs);
  return M.jump(void 0, forOfBlockScope_11, forOfBlockScope_60);
}
function forOfBlockScope_11(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop3 = forOfBlockScope._loop3.step()).done) {
    forOfBlockScope._i6 = forOfBlockScope._loop3.value;
    a = (0, forOfBlockScope._i6)();
    return M.yldStar(M.yldStar(a), forOfBlockScope_11, forOfBlockScope_60);
  } else {
    forOfBlockScope._fc3 = forOfBlockScope_13, forOfBlockScope._fe3 = forOfBlockScope_44, forOfBlockScope._i6 = null;
    return M.jump(void 0, forOfBlockScope_12);
  }
}
function forOfBlockScope_12(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop3.exit) {
    forOfBlockScope._loop3.exit();
  }
  a = forOfBlockScope._fc3, b = forOfBlockScope._fe3, forOfBlockScope._loop3 = null, forOfBlockScope._fc3 = null, forOfBlockScope._fe3 = null;
  return M.jump(void 0, a, b);
}
function iter_15(_iter) {
  return M.yldStar(M.yld(`fo11: ${_iter._f._i}`), iter_25);
}
function iter_25(_iter) {
  return M.pure();
}
function iter_35(_iter, r) {
  return M.pure(r);
}
function forOfBlockScope_13(forOfBlockScope) {
  forOfBlockScope._funs.length = 0;
  for (forOfBlockScope._i7 of forOfBlockScope._a) {
    (i => {
      var ctx = {},
        _forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      _forOfBlockScope._funs.push(function iter() {
        var _iter = M.context();
        _iter._f = ctx;
        return M.scope(iter_15);
      });
    })(forOfBlockScope._i7);
  }
  forOfBlockScope._loop4 = M.iterator(forOfBlockScope._a);
  forOfBlockScope._i7 = null;
  return M.jump(void 0, forOfBlockScope_14, forOfBlockScope_61);
}
function f_14(ctx) {
  return M.yldStar(M.yld(`fo12 ${ctx._i}`), f_24);
}
function iter_16(_iter) {
  return M.yldStar(M.yld(`fo13 ${_iter._f._i}`), iter_26);
}
function iter_26(_iter) {
  return M.pure();
}
function iter_36(_iter, r) {
  return M.pure(r);
}
function f_24(ctx) {
  ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();
    _iter._f = ctx;
    return M.scope(iter_16);
  });
  return M.pure();
}
function f_34(ctx, r) {
  return M.pure(r);
}
function forOfBlockScope_14(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop4 = forOfBlockScope._loop4.step()).done) {
    forOfBlockScope._i8 = forOfBlockScope._loop4.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_14);
    })(forOfBlockScope._i8);
    return M.yldStar(M.yldStar(a), forOfBlockScope_14, forOfBlockScope_61);
  } else {
    forOfBlockScope._fc4 = forOfBlockScope_16, forOfBlockScope._fe4 = forOfBlockScope_44, forOfBlockScope._i8 = null;
    return M.jump(void 0, forOfBlockScope_15);
  }
}
function forOfBlockScope_15(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop4.exit) {
    forOfBlockScope._loop4.exit();
  }
  a = forOfBlockScope._fc4, b = forOfBlockScope._fe4, forOfBlockScope._loop4 = null, forOfBlockScope._fc4 = null, forOfBlockScope._fe4 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_16(forOfBlockScope) {
  forOfBlockScope._k = 0;
  forOfBlockScope._loop5 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_62);
}
function f_15(ctx) {
  return M.yldStar(M.yld(`fo14 ${ctx._i} ${ctx._forOfBlockScope._k} {m}`), f_25);
}
function iter_17(_iter) {
  return M.yldStar(M.yld(`fo15 ${_iter._f._i} ${_iter._forOfBlockScope._k} {m}`), iter_27);
}
function iter_27(_iter) {
  return M.pure();
}
function iter_37(_iter, r) {
  return M.pure(r);
}
function f_25(ctx) {
  var m;
  m = ctx._forOfBlockScope._k;
  ctx._forOfBlockScope._k++;
  if (ctx._forOfBlockScope._k === 3) {
    return M.pure(0);
  } else {
    if (ctx._forOfBlockScope._k === 5) {
      return M.pure(1);
    } else {
      ctx._forOfBlockScope._funs.push(function iter() {
        var _iter = M.context();
        _iter._forOfBlockScope = ctx._forOfBlockScope;
        _iter._f = ctx;
        return M.scope(iter_17);
      });
      return M.pure();
    }
  }
}
function f_35(ctx, r) {
  return M.pure(r);
}
function forOfBlockScope_17(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop5 = forOfBlockScope._loop5.step()).done) {
    forOfBlockScope._i9 = forOfBlockScope._loop5.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_15);
    })(forOfBlockScope._i9);
    return M.yldStar(M.yldStar(a), forOfBlockScope_18, forOfBlockScope_62);
  } else {
    forOfBlockScope._fc5 = forOfBlockScope_20, forOfBlockScope._fe5 = forOfBlockScope_44, forOfBlockScope._i9 = null;
    return M.jump(void 0, forOfBlockScope_19);
  }
}
function forOfBlockScope_18(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_62);
    case 1:
      forOfBlockScope._fc5 = forOfBlockScope_20, forOfBlockScope._fe5 = forOfBlockScope_44;
      return M.jump(void 0, forOfBlockScope_19);
    default:
      return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_62);
  }
}
function forOfBlockScope_19(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop5.exit) {
    forOfBlockScope._loop5.exit();
  }
  a = forOfBlockScope._fc5, b = forOfBlockScope._fe5, forOfBlockScope._loop5 = null, forOfBlockScope._fc5 = null, forOfBlockScope._fe5 = null;
  return M.jump(void 0, a, b);
}
function iter_18(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo18: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_28);
}
function iter_28(_iter) {
  return M.pure();
}
function iter_38(_iter, r) {
  return M.pure(r);
}
function forOfBlockScope_20(forOfBlockScope) {
  forOfBlockScope._k = 0;
  up1: for (forOfBlockScope._i10 of forOfBlockScope._a) {
    switch ((i => {
      var j,
        ctx = {},
        _forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      ctx._m = _forOfBlockScope._k;
      _forOfBlockScope._k++;
      for (j of _forOfBlockScope._b) {
        switch ((j => {
          var _ctx = {},
            forOfBlockScope = _forOfBlockScope,
            f = ctx;
          _ctx._j = j;
          _ctx._n = f._m;
          f._m++;
          if (forOfBlockScope._k === 3) return 0;
          if (forOfBlockScope._k === 5) return 1;
          if (_ctx._n === 3) return 2;
          if (_ctx._n === 5) return 3;
          forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = forOfBlockScope;
            _iter._f = f;
            _iter._f1 = _ctx;
            return M.scope(iter_18);
          });
        })(j)) {
          case 0:
            return 0;
          case 1:
            return 1;
          case 2:
            continue;
          case 3:
            break;
          default:
            continue;
        }
        break;
      }
    })(forOfBlockScope._i10)) {
      case 0:
        {
          continue up1;
        }
      case 1:
        {
          break up1;
        }
      default:
        {
          continue;
        }
    }
  }
  forOfBlockScope._k = 0;
  forOfBlockScope._loop6 = M.iterator(forOfBlockScope._a);
  forOfBlockScope._i10 = null;
  return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_63);
}
function f_17(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k++;
  return M.yldStar(M.yld(`fo16: ${ctx._i} ${ctx._forOfBlockScope._k} ${ctx._m}`), f_27);
}
function f_27(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_36, _f_11);
}
function iter_19(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo18: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_29);
}
function iter_29(_iter) {
  return M.pure();
}
function iter_39(_iter, r) {
  return M.pure(r);
}
function f_16(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  if (_ctx._forOfBlockScope._k === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k === 5) {
      return M.pure(1);
    } else {
      if (_ctx._n === 3) {
        return M.pure(2);
      } else {
        if (_ctx._n === 5) {
          return M.pure(3);
        } else {
          _ctx._forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = _ctx._forOfBlockScope;
            _iter._f = _ctx._f;
            _iter._f1 = _ctx;
            return M.scope(iter_19);
          });
          return M.pure();
        }
      }
    }
  }
}
function f_26(_ctx, r) {
  return M.pure(r);
}
function f_36(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_16);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_41, _f_11);
  } else {
    ctx._fc = f_61, ctx._fe = f_81, ctx._j = null;
    return M.jump(void 0, f_51);
  }
}
function f_41(ctx, a) {
  switch (a) {
    case 0:
      ctx._fc = _f_9, ctx._fe = f_81, ctx._r = 0;
      return M.jump(void 0, f_51);
    case 1:
      ctx._fc = _f_9, ctx._fe = f_81, ctx._r = 1;
      return M.jump(void 0, f_51);
    case 2:
      return M.jump(void 0, f_36, _f_11);
    case 3:
      ctx._fc = f_61, ctx._fe = f_81;
      return M.jump(void 0, f_51);
    default:
      return M.jump(void 0, f_36, _f_11);
  }
}
function f_51(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_61(ctx) {
  return M.pure();
}
function f_71(ctx, r) {
  return M.pure(r);
}
function f_81(ctx, e) {
  return M.raise(e);
}
function _f_9(ctx) {
  var a;
  a = ctx._r, ctx._r = null;
  return M.jump(a, f_71);
}
function f_10(ctx) {
  return M.raise(ctx._err1);
}
function _f_11(ctx, a) {
  ctx._fc = f_10, ctx._fe = f_81, ctx._err1 = a;
  return M.jump(void 0, f_51);
}
function forOfBlockScope_21(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop6 = forOfBlockScope._loop6.step()).done) {
    forOfBlockScope._i11 = forOfBlockScope._loop6.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_17);
    })(forOfBlockScope._i11);
    return M.yldStar(M.yldStar(a), forOfBlockScope_22, forOfBlockScope_63);
  } else {
    forOfBlockScope._fc6 = forOfBlockScope_24, forOfBlockScope._fe6 = forOfBlockScope_44, forOfBlockScope._i11 = null;
    return M.jump(void 0, forOfBlockScope_23);
  }
}
function forOfBlockScope_22(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_63);
    case 1:
      forOfBlockScope._fc6 = forOfBlockScope_24, forOfBlockScope._fe6 = forOfBlockScope_44;
      return M.jump(void 0, forOfBlockScope_23);
    default:
      return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_63);
  }
}
function forOfBlockScope_23(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop6.exit) {
    forOfBlockScope._loop6.exit();
  }
  a = forOfBlockScope._fc6, b = forOfBlockScope._fe6, forOfBlockScope._loop6 = null, forOfBlockScope._fc6 = null, forOfBlockScope._fe6 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_24(forOfBlockScope) {
  forOfBlockScope._k = 0;
  forOfBlockScope._loop7 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_64);
}
function f_19(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k++;
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_29, _f_10);
}
function f_18(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo19 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k} ${_ctx._f._m} ${_ctx._n}`), f_28);
}
function iter_110(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo20: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_210);
}
function iter_210(_iter) {
  return M.pure();
}
function iter_310(_iter, r) {
  return M.pure(r);
}
function f_28(_ctx) {
  if (_ctx._forOfBlockScope._k === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k === 5) {
      return M.pure(1);
    } else {
      if (_ctx._n === 3) {
        return M.pure(2);
      } else {
        if (_ctx._n === 5) {
          return M.pure(3);
        } else {
          _ctx._forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = _ctx._forOfBlockScope;
            _iter._f = _ctx._f;
            _iter._f1 = _ctx;
            return M.scope(iter_110);
          });
          return M.pure();
        }
      }
    }
  }
}
function f_37(_ctx, r) {
  return M.pure(r);
}
function f_29(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_18);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_38, _f_10);
  } else {
    ctx._fc = f_52, ctx._fe = f_72, ctx._j = null;
    return M.jump(void 0, f_42);
  }
}
function f_38(ctx, a) {
  switch (a) {
    case 0:
      ctx._fc = f_82, ctx._fe = f_72, ctx._r = 0;
      return M.jump(void 0, f_42);
    case 1:
      ctx._fc = f_82, ctx._fe = f_72, ctx._r = 1;
      return M.jump(void 0, f_42);
    case 2:
      return M.jump(void 0, f_29, _f_10);
    case 3:
      ctx._fc = f_52, ctx._fe = f_72;
      return M.jump(void 0, f_42);
    default:
      return M.jump(void 0, f_29, _f_10);
  }
}
function f_42(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_52(ctx) {
  return M.pure();
}
function f_62(ctx, r) {
  return M.pure(r);
}
function f_72(ctx, e) {
  return M.raise(e);
}
function f_82(ctx) {
  var a;
  a = ctx._r, ctx._r = null;
  return M.jump(a, f_62);
}
function f_91(ctx) {
  return M.raise(ctx._err1);
}
function _f_10(ctx, a) {
  ctx._fc = f_91, ctx._fe = f_72, ctx._err1 = a;
  return M.jump(void 0, f_42);
}
function forOfBlockScope_25(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop7 = forOfBlockScope._loop7.step()).done) {
    forOfBlockScope._i12 = forOfBlockScope._loop7.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_19);
    })(forOfBlockScope._i12);
    return M.yldStar(M.yldStar(a), forOfBlockScope_26, forOfBlockScope_64);
  } else {
    forOfBlockScope._fc7 = forOfBlockScope_28, forOfBlockScope._fe7 = forOfBlockScope_44, forOfBlockScope._i12 = null;
    return M.jump(void 0, forOfBlockScope_27);
  }
}
function forOfBlockScope_26(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_64);
    case 1:
      forOfBlockScope._fc7 = forOfBlockScope_28, forOfBlockScope._fe7 = forOfBlockScope_44;
      return M.jump(void 0, forOfBlockScope_27);
    default:
      return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_64);
  }
}
function forOfBlockScope_27(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop7.exit) {
    forOfBlockScope._loop7.exit();
  }
  a = forOfBlockScope._fc7, b = forOfBlockScope._fe7, forOfBlockScope._loop7 = null, forOfBlockScope._fc7 = null, forOfBlockScope._fe7 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_28(forOfBlockScope) {
  forOfBlockScope._k1 = 0;
  return M.yldStar(M.yld(`fo21: ${forOfBlockScope._i1} ${forOfBlockScope._k1}`), forOfBlockScope_29);
}
function forOfBlockScope_29(forOfBlockScope) {
  forOfBlockScope._loop8 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_65);
}
function f_111(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k1++;
  return M.yldStar(M.yld(`fo22: ${ctx._i} ${ctx._forOfBlockScope._k1} ${ctx._m}`), f_211);
}
function f_211(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_310, f_116);
}
function f_110(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo23 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k1} ${_ctx._f._m} ${_ctx._n}`), f_210);
}
function iter_111(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo24: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k1} ${_iter._f._m} ${_iter._f1._n}`), iter_211);
}
function iter_211(_iter) {
  return M.pure();
}
function iter_311(_iter, r) {
  return M.pure(r);
}
function f_210(_ctx) {
  if (_ctx._forOfBlockScope._k1 === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k1 === 5) {
      return M.pure(1);
    } else {
      if (_ctx._n === 3) {
        return M.pure(2);
      } else {
        if (_ctx._n === 5) {
          return M.pure(3);
        } else {
          _ctx._forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = _ctx._forOfBlockScope;
            _iter._f = _ctx._f;
            _iter._f1 = _ctx;
            return M.scope(iter_111);
          });
          return M.pure();
        }
      }
    }
  }
}
function f_39(_ctx, r) {
  return M.pure(r);
}
function f_310(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_110);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_43, f_116);
  } else {
    ctx._fc = f_63, ctx._fe = f_83, ctx._j = null;
    return M.jump(void 0, f_53);
  }
}
function f_43(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_92, ctx._fe = f_83, ctx._r = 0;
      return M.jump(void 0, f_53);
    case 0:
      ctx._fc = f_92, ctx._fe = f_83, ctx._r = 1;
      return M.jump(void 0, f_53);
    case 2:
      return M.jump(void 0, f_310, f_116);
    case 3:
      ctx._fc = f_63, ctx._fe = f_83;
      return M.jump(void 0, f_53);
    default:
      return M.jump(void 0, f_310, f_116);
  }
}
function f_53(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_63(ctx) {
  return M.pure();
}
function f_73(ctx, r) {
  return M.pure(r);
}
function f_83(ctx, e) {
  return M.raise(e);
}
function f_92(ctx) {
  var a;
  a = ctx._r, ctx._r = null;
  return M.jump(a, f_73);
}
function f_101(ctx) {
  return M.raise(ctx._err1);
}
function f_116(ctx, a) {
  ctx._fc = f_101, ctx._fe = f_83, ctx._err1 = a;
  return M.jump(void 0, f_53);
}
function forOfBlockScope_30(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop8 = forOfBlockScope._loop8.step()).done) {
    forOfBlockScope._i13 = forOfBlockScope._loop8.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_111);
    })(forOfBlockScope._i13);
    return M.yldStar(M.yldStar(a), forOfBlockScope_31, forOfBlockScope_65);
  } else {
    forOfBlockScope._fc8 = forOfBlockScope_33, forOfBlockScope._fe8 = forOfBlockScope_44, forOfBlockScope._i13 = null;
    return M.jump(void 0, forOfBlockScope_32);
  }
}
function forOfBlockScope_31(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc8 = forOfBlockScope_33, forOfBlockScope._fe8 = forOfBlockScope_44;
      return M.jump(void 0, forOfBlockScope_32);
    case 1:
      return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_65);
    default:
      return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_65);
  }
}
function forOfBlockScope_32(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop8.exit) {
    forOfBlockScope._loop8.exit();
  }
  a = forOfBlockScope._fc8, b = forOfBlockScope._fe8, forOfBlockScope._loop8 = null, forOfBlockScope._fc8 = null, forOfBlockScope._fe8 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_33(forOfBlockScope) {
  forOfBlockScope._k2 = 0;
  return M.yldStar(M.yld(`fo25`), forOfBlockScope_34);
}
function forOfBlockScope_34(forOfBlockScope) {
  forOfBlockScope._loop9 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_66);
}
function f_113(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k2++;
  return M.yldStar(M.yld(`fo26: ${ctx._i} ${ctx._forOfBlockScope._k2} ${ctx._m}`), f_213);
}
function f_213(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_312, f_117);
}
function f_112(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo27 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k2} ${_ctx._f._m} ${_ctx._n}`), f_212);
}
function iter_112(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo28: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k2} ${_iter._f._m} ${_iter._f1._n}`), iter_212);
}
function iter_212(_iter) {
  return M.pure();
}
function iter_312(_iter, r) {
  return M.pure(r);
}
function f_212(_ctx) {
  if (_ctx._forOfBlockScope._k2 === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k2 === 5) {
      return M.pure(1);
    } else {
      if (_ctx._n === 3) {
        return M.pure(2);
      } else {
        if (_ctx._n === 5) {
          return M.pure(3);
        } else {
          _ctx._forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = _ctx._forOfBlockScope;
            _iter._f = _ctx._f;
            _iter._f1 = _ctx;
            return M.scope(iter_112);
          });
          return M.pure();
        }
      }
    }
  }
}
function f_311(_ctx, r) {
  return M.pure(r);
}
function f_312(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_112);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_44, f_117);
  } else {
    ctx._fc = f_64, ctx._fe = f_84, ctx._j = null;
    return M.jump(void 0, f_54);
  }
}
function f_44(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_93, ctx._fe = f_84, ctx._r = 0;
      return M.jump(void 0, f_54);
    case 0:
      ctx._fc = f_93, ctx._fe = f_84, ctx._r = 1;
      return M.jump(void 0, f_54);
    case 2:
      return M.jump(void 0, f_312, f_117);
    case 3:
      ctx._fc = f_64, ctx._fe = f_84;
      return M.jump(void 0, f_54);
    default:
      return M.jump(void 0, f_312, f_117);
  }
}
function f_54(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_64(ctx) {
  return M.pure();
}
function f_74(ctx, r) {
  return M.pure(r);
}
function f_84(ctx, e) {
  return M.raise(e);
}
function f_93(ctx) {
  var a;
  a = ctx._r, ctx._r = null;
  return M.jump(a, f_74);
}
function f_102(ctx) {
  return M.raise(ctx._err1);
}
function f_117(ctx, a) {
  ctx._fc = f_102, ctx._fe = f_84, ctx._err1 = a;
  return M.jump(void 0, f_54);
}
function forOfBlockScope_35(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop9 = forOfBlockScope._loop9.step()).done) {
    forOfBlockScope._i14 = forOfBlockScope._loop9.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_113);
    })(forOfBlockScope._i14);
    return M.yldStar(M.yldStar(a), forOfBlockScope_36, forOfBlockScope_66);
  } else {
    forOfBlockScope._fc9 = forOfBlockScope_38, forOfBlockScope._fe9 = forOfBlockScope_44, forOfBlockScope._i14 = null;
    return M.jump(void 0, forOfBlockScope_37);
  }
}
function forOfBlockScope_36(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc9 = forOfBlockScope_38, forOfBlockScope._fe9 = forOfBlockScope_44;
      return M.jump(void 0, forOfBlockScope_37);
    case 1:
      return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_66);
    default:
      return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_66);
  }
}
function forOfBlockScope_37(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop9.exit) {
    forOfBlockScope._loop9.exit();
  }
  a = forOfBlockScope._fc9, b = forOfBlockScope._fe9, forOfBlockScope._loop9 = null, forOfBlockScope._fc9 = null, forOfBlockScope._fe9 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_38(forOfBlockScope) {
  forOfBlockScope._k3 = 0;
  forOfBlockScope._loop10 = M.iterator(forOfBlockScope._a);
  forOfBlockScope._a = null;
  return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_67);
}
function f_115(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k3++;
  return M.yldStar(M.yld(`fo29: ${ctx._i} ${ctx._forOfBlockScope._k3} ${ctx._m}`), f_215);
}
function f_215(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_314, f_118);
}
function f_114(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo30 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k3} ${_ctx._f._m} ${_ctx._n}`), f_214);
}
function iter_113(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo31: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k3} ${_iter._f._m} ${_iter._f1._n}`), iter_213);
}
function iter_213(_iter) {
  return M.pure();
}
function iter_313(_iter, r) {
  return M.pure(r);
}
function f_214(_ctx) {
  if (_ctx._forOfBlockScope._k3 === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k3 === 5) {
      _ctx._loop = M.iterator(_ctx._forOfBlockScope._funs);
      return M.jump(void 0, f_313, f_94);
    } else {
      if (_ctx._n === 3) {
        return M.pure(2);
      } else {
        if (_ctx._n === 5) {
          return M.pure(3);
        } else {
          _ctx._forOfBlockScope._funs.push(function iter() {
            var _iter = M.context();
            _iter._forOfBlockScope = _ctx._forOfBlockScope;
            _iter._f = _ctx._f;
            _iter._f1 = _ctx;
            return M.scope(iter_113);
          });
          return M.pure();
        }
      }
    }
  }
}
function f_313(_ctx) {
  var a;
  if (!(_ctx._loop = _ctx._loop.step()).done) {
    _ctx._i = _ctx._loop.value;
    a = (0, _ctx._i)();
    return M.yldStar(M.yldStar(a), f_313, f_94);
  } else {
    _ctx._fc = f_55, _ctx._fe = f_75, _ctx._i = null;
    return M.jump(void 0, f_45);
  }
}
function f_45(_ctx) {
  var a, b;
  if (_ctx._loop.exit) {
    _ctx._loop.exit();
  }
  a = _ctx._fc, b = _ctx._fe, _ctx._loop = null, _ctx._fc = null, _ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_55(_ctx) {
  return M.pure((_ctx._forOfBlockScope._br = `r: ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k3} ${_ctx._f._m} ${_ctx._n}`, 1));
}
function f_65(_ctx, r) {
  return M.pure(r);
}
function f_75(_ctx, e) {
  return M.raise(e);
}
function f_85(_ctx) {
  return M.raise(_ctx._err1);
}
function f_94(_ctx, a) {
  _ctx._fc = f_85, _ctx._fe = f_75, _ctx._err1 = a;
  return M.jump(void 0, f_45);
}
function f_314(ctx) {
  var a;
  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;
    a = (j => {
      var _ctx = M.context();
      _ctx._j = j;
      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      return M.scope(f_114);
    })(ctx._j);
    return M.yldStar(M.yldStar(a), f_46, f_118);
  } else {
    ctx._fc = f_66, ctx._fe = f_86, ctx._j = null;
    return M.jump(void 0, f_56);
  }
}
function f_46(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_95, ctx._fe = f_86, ctx._r = 0;
      return M.jump(void 0, f_56);
    case 0:
      ctx._fc = f_95, ctx._fe = f_86, ctx._r = 1;
      return M.jump(void 0, f_56);
    case 2:
      return M.jump(void 0, f_314, f_118);
    case 3:
      ctx._fc = f_66, ctx._fe = f_86;
      return M.jump(void 0, f_56);
    default:
      return M.jump(void 0, f_314, f_118);
  }
}
function f_56(ctx) {
  var a, b;
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }
  a = ctx._fc, b = ctx._fe, ctx._loop = null, ctx._fc = null, ctx._fe = null;
  return M.jump(void 0, a, b);
}
function f_66(ctx) {
  return M.pure();
}
function f_76(ctx, r) {
  return M.pure(r);
}
function f_86(ctx, e) {
  return M.raise(e);
}
function f_95(ctx) {
  var a;
  a = ctx._r, ctx._r = null;
  return M.jump(a, f_76);
}
function f_103(ctx) {
  return M.raise(ctx._err1);
}
function f_118(ctx, a) {
  ctx._fc = f_103, ctx._fe = f_86, ctx._err1 = a;
  return M.jump(void 0, f_56);
}
function forOfBlockScope_39(forOfBlockScope) {
  var a;
  if (!(forOfBlockScope._loop10 = forOfBlockScope._loop10.step()).done) {
    forOfBlockScope._i15 = forOfBlockScope._loop10.value;
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      ctx._forOfBlockScope = forOfBlockScope;
      return M.scope(f_115);
    })(forOfBlockScope._i15);
    return M.yldStar(M.yldStar(a), forOfBlockScope_40, forOfBlockScope_67);
  } else {
    forOfBlockScope._fc10 = forOfBlockScope_42, forOfBlockScope._fe10 = forOfBlockScope_44, forOfBlockScope._i15 = null;
    return M.jump(void 0, forOfBlockScope_41);
  }
}
function forOfBlockScope_40(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc10 = forOfBlockScope_45, forOfBlockScope._fe10 = forOfBlockScope_44, forOfBlockScope._r = forOfBlockScope._br, forOfBlockScope._br = null;
      return M.jump(void 0, forOfBlockScope_41);
    case 1:
      return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_67);
    default:
      return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_67);
  }
}
function forOfBlockScope_41(forOfBlockScope) {
  var a, b;
  if (forOfBlockScope._loop10.exit) {
    forOfBlockScope._loop10.exit();
  }
  a = forOfBlockScope._fc10, b = forOfBlockScope._fe10, forOfBlockScope._loop10 = null, forOfBlockScope._fc10 = null, forOfBlockScope._fe10 = null;
  return M.jump(void 0, a, b);
}
function forOfBlockScope_42(forOfBlockScope) {
  return M.pure();
}
function forOfBlockScope_43(forOfBlockScope, r) {
  return M.pure(r);
}
function forOfBlockScope_44(forOfBlockScope, e) {
  return M.raise(e);
}
function forOfBlockScope_45(forOfBlockScope) {
  var a;
  a = forOfBlockScope._r, forOfBlockScope._r = null;
  return M.jump(a, forOfBlockScope_43);
}
function forOfBlockScope_46(forOfBlockScope) {
  return M.raise(forOfBlockScope._err1);
}
function forOfBlockScope_47(forOfBlockScope) {
  return M.raise(forOfBlockScope._err2);
}
function forOfBlockScope_48(forOfBlockScope) {
  return M.raise(forOfBlockScope._err3);
}
function forOfBlockScope_49(forOfBlockScope) {
  return M.raise(forOfBlockScope._err4);
}
function forOfBlockScope_50(forOfBlockScope) {
  return M.raise(forOfBlockScope._err5);
}
function forOfBlockScope_51(forOfBlockScope) {
  return M.raise(forOfBlockScope._err6);
}
function forOfBlockScope_52(forOfBlockScope) {
  return M.raise(forOfBlockScope._err7);
}
function forOfBlockScope_53(forOfBlockScope) {
  return M.raise(forOfBlockScope._err8);
}
function forOfBlockScope_54(forOfBlockScope) {
  return M.raise(forOfBlockScope._err9);
}
function forOfBlockScope_55(forOfBlockScope) {
  return M.raise(forOfBlockScope._err10);
}
function forOfBlockScope_56(forOfBlockScope) {
  return M.raise(forOfBlockScope._err11);
}
function forOfBlockScope_57(forOfBlockScope, a) {
  forOfBlockScope._fc = forOfBlockScope_46, forOfBlockScope._fe = forOfBlockScope_44, forOfBlockScope._err1 = a;
  return M.jump(void 0, forOfBlockScope_3);
}
function forOfBlockScope_58(forOfBlockScope, a) {
  forOfBlockScope._fc1 = forOfBlockScope_47, forOfBlockScope._fe1 = forOfBlockScope_44, forOfBlockScope._err2 = a;
  return M.jump(void 0, forOfBlockScope_6);
}
function forOfBlockScope_59(forOfBlockScope, a) {
  forOfBlockScope._fc2 = forOfBlockScope_48, forOfBlockScope._fe2 = forOfBlockScope_44, forOfBlockScope._err3 = a;
  return M.jump(void 0, forOfBlockScope_9);
}
function forOfBlockScope_60(forOfBlockScope, a) {
  forOfBlockScope._fc3 = forOfBlockScope_49, forOfBlockScope._fe3 = forOfBlockScope_44, forOfBlockScope._err4 = a;
  return M.jump(void 0, forOfBlockScope_12);
}
function forOfBlockScope_61(forOfBlockScope, a) {
  forOfBlockScope._fc4 = forOfBlockScope_50, forOfBlockScope._fe4 = forOfBlockScope_44, forOfBlockScope._err5 = a;
  return M.jump(void 0, forOfBlockScope_15);
}
function forOfBlockScope_62(forOfBlockScope, a) {
  forOfBlockScope._fc5 = forOfBlockScope_51, forOfBlockScope._fe5 = forOfBlockScope_44, forOfBlockScope._err6 = a;
  return M.jump(void 0, forOfBlockScope_19);
}
function forOfBlockScope_63(forOfBlockScope, a) {
  forOfBlockScope._fc6 = forOfBlockScope_52, forOfBlockScope._fe6 = forOfBlockScope_44, forOfBlockScope._err7 = a;
  return M.jump(void 0, forOfBlockScope_23);
}
function forOfBlockScope_64(forOfBlockScope, a) {
  forOfBlockScope._fc7 = forOfBlockScope_53, forOfBlockScope._fe7 = forOfBlockScope_44, forOfBlockScope._err8 = a;
  return M.jump(void 0, forOfBlockScope_27);
}
function forOfBlockScope_65(forOfBlockScope, a) {
  forOfBlockScope._fc8 = forOfBlockScope_54, forOfBlockScope._fe8 = forOfBlockScope_44, forOfBlockScope._err9 = a;
  return M.jump(void 0, forOfBlockScope_32);
}
function forOfBlockScope_66(forOfBlockScope, a) {
  forOfBlockScope._fc9 = forOfBlockScope_55, forOfBlockScope._fe9 = forOfBlockScope_44, forOfBlockScope._err10 = a;
  return M.jump(void 0, forOfBlockScope_37);
}
function forOfBlockScope_67(forOfBlockScope, a) {
  forOfBlockScope._fc10 = forOfBlockScope_56, forOfBlockScope._fe10 = forOfBlockScope_44, forOfBlockScope._err11 = a;
  return M.jump(void 0, forOfBlockScope_41);
}