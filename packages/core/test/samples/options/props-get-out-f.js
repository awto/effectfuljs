import * as M from "@effectful/core";

function tuza() {
  var av,
      tuzb = function tuzb() {
    var b, mv, v, a, d, e, f, g, h, k, m, n;
    b = 2;
    mv = 3;
    return M.chain(M.call(b), _1);

    function _1(b) {
      var a;
      a = av = b;
      return M.chain(M.call(che, void 0, a), _2);
    }

    function _2() {
      return M.chain(M.call(me), _3);
    }

    function _3() {
      v = (a = M.get(M.get(b, "a"), "d"), d = (e = M.get(c, "b"), f = M.get(e, "a"), e.a = f + 1, f), a[d] = M.get(a, d) - 1);
      c = v;
      return M.chain(M.call(be), _4);
    }

    function _4() {
      if (process === 1000) {
        return M.chain(M.call(c_fun, void 0, "a"), _5);
      } else {
        k = 2;
        return M.jump(void 0, _9);
      }
    }

    function _5(a) {
      m = M.call(process, a, "b");
      return M.chain(M.call(d_fun, void 0, "c"), _6);
    }

    function _6(a) {
      var b;
      b = M.constr(M.get(process, "D"), "e");
      return M.chain(M.call(m, void 0, a, "d", b), _7);
    }

    function _7(a) {
      return M.chain(M.call(a_fun, void 0, a), _8);
    }

    function _8(a) {
      k = a;
      return M.jump(void 0, _9);
    }

    function _9() {
      c = k;

      if (g = M.get(b, "a"), h = M.get(av, "m"), f = M.get(g, h), g[h] = f + 1, f) {
        delete b[av];
      }

      // delete b[av] + delete b.a;
      return M.chain(M.call(b), _10);
    }

    function _10(b) {
      var a;
      n = b;
      a = av;
      return M.chain(M.call(a), _11);
    }

    function _11(a) {
      var b;
      b = delete M.get(av, "z")[2 + 2];
      delete n[a + b];
    }
  };

  av = 1;
}