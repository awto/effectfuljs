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
    yh2.$._j = yh2.$$._f._i += yh2.$._a;
    return M.chain(eff(), yh2_1);
  };
}),
    _meta$eh = M.meta(meta$yh2, $module, function ($$) {
  return function eh() {
    var _eh = M.context(),
        a;

    _eh.$$ = $$;
    a = _eh.$$._f._i += _eh.$$._yh2._j;
    return M.chain(eff(a), eh_1);
  };
}),
    meta$yh = M.meta(meta$f, $module, function ($$) {
  return function _yh(a) {
    var yh = M.context();
    yh._f = $$._f;
    yh._a = a;
    yh._j = yh._f._i += yh._a;
    return M.chain(eff(), yh_1);
  };
}),
    meta$eh = M.meta(meta$yh, $module, function ($$) {
  return function eh() {
    var f = $$.f,
        yh = $$.yh;
    f._i += yh._j;
  };
});

module.exports = M.exports(meta$f());

function yh2_1(yh2) {
  return _meta$eh({
    _f: yh2.$$._f,
    _yh2: yh2.$
  });
}

function eh_1(_eh) {}

function yh_1(yh) {
  return meta$eh({
    f: yh._f,
    yh: yh
  });
}