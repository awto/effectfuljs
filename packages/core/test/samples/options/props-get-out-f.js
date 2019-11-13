import * as M from "@effectful/core";

function tuza() {
  var av,
      tuzb = function tuzb() {
    var b, mv, v, a, d, e, f, g, h, k, m, n, x, y, z;
    b = 2;
    mv = 3;
    k = M.get(global, "che");
    return M.chain(M.call(b), _1);

    function _1(b) {
      var a;
      a = av = b;
      return M.chain(M.call(k, void 0, a), _2);
    }

    function _2() {
      var a;
      a = M.get(global, "me");
      return M.chain(M.call(a), _3);
    }

    function _3() {
      var g;
      v = (a = M.get(M.get(b, "a"), "d"), d = (e = M.get(M.get(global, "c"), "b"), f = M.get(e, "a"), e.a = f + 1, f), a[d] = M.get(a, d) - 1);
      c = v;
      g = M.get(global, "be");
      return M.chain(M.call(g), _4);
    }

    function _4() {
      var a;

      if (M.get(global, "process") === 1000) {
        n = M.get(global, "a_fun");
        y = M.get(global, "process");
        a = M.get(global, "c_fun");
        return M.chain(M.call(a, void 0, "a"), _5);
      } else {
        m = 2;
        return M.jump(void 0, _9);
      }
    }

    function _5(a) {
      var b;
      x = M.call(y, a, "b");
      b = M.get(global, "d_fun");
      return M.chain(M.call(b, void 0, "c"), _6);
    }

    function _6(a) {
      var b;
      b = M.constr(M.get(M.get(global, "process"), "D"), "e");
      return M.chain(M.call(x, void 0, a, "d", b), _7);
    }

    function _7(a) {
      return M.chain(M.call(n, void 0, a), _8);
    }

    function _8(a) {
      m = a;
      return M.jump(void 0, _9);
    }

    function _9() {
      c = m;

      if (g = M.get(b, "a"), h = M.get(av, "m"), f = M.get(g, h), g[h] = f + 1, f) {
        delete b[av];
      }

      // delete b[av] + delete b.a;
      return M.chain(M.call(b), _10);
    }

    function _10(b) {
      var a;
      z = b;
      a = av;
      return M.chain(M.call(a), _11);
    }

    function _11(a) {
      var b;
      b = delete M.get(av, "z")[2 + 2];
      delete z[a + b];
    }
  };

  av = 1;
}