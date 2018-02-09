const a = w => function mfs(s) {
  var v, k;
  return M.scopeH(_1, _2);

  function _1() {
    v = void 0;
    k = void 0;
    return M.pure(function kk(k) {
      return function vv(ww) {
        var id;
        return M.scopeH(_1, _3);

        function _1() {
          id = void 0;
          return M.yldStarBH(M.yld(function nn(mm) {
            return M.scopeH(_1, _4);

            function _1() {
              return M.yldStarBH(M.yld(m => {
                return id(k, v, w, m, ww, mm);
              }), _2, _4);
            }

            function _2() {
              var a;
              a = k++;
              return M.yldStarBH(M.yld(a), _3, _4);
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
  return M.scopeH(_1, _4);

  function _1() {
    var a;
    a = k;
    return M.yldStarBH(M.yld(a), _2, _4);
  }

  function _2() {
    return M.yldStarBH(M.yld(function p1(m) {
      return function e2(l) {
        return M.scopeH(_1, _3);

        function _1() {
          var a;
          a = k += l;
          return M.yldStarBH(M.yld(a), _2, _3);
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
  return M.scopeH(_1, _4);

  function _1() {
    var a;
    a = k;
    return M.yldStarBH(M.yld(a), _2, _4);
  }

  function _2() {
    return M.yldStarBH(M.yld(function e2(m) {
      return M.scopeH(_1, _3);

      function _1() {
        return M.yldStarBH(M.yld(function e3(l) {
          return M.scopeH(_1, _3);

          function _1() {
            var a;
            a = k += l;
            return M.yldStarBH(M.yld(a), _2, _3);
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