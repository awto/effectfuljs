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

function _iter_1(_iter) {
  return M.yldStar(M.yld(`fo2: ${_iter._forOfBlockScope._i1} ${_iter._forOfBlockScope._j++}`), _iter_2);
}

function _iter_2(_iter) {
  return M.pure();
}

function iter_11(_iter) {
  return M.yldStar(M.yld(`fo3: ${_iter._f._i} ${_iter._f1._j++}`), iter_21);
}

function iter_21(_iter) {
  return M.pure();
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
  return M.jump(void 0, forOfBlockScope_2, forOfBlockScope_55);
}

function _f_1(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, _f_2, f_7);
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

function f_2(_ctx) {
  _ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return M.scope(iter_12);
  });

  return M.pure();
}

function _f_2(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_1);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), _f_2, f_7);
  } else {
    ctx._fc = f_4, ctx._fe = f_5;
    return M.jump(void 0, f_3);
  }
}

function f_3(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_4(ctx) {
  return M.pure();
}

function f_5(ctx, e) {
  return M.raise(e);
}

function f_6(ctx) {
  return M.raise(ctx._err1);
}

function f_7(ctx, a) {
  ctx._fc = f_6, ctx._fe = f_5, ctx._err1 = a;
  return M.jump(void 0, f_3);
}

function forOfBlockScope_2(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop = forOfBlockScope._loop.step()).done) {
    forOfBlockScope._i3 = forOfBlockScope._loop.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(_f_1);
    })(forOfBlockScope._i3);

    return M.yldStar(M.yldStar(a), forOfBlockScope_2, forOfBlockScope_55);
  } else {
    forOfBlockScope._fc = forOfBlockScope_4, forOfBlockScope._fe = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_3);
  }
}

function forOfBlockScope_3(forOfBlockScope) {
  if (forOfBlockScope._loop.exit) {
    forOfBlockScope._loop.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc, forOfBlockScope._fe);
}

function forOfBlockScope_4(forOfBlockScope) {
  forOfBlockScope._loop1 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_5, forOfBlockScope_56);
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

function forOfBlockScope_5(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop1 = forOfBlockScope._loop1.step()).done) {
    forOfBlockScope._i4 = forOfBlockScope._loop1.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_11);
    })(forOfBlockScope._i4);

    return M.yldStar(M.yldStar(a), forOfBlockScope_5, forOfBlockScope_56);
  } else {
    forOfBlockScope._fc1 = forOfBlockScope_7, forOfBlockScope._fe1 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_6);
  }
}

function forOfBlockScope_6(forOfBlockScope) {
  if (forOfBlockScope._loop1.exit) {
    forOfBlockScope._loop1.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc1, forOfBlockScope._fe1);
}

function forOfBlockScope_7(forOfBlockScope) {
  forOfBlockScope._loop2 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_8, forOfBlockScope_57);
}

function f_13(ctx) {
  return M.yldStar(M.yld(`fo8 ${ctx._i}`), f_23);
}

function f_23(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, _f_3, f_8);
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

function f_22(_ctx) {
  _ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return M.scope(iter_14);
  });

  return M.pure();
}

function _f_3(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_12);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), _f_3, f_8);
  } else {
    ctx._fc = _f_5, ctx._fe = _f_6;
    return M.jump(void 0, _f_4);
  }
}

function _f_4(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function _f_5(ctx) {
  return M.pure();
}

function _f_6(ctx, e) {
  return M.raise(e);
}

function _f_7(ctx) {
  return M.raise(ctx._err1);
}

function f_8(ctx, a) {
  ctx._fc = _f_7, ctx._fe = _f_6, ctx._err1 = a;
  return M.jump(void 0, _f_4);
}

function forOfBlockScope_8(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop2 = forOfBlockScope._loop2.step()).done) {
    forOfBlockScope._i5 = forOfBlockScope._loop2.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_13);
    })(forOfBlockScope._i5);

    return M.yldStar(M.yldStar(a), forOfBlockScope_8, forOfBlockScope_57);
  } else {
    forOfBlockScope._fc2 = forOfBlockScope_10, forOfBlockScope._fe2 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_9);
  }
}

function forOfBlockScope_9(forOfBlockScope) {
  if (forOfBlockScope._loop2.exit) {
    forOfBlockScope._loop2.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc2, forOfBlockScope._fe2);
}

function forOfBlockScope_10(forOfBlockScope) {
  forOfBlockScope._loop3 = M.iterator(forOfBlockScope._funs);
  return M.jump(void 0, forOfBlockScope_11, forOfBlockScope_58);
}

function forOfBlockScope_11(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop3 = forOfBlockScope._loop3.step()).done) {
    forOfBlockScope._i6 = forOfBlockScope._loop3.value;
    a = forOfBlockScope._i6();
    return M.yldStar(M.yldStar(a), forOfBlockScope_11, forOfBlockScope_58);
  } else {
    forOfBlockScope._fc3 = forOfBlockScope_13, forOfBlockScope._fe3 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_12);
  }
}

function forOfBlockScope_12(forOfBlockScope) {
  if (forOfBlockScope._loop3.exit) {
    forOfBlockScope._loop3.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc3, forOfBlockScope._fe3);
}

function iter_15(_iter) {
  return M.yldStar(M.yld(`fo11: ${_iter._f._i}`), iter_25);
}

function iter_25(_iter) {
  return M.pure();
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
  return M.jump(void 0, forOfBlockScope_14, forOfBlockScope_59);
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

function f_24(ctx) {
  ctx._forOfBlockScope._funs.push(function iter() {
    var _iter = M.context();

    _iter._f = ctx;
    return M.scope(iter_16);
  });

  return M.pure();
}

function forOfBlockScope_14(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop4 = forOfBlockScope._loop4.step()).done) {
    forOfBlockScope._i8 = forOfBlockScope._loop4.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_14);
    })(forOfBlockScope._i8);

    return M.yldStar(M.yldStar(a), forOfBlockScope_14, forOfBlockScope_59);
  } else {
    forOfBlockScope._fc4 = forOfBlockScope_16, forOfBlockScope._fe4 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_15);
  }
}

function forOfBlockScope_15(forOfBlockScope) {
  if (forOfBlockScope._loop4.exit) {
    forOfBlockScope._loop4.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc4, forOfBlockScope._fe4);
}

function forOfBlockScope_16(forOfBlockScope) {
  forOfBlockScope._k = 0;
  forOfBlockScope._loop5 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_60);
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

function f_25(ctx) {
  ctx._m = ctx._forOfBlockScope._k;
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

      return M.pure(ctx._r);
    }
  }
}

function forOfBlockScope_17(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop5 = forOfBlockScope._loop5.step()).done) {
    forOfBlockScope._i9 = forOfBlockScope._loop5.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_15);
    })(forOfBlockScope._i9);

    return M.yldStar(M.yldStar(a), forOfBlockScope_18, forOfBlockScope_60);
  } else {
    forOfBlockScope._fc5 = forOfBlockScope_20, forOfBlockScope._fe5 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_19);
  }
}

function forOfBlockScope_18(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_60);

    case 1:
      forOfBlockScope._fc5 = forOfBlockScope_20, forOfBlockScope._fe5 = forOfBlockScope_43;
      return M.jump(void 0, forOfBlockScope_19);

    default:
      return M.jump(void 0, forOfBlockScope_17, forOfBlockScope_60);
  }
}

function forOfBlockScope_19(forOfBlockScope) {
  if (forOfBlockScope._loop5.exit) {
    forOfBlockScope._loop5.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc5, forOfBlockScope._fe5);
}

function iter_18(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo18: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_28);
}

function iter_28(_iter) {
  return M.pure();
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
  return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_61);
}

function f_17(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k++;
  return M.yldStar(M.yld(`fo16: ${ctx._i} ${ctx._forOfBlockScope._k} ${ctx._m}`), f_26);
}

function f_26(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_31, f_9);
}

function iter_19(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo18: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_29);
}

function iter_29(_iter) {
  return M.pure();
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

          return M.pure(_ctx._r);
        }
      }
    }
  }
}

function f_31(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_16);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), f_41, f_9);
  } else {
    ctx._fc = f_61, ctx._fe = f_71;
    return M.jump(void 0, f_51);
  }
}

function f_41(ctx, a) {
  switch (a) {
    case 0:
      ctx._fc = f_61, ctx._fe = f_71, ctx._r = 0;
      return M.jump(void 0, f_51);

    case 1:
      ctx._fc = f_61, ctx._fe = f_71, ctx._r = 1;
      return M.jump(void 0, f_51);

    case 2:
      return M.jump(void 0, f_31, f_9);

    case 3:
      ctx._fc = f_61, ctx._fe = f_71;
      return M.jump(void 0, f_51);

    default:
      return M.jump(void 0, f_31, f_9);
  }
}

function f_51(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_61(ctx) {
  return M.pure(ctx._r);
}

function f_71(ctx, e) {
  return M.raise(e);
}

function _f_8(ctx) {
  return M.raise(ctx._err1);
}

function f_9(ctx, a) {
  ctx._fc = _f_8, ctx._fe = f_71, ctx._err1 = a;
  return M.jump(void 0, f_51);
}

function forOfBlockScope_21(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop6 = forOfBlockScope._loop6.step()).done) {
    forOfBlockScope._i11 = forOfBlockScope._loop6.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_17);
    })(forOfBlockScope._i11);

    return M.yldStar(M.yldStar(a), forOfBlockScope_22, forOfBlockScope_61);
  } else {
    forOfBlockScope._fc6 = forOfBlockScope_24, forOfBlockScope._fe6 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_23);
  }
}

function forOfBlockScope_22(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_61);

    case 1:
      forOfBlockScope._fc6 = forOfBlockScope_24, forOfBlockScope._fe6 = forOfBlockScope_43;
      return M.jump(void 0, forOfBlockScope_23);

    default:
      return M.jump(void 0, forOfBlockScope_21, forOfBlockScope_61);
  }
}

function forOfBlockScope_23(forOfBlockScope) {
  if (forOfBlockScope._loop6.exit) {
    forOfBlockScope._loop6.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc6, forOfBlockScope._fe6);
}

function forOfBlockScope_24(forOfBlockScope) {
  forOfBlockScope._k = 0;
  forOfBlockScope._loop7 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_62);
}

function f_19(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k++;
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_28, f_81);
}

function f_18(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo19 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k} ${_ctx._f._m} ${_ctx._n}`), f_27);
}

function iter_110(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo20: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k} ${_iter._f._m} ${_iter._f1._n}`), iter_210);
}

function iter_210(_iter) {
  return M.pure();
}

function f_27(_ctx) {
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

          return M.pure(_ctx._r);
        }
      }
    }
  }
}

function f_28(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_18);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), f_32, f_81);
  } else {
    ctx._fc = f_52, ctx._fe = f_62;
    return M.jump(void 0, f_42);
  }
}

function f_32(ctx, a) {
  switch (a) {
    case 0:
      ctx._fc = f_52, ctx._fe = f_62, ctx._r = 0;
      return M.jump(void 0, f_42);

    case 1:
      ctx._fc = f_52, ctx._fe = f_62, ctx._r = 1;
      return M.jump(void 0, f_42);

    case 2:
      return M.jump(void 0, f_28, f_81);

    case 3:
      ctx._fc = f_52, ctx._fe = f_62;
      return M.jump(void 0, f_42);

    default:
      return M.jump(void 0, f_28, f_81);
  }
}

function f_42(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_52(ctx) {
  return M.pure(ctx._r);
}

function f_62(ctx, e) {
  return M.raise(e);
}

function f_72(ctx) {
  return M.raise(ctx._err1);
}

function f_81(ctx, a) {
  ctx._fc = f_72, ctx._fe = f_62, ctx._err1 = a;
  return M.jump(void 0, f_42);
}

function forOfBlockScope_25(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop7 = forOfBlockScope._loop7.step()).done) {
    forOfBlockScope._i12 = forOfBlockScope._loop7.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_19);
    })(forOfBlockScope._i12);

    return M.yldStar(M.yldStar(a), forOfBlockScope_26, forOfBlockScope_62);
  } else {
    forOfBlockScope._fc7 = forOfBlockScope_28, forOfBlockScope._fe7 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_27);
  }
}

function forOfBlockScope_26(forOfBlockScope, a) {
  switch (a) {
    case 0:
      return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_62);

    case 1:
      forOfBlockScope._fc7 = forOfBlockScope_28, forOfBlockScope._fe7 = forOfBlockScope_43;
      return M.jump(void 0, forOfBlockScope_27);

    default:
      return M.jump(void 0, forOfBlockScope_25, forOfBlockScope_62);
  }
}

function forOfBlockScope_27(forOfBlockScope) {
  if (forOfBlockScope._loop7.exit) {
    forOfBlockScope._loop7.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc7, forOfBlockScope._fe7);
}

function forOfBlockScope_28(forOfBlockScope) {
  forOfBlockScope._k1 = 0;
  return M.yldStar(M.yld(`fo21: ${forOfBlockScope._i1} ${forOfBlockScope._k1}`), forOfBlockScope_29);
}

function forOfBlockScope_29(forOfBlockScope) {
  forOfBlockScope._loop8 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_63);
}

function f_111(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k1++;
  return M.yldStar(M.yld(`fo22: ${ctx._i} ${ctx._forOfBlockScope._k1} ${ctx._m}`), f_210);
}

function f_210(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_33, _f_9);
}

function f_110(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo23 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k1} ${_ctx._f._m} ${_ctx._n}`), f_29);
}

function iter_111(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo24: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k1} ${_iter._f._m} ${_iter._f1._n}`), iter_211);
}

function iter_211(_iter) {
  return M.pure();
}

function f_29(_ctx) {
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

          return M.pure(_ctx._r);
        }
      }
    }
  }
}

function f_33(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_110);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), f_43, _f_9);
  } else {
    ctx._fc = f_63, ctx._fe = f_73;
    return M.jump(void 0, f_53);
  }
}

function f_43(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_63, ctx._fe = f_73, ctx._r = 0;
      return M.jump(void 0, f_53);

    case 0:
      ctx._fc = f_63, ctx._fe = f_73, ctx._r = 1;
      return M.jump(void 0, f_53);

    case 2:
      return M.jump(void 0, f_33, _f_9);

    case 3:
      ctx._fc = f_63, ctx._fe = f_73;
      return M.jump(void 0, f_53);

    default:
      return M.jump(void 0, f_33, _f_9);
  }
}

function f_53(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_63(ctx) {
  return M.pure(ctx._r);
}

function f_73(ctx, e) {
  return M.raise(e);
}

function f_82(ctx) {
  return M.raise(ctx._err1);
}

function _f_9(ctx, a) {
  ctx._fc = f_82, ctx._fe = f_73, ctx._err1 = a;
  return M.jump(void 0, f_53);
}

function forOfBlockScope_30(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop8 = forOfBlockScope._loop8.step()).done) {
    forOfBlockScope._i13 = forOfBlockScope._loop8.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_111);
    })(forOfBlockScope._i13);

    return M.yldStar(M.yldStar(a), forOfBlockScope_31, forOfBlockScope_63);
  } else {
    forOfBlockScope._fc8 = forOfBlockScope_33, forOfBlockScope._fe8 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_32);
  }
}

function forOfBlockScope_31(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc8 = forOfBlockScope_33, forOfBlockScope._fe8 = forOfBlockScope_43;
      return M.jump(void 0, forOfBlockScope_32);

    case 1:
      return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_63);

    default:
      return M.jump(void 0, forOfBlockScope_30, forOfBlockScope_63);
  }
}

function forOfBlockScope_32(forOfBlockScope) {
  if (forOfBlockScope._loop8.exit) {
    forOfBlockScope._loop8.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc8, forOfBlockScope._fe8);
}

function forOfBlockScope_33(forOfBlockScope) {
  forOfBlockScope._k2 = 0;
  return M.yldStar(M.yld(`fo25`), forOfBlockScope_34);
}

function forOfBlockScope_34(forOfBlockScope) {
  forOfBlockScope._loop9 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_64);
}

function f_113(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k2++;
  return M.yldStar(M.yld(`fo26: ${ctx._i} ${ctx._forOfBlockScope._k2} ${ctx._m}`), f_212);
}

function f_212(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_34, f_91);
}

function f_112(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo27 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k2} ${_ctx._f._m} ${_ctx._n}`), f_211);
}

function iter_112(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo28: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k2} ${_iter._f._m} ${_iter._f1._n}`), iter_212);
}

function iter_212(_iter) {
  return M.pure();
}

function f_211(_ctx) {
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

          return M.pure(_ctx._r);
        }
      }
    }
  }
}

function f_34(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_112);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), f_44, f_91);
  } else {
    ctx._fc = f_64, ctx._fe = f_74;
    return M.jump(void 0, f_54);
  }
}

function f_44(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_64, ctx._fe = f_74, ctx._r = 0;
      return M.jump(void 0, f_54);

    case 0:
      ctx._fc = f_64, ctx._fe = f_74, ctx._r = 1;
      return M.jump(void 0, f_54);

    case 2:
      return M.jump(void 0, f_34, f_91);

    case 3:
      ctx._fc = f_64, ctx._fe = f_74;
      return M.jump(void 0, f_54);

    default:
      return M.jump(void 0, f_34, f_91);
  }
}

function f_54(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_64(ctx) {
  return M.pure(ctx._r);
}

function f_74(ctx, e) {
  return M.raise(e);
}

function f_83(ctx) {
  return M.raise(ctx._err1);
}

function f_91(ctx, a) {
  ctx._fc = f_83, ctx._fe = f_74, ctx._err1 = a;
  return M.jump(void 0, f_54);
}

function forOfBlockScope_35(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop9 = forOfBlockScope._loop9.step()).done) {
    forOfBlockScope._i14 = forOfBlockScope._loop9.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_113);
    })(forOfBlockScope._i14);

    return M.yldStar(M.yldStar(a), forOfBlockScope_36, forOfBlockScope_64);
  } else {
    forOfBlockScope._fc9 = forOfBlockScope_38, forOfBlockScope._fe9 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_37);
  }
}

function forOfBlockScope_36(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc9 = forOfBlockScope_38, forOfBlockScope._fe9 = forOfBlockScope_43;
      return M.jump(void 0, forOfBlockScope_37);

    case 1:
      return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_64);

    default:
      return M.jump(void 0, forOfBlockScope_35, forOfBlockScope_64);
  }
}

function forOfBlockScope_37(forOfBlockScope) {
  if (forOfBlockScope._loop9.exit) {
    forOfBlockScope._loop9.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc9, forOfBlockScope._fe9);
}

function forOfBlockScope_38(forOfBlockScope) {
  forOfBlockScope._k3 = 0;
  forOfBlockScope._loop10 = M.iterator(forOfBlockScope._a);
  return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_65);
}

function f_115(ctx) {
  ctx._m = 0;
  ctx._forOfBlockScope._k3++;
  return M.yldStar(M.yld(`fo29: ${ctx._i} ${ctx._forOfBlockScope._k3} ${ctx._m}`), f_214);
}

function f_214(ctx) {
  ctx._loop = M.iterator(ctx._forOfBlockScope._b);
  return M.jump(void 0, f_36, f_92);
}

function f_114(_ctx) {
  _ctx._n = _ctx._f._m;
  _ctx._f._m++;
  return M.yldStar(M.yld(`fo30 ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k3} ${_ctx._f._m} ${_ctx._n}`), f_213);
}

function iter_113(_iter) {
  _iter._f1._n++;
  return M.yldStar(M.yld(`fo31: ${_iter._f._i} ${_iter._f1._j} ${_iter._forOfBlockScope._k3} ${_iter._f._m} ${_iter._f1._n}`), iter_213);
}

function iter_213(_iter) {
  return M.pure();
}

function f_213(_ctx) {
  if (_ctx._forOfBlockScope._k3 === 3) {
    return M.pure(0);
  } else {
    if (_ctx._forOfBlockScope._k3 === 5) {
      _ctx._loop = M.iterator(_ctx._forOfBlockScope._funs);
      return M.jump(void 0, f_35, f_84);
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

          return M.pure(_ctx._r);
        }
      }
    }
  }
}

function f_35(_ctx) {
  var a;

  if (!(_ctx._loop = _ctx._loop.step()).done) {
    _ctx._i = _ctx._loop.value;
    a = _ctx._i();
    return M.yldStar(M.yldStar(a), f_35, f_84);
  } else {
    _ctx._fc = f_55, _ctx._fe = f_65;
    return M.jump(void 0, f_45);
  }
}

function f_45(_ctx) {
  if (_ctx._loop.exit) {
    _ctx._loop.exit();
  }

  return M.jump(void 0, _ctx._fc, _ctx._fe);
}

function f_55(_ctx) {
  return M.pure((_ctx._forOfBlockScope._br = `r: ${_ctx._f._i} ${_ctx._j} ${_ctx._forOfBlockScope._k3} ${_ctx._f._m} ${_ctx._n}`, 1));
}

function f_65(_ctx, e) {
  return M.raise(e);
}

function f_75(_ctx) {
  return M.raise(_ctx._err1);
}

function f_84(_ctx, a) {
  _ctx._fc = f_75, _ctx._fe = f_65, _ctx._err1 = a;
  return M.jump(void 0, f_45);
}

function f_36(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._forOfBlockScope = ctx._forOfBlockScope;
      _ctx._f = ctx;
      _ctx._j = j;
      return M.scope(f_114);
    })(ctx._j);

    return M.yldStar(M.yldStar(a), f_46, f_92);
  } else {
    ctx._fc = f_66, ctx._fe = f_76;
    return M.jump(void 0, f_56);
  }
}

function f_46(ctx, a) {
  switch (a) {
    case 1:
      ctx._fc = f_66, ctx._fe = f_76, ctx._r = 0;
      return M.jump(void 0, f_56);

    case 0:
      ctx._fc = f_66, ctx._fe = f_76, ctx._r = 1;
      return M.jump(void 0, f_56);

    case 2:
      return M.jump(void 0, f_36, f_92);

    case 3:
      ctx._fc = f_66, ctx._fe = f_76;
      return M.jump(void 0, f_56);

    default:
      return M.jump(void 0, f_36, f_92);
  }
}

function f_56(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return M.jump(void 0, ctx._fc, ctx._fe);
}

function f_66(ctx) {
  return M.pure(ctx._r);
}

function f_76(ctx, e) {
  return M.raise(e);
}

function f_85(ctx) {
  return M.raise(ctx._err1);
}

function f_92(ctx, a) {
  ctx._fc = f_85, ctx._fe = f_76, ctx._err1 = a;
  return M.jump(void 0, f_56);
}

function forOfBlockScope_39(forOfBlockScope) {
  var a;

  if (!(forOfBlockScope._loop10 = forOfBlockScope._loop10.step()).done) {
    forOfBlockScope._i15 = forOfBlockScope._loop10.value;

    a = (i => {
      var ctx = M.context();
      ctx._forOfBlockScope = forOfBlockScope;
      ctx._i = i;
      return M.scope(f_115);
    })(forOfBlockScope._i15);

    return M.yldStar(M.yldStar(a), forOfBlockScope_40, forOfBlockScope_65);
  } else {
    forOfBlockScope._fc10 = forOfBlockScope_42, forOfBlockScope._fe10 = forOfBlockScope_43;
    return M.jump(void 0, forOfBlockScope_41);
  }
}

function forOfBlockScope_40(forOfBlockScope, a) {
  switch (a) {
    case 0:
      forOfBlockScope._fc10 = forOfBlockScope_42, forOfBlockScope._fe10 = forOfBlockScope_43, forOfBlockScope._r = forOfBlockScope._br;
      return M.jump(void 0, forOfBlockScope_41);

    case 1:
      return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_65);

    default:
      return M.jump(void 0, forOfBlockScope_39, forOfBlockScope_65);
  }
}

function forOfBlockScope_41(forOfBlockScope) {
  if (forOfBlockScope._loop10.exit) {
    forOfBlockScope._loop10.exit();
  }

  return M.jump(void 0, forOfBlockScope._fc10, forOfBlockScope._fe10);
}

function forOfBlockScope_42(forOfBlockScope) {
  return M.pure(forOfBlockScope._r);
}

function forOfBlockScope_43(forOfBlockScope, e) {
  return M.raise(e);
}

function forOfBlockScope_44(forOfBlockScope) {
  return M.raise(forOfBlockScope._err1);
}

function forOfBlockScope_45(forOfBlockScope) {
  return M.raise(forOfBlockScope._err2);
}

function forOfBlockScope_46(forOfBlockScope) {
  return M.raise(forOfBlockScope._err3);
}

function forOfBlockScope_47(forOfBlockScope) {
  return M.raise(forOfBlockScope._err4);
}

function forOfBlockScope_48(forOfBlockScope) {
  return M.raise(forOfBlockScope._err5);
}

function forOfBlockScope_49(forOfBlockScope) {
  return M.raise(forOfBlockScope._err6);
}

function forOfBlockScope_50(forOfBlockScope) {
  return M.raise(forOfBlockScope._err7);
}

function forOfBlockScope_51(forOfBlockScope) {
  return M.raise(forOfBlockScope._err8);
}

function forOfBlockScope_52(forOfBlockScope) {
  return M.raise(forOfBlockScope._err9);
}

function forOfBlockScope_53(forOfBlockScope) {
  return M.raise(forOfBlockScope._err10);
}

function forOfBlockScope_54(forOfBlockScope) {
  return M.raise(forOfBlockScope._err11);
}

function forOfBlockScope_55(forOfBlockScope, a) {
  forOfBlockScope._fc = forOfBlockScope_44, forOfBlockScope._fe = forOfBlockScope_43, forOfBlockScope._err1 = a;
  return M.jump(void 0, forOfBlockScope_3);
}

function forOfBlockScope_56(forOfBlockScope, a) {
  forOfBlockScope._fc1 = forOfBlockScope_45, forOfBlockScope._fe1 = forOfBlockScope_43, forOfBlockScope._err2 = a;
  return M.jump(void 0, forOfBlockScope_6);
}

function forOfBlockScope_57(forOfBlockScope, a) {
  forOfBlockScope._fc2 = forOfBlockScope_46, forOfBlockScope._fe2 = forOfBlockScope_43, forOfBlockScope._err3 = a;
  return M.jump(void 0, forOfBlockScope_9);
}

function forOfBlockScope_58(forOfBlockScope, a) {
  forOfBlockScope._fc3 = forOfBlockScope_47, forOfBlockScope._fe3 = forOfBlockScope_43, forOfBlockScope._err4 = a;
  return M.jump(void 0, forOfBlockScope_12);
}

function forOfBlockScope_59(forOfBlockScope, a) {
  forOfBlockScope._fc4 = forOfBlockScope_48, forOfBlockScope._fe4 = forOfBlockScope_43, forOfBlockScope._err5 = a;
  return M.jump(void 0, forOfBlockScope_15);
}

function forOfBlockScope_60(forOfBlockScope, a) {
  forOfBlockScope._fc5 = forOfBlockScope_49, forOfBlockScope._fe5 = forOfBlockScope_43, forOfBlockScope._err6 = a;
  return M.jump(void 0, forOfBlockScope_19);
}

function forOfBlockScope_61(forOfBlockScope, a) {
  forOfBlockScope._fc6 = forOfBlockScope_50, forOfBlockScope._fe6 = forOfBlockScope_43, forOfBlockScope._err7 = a;
  return M.jump(void 0, forOfBlockScope_23);
}

function forOfBlockScope_62(forOfBlockScope, a) {
  forOfBlockScope._fc7 = forOfBlockScope_51, forOfBlockScope._fe7 = forOfBlockScope_43, forOfBlockScope._err8 = a;
  return M.jump(void 0, forOfBlockScope_27);
}

function forOfBlockScope_63(forOfBlockScope, a) {
  forOfBlockScope._fc8 = forOfBlockScope_52, forOfBlockScope._fe8 = forOfBlockScope_43, forOfBlockScope._err9 = a;
  return M.jump(void 0, forOfBlockScope_32);
}

function forOfBlockScope_64(forOfBlockScope, a) {
  forOfBlockScope._fc9 = forOfBlockScope_53, forOfBlockScope._fe9 = forOfBlockScope_43, forOfBlockScope._err10 = a;
  return M.jump(void 0, forOfBlockScope_37);
}

function forOfBlockScope_65(forOfBlockScope, a) {
  forOfBlockScope._fc10 = forOfBlockScope_54, forOfBlockScope._fe10 = forOfBlockScope_43, forOfBlockScope._err11 = a;
  return M.jump(void 0, forOfBlockScope_41);
}