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
  var aa = M.context(),
      a;
  aa.V._$$ = $$;

  aa.V._cc = function _cc(b) {
    var cc = M.context(),
        a,
        c;
    cc.V._b = b;
    a = cc.C.V._$$.C.C.V._c;
    c = cc.C.V._$$.V._a;
    return cc.chain((0, cc.V._b)(a, c), _1);

    function _1(cc, a) {
      return cc.chain(eval(cc.preEval(a, 0)), _2);
    }

    function _2(cc, a) {
      return a;
    }
  };

  aa.V._cc2 = function _cc2(c) {
    var cc2 = M.context(),
        a,
        b;
    cc2.V._c = c;
    a = cc2.C.V._$$.C.V._b;
    b = cc2.C.V._$$.V._a;
    return cc2.chain((0, cc2.V._c)(a, b), _1);

    function _1(cc2, a) {
      return cc2.chain(cc2.eval(a, 0), _2);
    }

    function _2(cc2) {}
  };

  aa.V._bb = function _bb($$) {
    var bb = M.context(),
        a;
    bb.V._$$ = $$;

    bb.V._cc = function _cc(b) {
      var cc = M.context(),
          a;
      cc.V._b = b;

      if (cc.C.C.V._$$.V._a) {
        cc.V._a = something;
        return cc.chain(cc.eval(cc.V._a, 0), _1);
      } else {
        a = cc.C.C.V._$$.V._a;
        return cc.chain(cc.eval(a, 1), _1);
      }

      function _1(cc) {
        var a, b;
        a = cc.C.C.V._$$.C.C.V._c;
        b = cc.C.C.V._$$.V._a;
        return cc.chain((0, cc.V._b)(a, b), _2);
      }

      function _2(cc, a) {
        return cc.chain(cc.eval(a, 2), _3);
      }

      function _3(cc, a) {
        return a;
      }
    };

    a = bb.C.V._$$.C.V;
    return bb.chain(a._b(), _1);

    function _1(bb, a) {
      var b, c;
      b = bb.C.V._$$.C.C.V._c;
      c = bb.C.V._$$.V._a;
      a + b + c;
    }
  };

  a = aa.V._$$.C.V;
  return aa.chain(a._b(), _1);

  function _1(aa, a) {
    var b, c;
    b = aa.V._$$.C.C.V._c;
    c = aa.V._$$.V._a;
    a + b + c;
  }
}