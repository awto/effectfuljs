import * as M from "@effectful/core";

var $module = M.module("*"),
    v_1 = [{
  $$: "_$$",
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
    return cc.chain((0, cc.V._b)(cc.C.C.C.C.V._c, cc.C.C.V._a), _1);

    function _1(cc, a) {
      return cc.chain(eval(cc.preEval(a, 0)), _2);
    }

    function _2(cc, a) {
      return a;
    }
  };

  aa.V._cc2 = function _cc2(c) {
    var cc2 = M.context();
    cc2.V._c = c;
    return cc2.chain((0, cc2.V._c)(cc2.C.C.C.V._b, cc2.C.C.V._a), _1);

    function _1(cc2, a) {
      return cc2.chain(cc2.eval(a, 0), _2);
    }

    function _2(cc2) {}
  };

  aa.V._bb = function _bb($$) {
    var bb = M.context();
    bb.V._$$ = $$;

    bb.V._cc = function _cc(b) {
      var cc = M.context();
      cc.V._b = b;

      if (cc.C.C.C.V._a) {
        cc.V._a = something;
        return cc.chain(cc.eval(cc.V._a, 0), _1);
      } else {
        return cc.chain(cc.eval(cc.C.C.C.V._a, 1), _1);
      }

      function _1(cc) {
        return cc.chain((0, cc.V._b)(cc.C.C.C.C.C.V._c, cc.C.C.C.V._a), _2);
      }

      function _2(cc, a) {
        return cc.chain(cc.eval(a, 2), _3);
      }

      function _3(cc, a) {
        return a;
      }
    };

    return bb.chain(bb.C.C.C.V._b(), _1);

    function _1(bb, a) {
      a + bb.C.C.C.C.V._c + bb.C.C.V._a;
    }
  };

  return aa.chain(aa.C.C.V._b(), _1);

  function _1(aa, a) {
    a + aa.C.C.C.V._c + aa.C.V._a;
  }
}