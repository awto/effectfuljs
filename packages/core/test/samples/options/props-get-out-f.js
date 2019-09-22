import * as M from "@effectful/core";

function tuza() {
  var a,
      tuzb = function tuzb() {
    var b, m, v, d, e, f, g, h, k, n, x, y, z, a1, b1;
    b = 2;
    m = 3;
    n = M.G(global, "che");
    return M.chain(b(), _1);

    function _1(c) {
      var b;
      b = a = c;
      return M.chain(n(b), _2);
    }

    function _2() {
      x = M.G(global, "che");
      z = a;
      return M.chain(b(), _3);
    }

    function _3(b) {
      var c;
      y = a = z + b;
      a1 = a;
      c = M.G(global, "c");
      return M.chain(c(), _4);
    }

    function _4(c) {
      var b;
      b = a = a1 - c;
      return M.chain(x(y, b), _5);
    }

    function _5() {
      var a;
      m = m + 1;
      m = m - 1;
      a = M.G(global, "me");
      return M.chain(a(), _6);
    }

    function _6() {
      var a;
      v = (d = M.G(M.G(b, "a"), "d"), e = (f = M.G(M.G(global, "c"), "b"), g = M.G(f, "a"), f.a = g + 1, g), d[e] = M.G(d, e) - 1);
      c = v;
      a = M.G(global, "be");
      return M.chain(a(), _7);
    }

    function _7() {
      if (h = M.G(b, "a"), k = M.G(a, "m"), g = M.G(h, k), h[k] = g + 1, g) {
        delete b[a];
      }

      delete b[a] + delete b.a;
      return M.chain(b(), _8);
    }

    function _8(c) {
      var b;
      b1 = c;
      b = a;
      return M.chain(b(), _9);
    }

    function _9(b) {
      var c;
      c = delete M.G(a, "z")[2 + 2];
      delete b1[b + c];
    }
  };

  a = 1;
}