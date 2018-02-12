import * as M from '@effectful/core';

const a = w => function mfs(s) {
  var v, k;
  return M.scope(_1);

  function _1() {
    v = void 0;
    k = void 0;
    return M.pure(function kk(k) {
      return function vv(ww) {
        var id;
        return M.scope(_1);

        function _1() {
          id = void 0;
          return M.yldStar(M.yld(function nn(mm) {
            return M.scope(_1);

            function _1() {
              return M.yldStar(M.yld(m => {
                return id(k, v, w, m, ww, mm);
              }), _2);
            }

            function _2() {
              var a;
              a = k++;
              return M.yldStar(M.yld(a), _3);
            }

            function _3() {
              return M.pure();
            }
          }), _2);
        }

        function _2() {
          return M.pure();
        }
      };
    });
  }
};

function e1(k) {
  return M.scope(_1);

  function _1() {
    var a;
    a = k;
    return M.yldStar(M.yld(a), _2);
  }

  function _2() {
    return M.yldStar(M.yld(function p1(m) {
      return function e2(l) {
        return M.scope(_1);

        function _1() {
          var a;
          a = k += l;
          return M.yldStar(M.yld(a), _2);
        }

        function _2() {
          return M.pure();
        }
      };
    }), _3);
  }

  function _3() {
    return M.pure();
  }
}

function e1(k) {
  return M.scope(_1);

  function _1() {
    var a;
    a = k;
    return M.yldStar(M.yld(a), _2);
  }

  function _2() {
    return M.yldStar(M.yld(function e2(m) {
      return M.scope(_1);

      function _1() {
        return M.yldStar(M.yld(function e3(l) {
          return M.scope(_1);

          function _1() {
            var a;
            a = k += l;
            return M.yldStar(M.yld(a), _2);
          }

          function _2() {
            return M.pure();
          }
        }), _2);
      }

      function _2() {
        return M.pure();
      }
    }), _3);
  }

  function _3() {
    return M.pure();
  }
}