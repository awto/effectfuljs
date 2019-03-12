import * as M from "@effectful/core";

function aS() {
  var b1;
  return M.chain(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.chain(eff("a"), _2);
  }

  function _2() {
    return M.chain(eff("b"), _3);
  }

  function _3() {}
}

exports.a = a;

function a() {
  var b1;
  b1 = 0;
  return M.chain(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.chain(eff("a"), _2);
  }

  function _2() {
    return M.chain(eff("b"), _3);
  }

  function _3() {}
}

function a1() {
  var a;
  return M.chain(eff(1), _1);

  function _1(b) {
    a = b;
    return M.chain(eff("a"), _2);
  }

  function _2() {
    return M.chain(eff("b"), _3);
  }

  function _3() {}
}

function bS() {
  var b1, b2;
  return M.chain(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    b2 = a;
    return M.chain(eff(b1), _3);
  }

  function _3() {
    return M.chain(eff(b2), _4);
  }

  function _4() {}
}

function b() {
  var b1, b2;
  return M.chain(eff(1), _1);

  function _1(a) {
    b1 = a;
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    b2 = a;
    return M.chain(eff(b1), _3);
  }

  function _3() {
    return M.chain(eff(b2), _4);
  }

  function _4() {
    b1 = b2 = 100;
  }
}

function b1() {
  var a, c, b;
  return M.chain(eff(1), _1);

  function _1(c) {
    b = a = c;
    return M.chain(eff(2), _2);
  }

  function _2(e) {
    var d;
    d = c = e;
    b, d;
    return M.chain(eff(a), _3);
  }

  function _3() {
    return M.chain(eff(c), _4);
  }

  function _4() {}
}

function c() {
  var a, b, c, d, e, f, g, j, x, y, z;
  return M.chain(eff(1), _1);

  function _1(c) {
    a = c;
    b = 2;
    return M.chain(eff(3), _2);
  }

  function _2(a) {
    c = a;
    return M.chain(eff("a"), _3);
  }

  function _3() {
    return M.chain(eff("b"), _4);
  }

  function _4() {
    return M.chain(eff(4), _5);
  }

  function _5(a) {
    d = a;
    e = 5;
    return M.chain(eff(6), _6);
  }

  function _6(a) {
    f = a;
    return M.chain(eff(7), _7);
  }

  function _7(a) {
    g = a;
    j = 8;
    return M.chain(eff("x"), _8);
  }

  function _8(a) {
    x = a;
    y = "y";
    return M.chain(eff("z"), _9);
  }

  function _9(a) {
    z = a;
    return M.chain(eff(9), _10);
  }

  function _10() {
    a = b = c = d = e = f = g = j = x = y = z = 1000;
    return M.chain(eff(10), _11);
  }

  function _11() {}
}

function d() {
  var a, b, c;
  return M.chain(eff1("a"), _1);

  function _1(b) {
    a = b;
    return M.chain(eff(2), _2);
  }

  function _2(b) {
    a.some = b;
    return M.chain(eff("b"), _3);
  }

  function _3(a) {
    b = a;
    c = b.some;
    return M.chain(eff(3), _4);
  }

  function _4(a) {
    b.some = c + a;
    return M.chain(eff("c"), _5);
  }

  function _5(a) {
    a.some++;
    some["d"]--;
  }
}

function e1() {
  var cc;
  return M.chain(eff(1, cc), _1);

  function _1(a) {
    cc = a;
    return M.chain(eff(2, cc), _2);
  }

  function _2(a) {
    cc = a;
    return M.chain(eff(2, cc), _3);
  }

  function _3() {}
}

function e2() {
  var cc, _cc;

  return M.chain(eff(1, cc), _1);

  function _1(a) {
    cc = a;
    return M.chain(eff(2, cc), _2);
  }

  function _2(a) {
    cc = a;
    return M.chain(eff(3, cc), _3);
  }

  function _3() {
    return M.chain(eff(4, _cc), _4);
  }

  function _4(a) {
    _cc = a;
    return M.chain(eff(5, _cc), _5);
  }

  function _5(a) {
    _cc = a;
    return M.chain(eff(6, _cc), _6);
  }

  function _6() {
    return M.chain(eff(7, cc), _7);
  }

  function _7() {}
}

function es6() {
  var a, b, arr1, e, f, m, obj, arr2, c;
  return M.chain(eff_1(), _1);

  function _1(c) {
    [, a, b, ...arr1] = c;
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    ({
      m: [e, {
        b: f,
        m,
        ...obj
      }, ...arr2]
    } = a);
    return M.chain(eff_1(), _3);
  }

  function _3(a) {
    c = a;
    return M.chain(eff(2), _4);
  }

  function _4(b) {
    var a;
    a = ({
      m: [e, {
        b: f,
        m,
        ...obj
      }]
    } = b);
    return M.chain(c(a), _5);
  }

  function _5(c) {
    [, a, b] = c;
    return M.chain(eff_4(), _6);
  }

  function _6(b) {
    [a, ...arr1] = b;
  }
}