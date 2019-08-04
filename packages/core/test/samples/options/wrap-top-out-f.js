import * as M from "@effectful/core";
module.exports = M.wrapExport(function (module, exports) {
  var a1 = function a1() {},
      Some,
      b,
      Something = function Something() {
    a1(b);
  },
      other,
      b2,
      somethingElse = function somethingElse() {
    var r;
    return M.scope(_1);

    function _1() {
      return M.pure(function zz() {
        var r;
        return M.scope(_1);

        function _1() {
          var a;
          a = eff_1(Something());
          return M.chain(a, _2);
        }

        function _2() {
          var a;
          a = eff_2(new Some());
          return M.chain(a, _3);
        }

        function _3() {
          var c;
          c = eff_3(a, b);
          return M.chain(c, _4);
        }

        function _4() {
          return M.pure();
        }

        function _5(r) {
          return M.pure(r);
        }
      });
    }

    function _2(r) {
      return M.pure(r);
    }
  };

  {
    {
      Some = class Some {
        a() {
          var r;
          return M.scope(_1);

          function _1() {
            return M.chain(new Some(), _2);
          }

          function _2() {
            return M.chain(new Something(), _3);
          }

          function _3() {
            a1();
            return M.pure();
          }

          function _4(r) {
            return M.pure(r);
          }
        }

      };
      b = a;
      [, other, b2] = Some;
    }
  }
});