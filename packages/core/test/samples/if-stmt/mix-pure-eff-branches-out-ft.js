import * as M from "@effectful/core";

// *- when there is a mix of pure and effectful branches
function a() {
  var a = M.context();
  return M.scope(a_1);
}

function b() {
  var b = M.context();
  return M.scope(b_1);
}

function c() {
  var c = M.context();
  return M.scope(c_1);
}

function d() {
  var d = M.context();
  return M.scope(d_1);
}

function e() {
  var e = M.context();
  return M.scope(e_1);
}

function f() {
  var f = M.context();
  return M.scope(f_1);
}

function g() {
  var g = M.context();
  return M.scope(g_1);
}

function h() {
  var h = M.context();
  return M.scope(h_1);
}

function i() {
  var i = M.context();
  return M.scope(i_1);
}

function j() {
  var j = M.context();
  return M.scope(j_1);
}

function a1(a, b, c, d) {
  var a1 = M.context();
  a1._a = a;
  a1._b = b;
  a1._c = c;
  a1._d = d;
  return M.scope(a1_1);
}

function a_1(a) {
  if (true) {
    return M.chain(eff(1), a_2);
  } else {
    return 3;
  }
}

function a_2(a, b) {
  return b;
}

function b_1(b) {
  if (true) {
    return M.chain(eff(1), b_2);
  } else {
    console.log(3);
    return M.jump(void 0, b_2);
  }
}

function b_2(b) {
  return M.chain(eff(3), b_3);
}

function b_3(b) {
  return M.chain(eff(4), b_4);
}

function b_4(b) {}

function c_1(c) {
  if (true) {
    return M.chain(eff(1), c_2);
  } else {
    console.log(3);
    return 3;
  }
}

function c_2(c) {
  return M.chain(eff(3), c_3);
}

function c_3(c) {
  return M.chain(eff(4), c_4);
}

function c_4(c) {
  return c._r;
}

function d_1(d) {
  return M.chain(eff("a"), d_2);
}

function d_2(d) {
  if (true) {
    return M.chain(eff(1), d_3);
  } else {
    console.log(3);
    return M.jump(void 0, d_3);
  }
}

function d_3(d) {
  return M.chain(eff(3), d_4);
}

function d_4(d) {
  return M.chain(eff(4), d_5);
}

function d_5(d) {}

function e_1(e) {
  return M.chain(eff("1"), e_2);
}

function e_2(e, a) {
  if (a) {} else {
    return M.chain(eff("2"), e_3);
  }
}

function e_3(e) {}

function f_1(f) {
  return M.chain(eff("1"), f_2);
}

function f_2(f, a) {
  if (a) {
    return M.chain(eff("i"), f_3);
  } else {
    return M.chain(eff("2"), f_4);
  }
}

function f_3(f, a) {
  return a;
}

function f_4(f) {
  return f._r;
}

function g_1(g) {
  return M.chain(eff("1"), g_2);
}

function g_2(g, a) {
  if (a) {} else {
    console.log("2");
  }
}

function h_1(h) {
  return M.chain(eff("1"), h_2);
}

function h_2(h, a) {
  if (a) {} else {
    console.log("2");
    return M.chain(eff("2"), h_3);
  }
}

function h_3(h) {}

function i_1(i) {
  return M.chain(eff("1"), i_2);
}

function i_2(i, a) {
  if (a) {} else {
    console.log("2");
    return M.chain(eff(2), i_3);
  }
}

function i_3(i) {}

function j_1(j) {
  return M.chain(eff("1"), j_2);
}

function j_2(j, a) {
  if (a) {} else {
    console.log("2");
    return M.chain(eff(2), j_3);
  }
}

function j_3(j) {
  console.log("3");
}

function a1_1(a1) {
  var e, a, b;
  e = void 0;
  a1._f = void 0;

  if (nb) {
    b: {
      switch (a1._a) {
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

    a1._a = null, a1._c = null;
    return M.jump(void 0, a1_3);
  } else {
    if (wb) {
      a = a1._a, b = a1._c, a1._a = null, a1._c = null;
      return M.chain(ub(a, b), a1_2);
    } else {
      "keydown" === a1._a && 229 === a1._c.keyCode && (e = sb.compositionStart);
      a1._a = null, a1._c = null;
      return M.jump(void 0, a1_3);
    }
  }
}

function a1_2(a1, b) {
  var e, a;
  a = b;

  if (a) {
    a = e = sb.compositionEnd;
  }

  a;
  return M.jump(void 0, a1_3);
}

function a1_3(a1) {
  return null === a1._f ? a1._b : null === a1._b ? a1._f : [a1._f, a1._b];
}