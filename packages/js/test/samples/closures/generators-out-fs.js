const a = w => function mfs(s) {
  var v, k;
  return M.scope(_1, _2);

  function _1() {
    v = void 0;
    k = void 0;
    return M.pure(function kk(k) {
      return function vv(ww) {
        var id;
        return M.scope(_1, _3);

        function _1() {
          id = void 0;
          return M.yldStar(M.yld(function nn(mm) {
            return M.scope(_1, _4);

            function _1() {
              return M.yldStar(M.yld(m => {
                return id(k, v, w, m, ww, mm);
              }), _2, _4);
            }

            function _2() {
              var a;
              a = k++;
              return M.yldStar(M.yld(a), _3, _4);
            }

            function _3() {
              return M.pure();
            }

            function _4(e) {
              return M.raise(e);
            }
          }), _2, _3);
        }

        function _2() {
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      };
    });
  }

  function _2(e) {
    return M.raise(e);
  }
};

function e1(k) {
  return M.scope(_1, _4);

  function _1() {
    var a;
    a = k;
    return M.yldStar(M.yld(a), _2, _4);
  }

  function _2() {
    return M.yldStar(M.yld(function p1(m) {
      return function e2(l) {
        return M.scope(_1, _3);

        function _1() {
          var a;
          a = k += l;
          return M.yldStar(M.yld(a), _2, _3);
        }

        function _2() {
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      };
    }), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function e1(k) {
  return M.scope(_1, _4);

  function _1() {
    var a;
    a = k;
    return M.yldStar(M.yld(a), _2, _4);
  }

  function _2() {
    return M.yldStar(M.yld(function e2(m) {
      return M.scope(_1, _3);

      function _1() {
        return M.yldStar(M.yld(function e3(l) {
          return M.scope(_1, _3);

          function _1() {
            var a;
            a = k += l;
            return M.yldStar(M.yld(a), _2, _3);
          }

          function _2() {
            return M.pure();
          }

          function _3(e) {
            return M.raise(e);
          }
        }), _2, _3);
      }

      function _2() {
        return M.pure();
      }

      function _3(e) {
        return M.raise(e);
      }
    }), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}