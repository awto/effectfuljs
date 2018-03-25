import * as M from "@effectful/core";

function a() {
  var i, a;
  a = i = 0;
  return M.chain(eff2(a), _1, i);

  function _1(a, i) {
    var b;
    b = i++;
    return M.chain(eff1(a, b), _2, i);
  }

  function _2(i) {
    var a;
    a = i++;
    return M.chain(eff3(a), _3, i);
  }

  function _3(i) {
    var a;
    a = i++;
    return M.chain(eff4(a), _4, i);
  }

  function _4(i) {
    var a;
    a = i++;
    return M.chain(eff5(a), _5, i);
  }

  function _5(i) {
    var a;
    a = i++;
    return M.chain(eff6(a), _6, i);
  }

  function _6(a, i) {
    var b;

    if (a) {
      b = i++;
      return M.chain(eff7(b), _8, i);
    } else {
      return M.chain(eff7(i), _7, i);
    }
  }

  function _7(a, i) {
    var b;

    if (a) {
      i++;
      b = i++;
      return M.chain(eff8(b), _8, i);
    } else {
      return 10;
    }
  }

  function _8(i) {
    var a;
    a = i++;
    return M.chain(eff9(a), _9, i);
  }

  function _9(i) {
    var a;
    a = i++;
    return M.chain(eff10(a), _10);
  }

  function _10() {
    var r;
    return r;
  }
}