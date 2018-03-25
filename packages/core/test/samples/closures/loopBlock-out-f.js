import * as M from "@effectful/core";

function a(p) {
  var a, i, loop, fc, fe, err;
  return M.chain(eff(1), _1);

  function _1() {
    var b;
    a = 0;
    b = a;
    return M.chain(eff(2, b), _2);
  }

  function _2(b) {
    var a;
    a = M.iterator(b);
    loop = a;
    return M.jump(void 0, _3, _9);
  }

  function _3() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain((i => {
        var j, k, b, c;
        b = a;
        c = a;
        return M.chain(eff(3, b, c), _1);

        function _1() {
          j = i + 1;
          k = i + 1;
          i++;
          return M.chain(eff(function b(k) {
            var _k, c, d, e, f;

            c = a;
            d = j;
            e = k++;
            f = p;
            return M.chain(eff(4, c, d, e, f), _1);

            function _1() {
              var b, c, d;
              _k = 10;
              j++;
              a++;
              i++;
              _k++, p++;
              b = a;
              c = i;
              d = p;
              return M.chain(eff(5, b, c, _k, d), _2);
            }

            function _2() {
              var b, c, d;
              b = a;
              c = i;
              d = p;
              return M.chain(eff(6, b, c, k, d), _3);
            }

            function _3() {}
          }), _2);
        }

        function _2() {
          var b, c, d;
          b = a;
          c = i;
          d = j;
          return M.chain(eff(7, b, c, d), _3);
        }

        function _3() {}
      })(i), _3, _9);
    } else {
      fc = _5, fe = _7;
      return M.jump(void 0, _4);
    }
  }

  function _4() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _5() {
    var b, c;
    b = a;
    c = p;
    return M.chain(eff(8, b, c), _6, _7);
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8() {
    return M.raise(err);
  }

  function _9(a) {
    fc = _8, fe = _7, err = a;
    return M.jump(void 0, _4);
  }
}