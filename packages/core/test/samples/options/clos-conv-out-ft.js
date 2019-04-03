import * as M from "@effectful/core";

var $module = M.module("*"),
    meta$f = M.meta(null, $module, function ($$) {
  return function (module, exports) {
    var yh = meta$yh({
      _f: ctx
    }),
        yh2 = meta$yh2({
      _f: ctx.$
    }),
        ctx = {};
    ctx._i = void 0;
  };
}),
    meta$yh2 = M.meta(meta$f, $module, function ($$) {
  return function _yh2(a) {
    var yh2 = M.context();
    yh2.$$ = $$;
    yh2.$._a = a;
    return M.scope(yh2_1);
  };
}),
    _meta$eh = M.meta(meta$yh2, $module, function ($$) {
  return function eh() {
    var _eh = M.context();

    _eh.$$ = $$;
    return M.scope(eh_1);
  };
}),
    meta$yh = M.meta(meta$f, $module, function ($$) {
  return function _yh(a) {
    var yh = M.context();
    yh._f = $$._f;
    yh._a = a;
    return M.scope(yh_1);
  };
}),
    meta$eh = M.meta(meta$yh, $module, function ($$) {
  return function eh() {
    var _eh = {},
        f = $$.f,
        yh = $$.yh;
    f._i += yh._j;
  };
});

module.exports = M.exports(meta$f());

function yh2_1(yh2) {
  yh2.$._j = yh2.$$._f._i += yh2.$._a;
  yh2.$._a = null;
  return M.chain(eff(), yh2_2);
}

function yh2_2(yh2) {
  return _meta$eh({
    _f: yh2.$$._f,
    _yh2: yh2.$
  });
}

function eh_1(_eh) {
  var a;
  a = _eh.$$._f._i += _eh.$$._yh2._j;
  return M.chain(eff(a), eh_2);
}

function eh_2(_eh) {}

function yh_1(yh) {
  yh._j = yh._f._i += yh._a;
  yh._a = null;
  return M.chain(eff(), yh_2);
}

function yh_2(yh) {
  return meta$eh({
    f: yh._f,
    yh: yh
  });
}