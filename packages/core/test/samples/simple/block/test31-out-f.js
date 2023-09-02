import * as M from "@effectful/core";
function a() {
  var i, j, a;
  i = 0;
  j = 0;
  a = j;
  return M.chain(eff1(i, a), _1);
  function _1() {
    var a;
    i++, j++;
    a = j;
    return M.chain(function b(i, k) {
      var z, a;
      z = 0;
      a = j;
      return M.chain(eff2(i, a, k, z), _1);
      function _1() {
        var a;
        i++, j++, k++, z++;
        a = j;
        return M.chain(eff3(i, a, k, z), _2);
      }
      function _2() {
        var a;
        a = j;
        return M.chain(eff4(i, a, k, z), _3);
      }
      function _3() {}
    }(i, a), _2);
  }
  function _2() {
    var a;
    i++, j++;
    a = j;
    return M.chain(eff5(i, a), _3);
  }
  function _3() {
    var a;
    a = j;
    return M.chain(eff6(i, a), _4);
  }
  function _4() {}
}