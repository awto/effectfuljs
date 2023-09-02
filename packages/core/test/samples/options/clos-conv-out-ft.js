import * as M from "@effectful/core";
var $module = M.module("*", module),
  meta$f = M.meta($module, null, function (x) {
    return function f(module, exports) {
      var ctx = M.context(x);
      ctx._module = module;
      ctx._exports = exports;
      ctx._yh = meta$yh({
        _f: ctx
      });
      ctx._yh2 = meta$yh2({
        _f: ctx
      });
      {
        return M.scope(f_1);
      }
    };
  }),
  meta$yh2 = M.meta($module, meta$f, function (x) {
    return function yh2(a) {
      var _yh2 = M.context(x);
      _yh2.$._a = a;
      _yh2.$$._f = x._f;
      return M.scope(yh2_1);
    };
  }),
  _meta$eh = M.meta($module, meta$yh2, function (x) {
    return function eh() {
      var _eh = M.context(x);
      _eh.$$._f = x._f;
      return M.scope(_eh_1);
    };
  }),
  meta$yh = M.meta($module, meta$f, function (x) {
    return function yh(a) {
      var _yh = M.context(x);
      _yh._a = a;
      _yh._f = x._f;
      return M.scope(yh_1);
    };
  }),
  meta$eh = M.meta($module, meta$yh, function (x) {
    return function eh() {
      var _eh = M.context(x);
      _eh._f = x._f;
      _eh._yh = x._yh;
      return M.scope(eh_1);
    };
  });
module.exports = M.wrapExport(meta$f());
function yh_1(_yh) {
  _yh._j = _yh._f._i += _yh._a;
  _yh._a = null;
  return M.chain(eff(), yh_2);
}
function eh_1(_eh) {
  var a;
  a = _eh._f._i += _eh._yh._j;
  return M.chain(eff(a), eh_2);
}
function eh_2(_eh) {}
function yh_2(_yh) {
  return meta$eh({
    _f: _yh._f,
    _yh: _yh
  });
}
function yh2_1(_yh2) {
  _yh2.$._j = _yh2.$$._f._i += _yh2.$._a;
  _yh2.$._a = null;
  return M.chain(eff(), yh2_2);
}
function _eh_1(_eh) {
  var a;
  a = _eh.$$._f._i += _eh.$$._yh2._j;
  return M.chain(eff(a), _eh_2);
}
function _eh_2(_eh) {}
function yh2_2(_yh2) {
  return _meta$eh({
    _f: _yh2.$$._f,
    _yh2: _yh2.$
  });
}
function f_1(ctx) {
  ctx._i = void 0;
  return M.chain(eff_top(), f_2);
}
function f_2(ctx) {}