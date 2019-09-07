import * as M from "@effectful/core";

var $module = M.module("*"),
    v_1 = [{
  cc: "_cc",
  cc2: "_cc2",
  bb: "_bb"
}, null],
    v_2 = [{
  $$: "_$$",
  cc: "_cc"
}, v_1],
    v_3 = [{
  b: "_b"
}, v_2],
    meta$aa = M.meta($module, []),
    meta$bb = M.meta($module, []),
    _meta$cc = M.meta($module, [[[{
  b: "_b",
  a: "_a"
}, v_2]], [v_3], [v_3]]),
    meta$cc2 = M.meta($module, [[[{
  c: "_c"
}, v_1]]]),
    meta$cc = M.meta($module, [[[{
  b: "_b"
}, v_1]]]);

function aa($$) {
  var aa = M.context();
  aa.V._$$ = $$;

  aa.V._cc = function _cc(b) {
    var cc = M.context();
    cc.V._b = b;
    return cc.scope(cc_1);
  };

  aa.V._cc2 = function _cc2(c) {
    var cc2 = M.context();
    cc2.V._c = c;
    return cc2.scope(cc2_1);
  };

  aa.V._bb = function _bb($$) {
    var bb = M.context();
    bb.V._$$ = $$;

    bb.V._cc = function _cc(b) {
      var cc = M.context();
      cc.V._b = b;
      return cc.scope(_cc_1);
    };

    return bb.scope(bb_1);
  };

  return aa.scope(aa_1);
}

function cc_1(cc) {
  var a, b, c;
  a = cc.C.V._$$.C.C.V._c;
  b = cc.C.V._$$.V._a;
  c = cc.V._b, cc.V._b = null;
  return cc.chain(c(a, b), cc_2);
}

function cc_2(cc, a) {
  return cc.chain(eval(cc.preEval(a, 0)), cc_3);
}

function cc_3(cc, a) {
  return a;
}

function cc2_1(cc2) {
  var a, b, c;
  a = cc2.C.V._$$.C.V._b;
  b = cc2.C.V._$$.V._a;
  c = cc2.V._c, cc2.V._c = null;
  return cc2.chain(c(a, b), cc2_2);
}

function cc2_2(cc2, a) {
  return cc2.chain(cc2.eval(a, 0), cc2_3);
}

function cc2_3(cc2) {}

function _cc_1(cc) {
  var a, b;

  if (cc.C.C.V._$$.V._a) {
    cc.V._a = something;
    b = cc.V._a, cc.V._a = null;
    return cc.chain(cc.eval(b, 0), _cc_2);
  } else {
    a = cc.C.C.V._$$.V._a;
    cc.V._a = null;
    return cc.chain(cc.eval(a, 1), _cc_2);
  }
}

function _cc_2(cc) {
  var a, b, c;
  a = cc.C.C.V._$$.C.C.V._c;
  b = cc.C.C.V._$$.V._a;
  c = cc.V._b, cc.V._b = null;
  return cc.chain(c(a, b), _cc_3);
}

function _cc_3(cc, a) {
  return cc.chain(cc.eval(a, 2), cc_4);
}

function cc_4(cc, a) {
  return a;
}

function bb_1(bb) {
  var a;
  a = bb.C.V._$$.C.V;
  return bb.chain(a._b(), bb_2);
}

function bb_2(bb, a) {
  var b, c;
  b = bb.C.V._$$.C.C.V._c;
  c = bb.C.V._$$.V._a;
  a + b + c;
}

function aa_1(aa) {
  var a;
  a = aa.V._$$.C.V;
  return aa.chain(a._b(), aa_2);
}

function aa_2(aa, a) {
  var b, c;
  b = aa.V._$$.C.C.V._c;
  c = aa.V._$$.V._a;
  a + b + c;
}