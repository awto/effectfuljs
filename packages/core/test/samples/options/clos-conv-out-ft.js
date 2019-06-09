import * as M from "@effectful/core";

var $module = M.module("*", module),
    meta$f = M.meta($module, null, function (x) {
  return function (module, exports) {
    var ctx = M.context(x);
    ctx._yh = meta$yh({
      _f: ctx
    });
    ctx._yh2 = meta$yh2({
      _f: ctx.$
    });
    ctx._module = module;
    ctx._exports = exports;
    return M.scope(f_1);
  };
}),
    meta$yh2 = M.meta($module, meta$f, function (x) {
  return function _yh2(a) {
    var yh2 = M.context(x);
    yh2.$._a = a;
    return M.scope(yh2_1);
  };
}),
    _meta$eh = M.meta($module, meta$yh2, function (x) {
  return function eh() {
    var _eh = M.context(x);

    return M.scope(_eh_1);
  };
}),
    meta$yh = M.meta($module, meta$f, function (x) {
  return function _yh(a) {
    var yh = M.context(x);
    yh._f = x._f;
    yh._a = a;
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

module.exports = M.exports(meta$f());

function yh_1(yh) {
  yh._j = yh._f._i += yh._a;
  yh._a = null;
  return M.chain(eff(), yh_2);
}

function eh_1(_eh) {
  var a;
  a = _eh._f._i += _eh._yh._j;
  return M.chain(eff(a), eh_2);
}

function eh_2(_eh) {}

function yh_2(yh) {
  return meta$eh({
    _f: yh._f,
    _yh: yh
  });
}

function yh2_1(yh2) {
  yh2.$._j = yh2.$$._f._i += yh2.$._a;
  yh2.$._a = null;
  return M.chain(eff(), yh2_2);
}

function _eh_1(_eh) {
  var a;
  a = _eh.$$._f._i += _eh.$$._yh2._j;
  return M.chain(eff(a), _eh_2);
}

function _eh_2(_eh) {}

function yh2_2(yh2) {
  return _meta$eh({
    _f: yh2.$$._f,
    _yh2: yh2.$
  });
}

function f_1(ctx) {
  ctx._i = void 0;
  return M.chain(eff_top(), f_2);
}

function f_2(ctx) {}