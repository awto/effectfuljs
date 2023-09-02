import * as M from "@effectful/core";
// *- with state
function a() {
  var i;
  i = 0;
  return M.chain(eff(), _1);
  function _1() {
    var a;
    a = i += 1;
    return M.chain(eff(a), _2);
  }
  function _2(a) {
    var b, c;
    switch (a) {
      case 1:
        b = i += 3;
        return M.chain(effB(b), _3);
      case 2:
        c = i += 5;
        return M.chain(effB(c), _3);
      case 3:
        {
          console.log("hi", i);
        }
      default:
        return M.jump(void 0, _3);
    }
  }
  function _3() {
    return M.chain(eff(i), _4);
  }
  function _4() {}
}