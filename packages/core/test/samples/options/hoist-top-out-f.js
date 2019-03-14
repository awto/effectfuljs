import b from "some";
import * as M from "@effectful/core";
export let [, a] = b;

function a1() {}

{
  class Some {
    a() {
      var r;
      return M.scope(_1);

      function _1() {
        return M.chain(b_1, _2);
      }

      function _2() {
        return M.pure();
      }

      function _3(r) {
        return M.pure(r);
      }
    }

  }

  let b = a;
  const [, other, b2] = Some;

  function somethingElse() {
    var r;
    return M.scope(_1);

    function _1() {
      return M.pure(function zz() {
        var r;
        return M.scope(_1);

        function _1() {
          var a;
          a = eff_1(new Some());
          return M.chain(a, _2);
        }

        function _2() {
          var c;
          c = eff_2(a, b);
          return M.chain(c, _3);
        }

        function _3() {
          return M.pure();
        }

        function _4(r) {
          return M.pure(r);
        }
      });
    }

    function _2(r) {
      return M.pure(r);
    }
  }
}