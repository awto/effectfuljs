import * as M from "@effectful/core";

// *- when there is a mix of pure and effectful branches
function a() {
  var r;

  if (true) {
    return M.chain(eff(1), _1);
  } else {
    return 3;
  }

  function _1(a) {
    return a;
  }
}

function b() {
  if (true) {
    return M.chain(eff(1), _1);
  } else {
    console.log(3);
    return M.jump(void 0, _1);
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {
    return M.chain(eff(4), _3);
  }

  function _3() {}
}

function c() {
  var r;

  if (true) {
    return M.chain(eff(1), _1);
  } else {
    console.log(3);
    return 3;
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {
    return M.chain(eff(4), _3);
  }

  function _3() {
    return r;
  }
}

function d() {
  return M.chain(eff("a"), _1);

  function _1() {
    if (true) {
      return M.chain(eff(1), _2);
    } else {
      console.log(3);
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {}
}

function e() {
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {} else {
      return M.chain(eff("2"), _2);
    }
  }

  function _2() {}
}

function f() {
  var r;
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {
      return M.chain(eff("i"), _2);
    } else {
      return M.chain(eff("2"), _3);
    }
  }

  function _2(a) {
    return a;
  }

  function _3() {
    return r;
  }
}

function g() {
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {} else {
      console.log("2");
    }
  }
}

function h() {
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {} else {
      console.log("2");
      return M.chain(eff("2"), _2);
    }
  }

  function _2() {}
}

function i() {
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {} else {
      console.log("2");
      return M.chain(eff(2), _2);
    }
  }

  function _2() {}
}

function j() {
  return M.chain(eff("1"), _1);

  function _1(a) {
    if (a) {} else {
      console.log("2");
      return M.chain(eff(2), _2);
    }
  }

  function _2() {
    console.log("3");
  }
}

function a1(a, b, c, d) {
  var e, f, r;
  e = void 0;
  f = void 0;

  if (nb) {
    b: {
      switch (a) {
        case "compositionstart":
          {
            e = sb.compositionStart;
            break b;
          }

        case "compositionend":
          {
            e = sb.compositionEnd;
            break b;
          }

        case "compositionupdate":
          {
            e = sb.compositionUpdate;
            break b;
          }
      }

      e = void 0;
    }

    return M.jump(void 0, _2);
  } else {
    if (wb) {
      return M.chain(ub(a, c), _1);
    } else {
      "keydown" === a && 229 === c.keyCode && (e = sb.compositionStart);
      return M.jump(void 0, _2);
    }
  }

  function _1(b) {
    var a;
    a = b;

    if (a) {
      a = e = sb.compositionEnd;
    }

    a;
    return M.jump(void 0, _2);
  }

  function _2() {
    return null === f ? b : null === b ? f : [f, b];
  }
}