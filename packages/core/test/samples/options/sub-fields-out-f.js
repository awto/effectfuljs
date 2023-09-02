import * as M from "@effectful/core";
function a1() {
  var i,
    b = function b(j) {
      var k, r;
      k = j + i;
      i++;
      return M.chain(eff_1(), _1);
      function _1(a) {
        return a;
      }
    },
    r;
  i = 0;
  return M.chain(eff_2(), _1);
  function _1(a) {
    return a;
  }
}
function a2() {
  var i,
    b = function b(j) {
      var k, r;
      k = j + i;
      i++;
      return M.chain(eff_1(), _1);
      function _1(a) {
        return a;
      }
    },
    r;
  i = 0;
  return M.chain(eff_2(), _1);
  function _1(a) {
    return a;
  }
}
function oii() {
  let ii = 0;
  function oj() {
    let j = 0;
    function mapTest() {
      var v, self, r;
      v = [1, 2, 3];
      self = {};
      return M.chain(v.map((i, x, t) => {
        return `${i}@${x}[${j++}/${ii++}]:${t === v}/${self === this}`;
      }, self), _1);
      function _1(a) {
        return a;
      }
    }
  }
}