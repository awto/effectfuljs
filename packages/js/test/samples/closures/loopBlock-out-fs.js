function a(p) {
  var a;
  return M.chain(eff(1), _1, _7);

  function _1() {
    var b;
    a = 0;
    b = a;
    return M.chain(eff(2, b), _2, _7);
  }

  function _2(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return M.jump(_3, _7, loop);
  }

  function _3(loop) {
    var i, b, c;

    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_4, _8, i, loop);
    } else {
      b = a;
      c = p;
      return M.chain(eff(8, b, c), _6, _7);
    }
  }

  function _4(i, loop) {
    return M.repeat((i => {
      var j, k, b, c;
      b = a;
      c = a;
      return M.chain(eff(3, b, c), _1, _4);

      function _1() {
        j = i + 1;
        k = i + 1;
        i++;
        return M.chain(eff(function b(k) {
          var c, d, e, f;
          c = a;
          d = j;
          e = k++;
          f = p;
          return M.chain(eff(4, c, d, e, f), _1, _4, k);

          function _1(k) {
            var _k, b, c, d;

            _k = 10;
            j++;
            a++;
            i++;
            _k++, p++;
            b = a;
            c = i;
            d = p;
            return M.chain(eff(5, b, c, _k, d), _2, _4, k);
          }

          function _2(k) {
            var b, c, d;
            b = a;
            c = i;
            d = p;
            return M.chain(eff(6, b, c, k, d), _3, _4);
          }

          function _3() {
            return M.pure();
          }

          function _4(e) {
            return M.raise(e);
          }
        }), _2, _4);
      }

      function _2() {
        var b, c, d;
        b = a;
        c = i;
        d = j;
        return M.chain(eff(7, b, c, d), _3, _4);
      }

      function _3() {
        return M.pure();
      }

      function _4(e) {
        return M.raise(e);
      }
    })(i), _3, _7, loop);
  }

  function _5(ex) {
    var e;
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jump(_5, _7, a);
  }
}