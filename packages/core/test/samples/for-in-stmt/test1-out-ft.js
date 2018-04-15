import * as M from "@effectful/core";

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
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var g = M.context();
  return M.scope(g_1);
}

function h() {
  var h = M.context();
  return M.scope(h_1);
}

function a_1(a) {
  return M.chain(eff(2), a_2);
}

function a_2(a, c) {
  var b;
  b = M.forInIterator(c);
  a._loop = b;
  return M.jump(void 0, a_3);
}

function a_3(a) {
  var i;

  if (!(a._loop = a._loop.step()).done) {
    i = a._loop.value;
    return M.chain(eff(i), a_3);
  }
}

function b_1(b) {
  return M.chain(eff(2), b_2);
}

function b_2(b, c) {
  var a;
  a = M.forInIterator(c);
  b._loop = a;
  return M.jump(void 0, b_3);
}

function b_3(b) {
  var i;

  if (!(b._loop = b._loop.step()).done) {
    i = b._loop.value;
    return M.chain(eff(i), b_3);
  }
}

function c_1(c) {
  return M.chain(eff(2), c_2);
}

function c_2(c, b) {
  var a;
  a = M.forInIterator(b);
  c._loop = a;
  return M.jump(void 0, c_3);
}

function c_3(c) {
  var i;

  if (!(c._loop = c._loop.step()).done) {
    i = c._loop.value;
    return M.chain(eff(i), c_3);
  }
}

function d_1(d) {
  return M.chain(eff(2), d_2);
}

function d_2(d, a) {
  var i;

  for (i in a) {
    console.log(i);
  }
}

function e_1(e) {
  e._loop = M.forInIterator(obj);
  return M.jump(void 0, e_2);
}

function e_2(e) {
  var i;

  if (!(e._loop = e._loop.step()).done) {
    i = e._loop.value;
    return M.chain(eff(i), e_2);
  }
}

function g_1(g) {
  return M.chain(eff("a"), g_2);
}

function g_2(g) {
  return M.chain(eff(2), g_3);
}

function g_3(g, b) {
  var a;
  a = M.forInIterator(b);
  g._loop = a;
  return M.jump(void 0, g_4);
}

function g_4(g) {
  if (!(g._loop = g._loop.step()).done) {
    g._i = g._loop.value;
    return M.chain(eff(g._i), g_5);
  } else {
    return M.jump(void 0, g_7);
  }
}

function g_5(g, a) {
  if (a) {
    return M.jump(void 0, g_4);
  } else {
    return M.chain(effB(g._i), g_6);
  }
}

function g_6(g, a) {
  if (a) {
    return M.jump(void 0, g_7);
  } else {
    return M.chain(eff("c"), g_4);
  }
}

function g_7(g) {
  return M.chain(eff("z"), g_8);
}

function g_8(g) {}

function h_1(h) {
  return M.chain(eff("a"), h_2);
}

function h_2(h) {
  h._loop = M.forInIterator(obj);
  return M.jump(void 0, h_3);
}

function h_3(h) {
  if (!(h._loop = h._loop.step()).done) {
    h._j = h._loop.value;
    console.log("j");
    return M.chain(effA(h._j), h_4);
  } else {
    return M.jump(void 0, h_13);
  }
}

function h_4(h) {
  return M.chain(eff(h._j), h_5);
}

function h_5(h, b) {
  var a;
  a = M.forInIterator(b);
  h._loop1 = a;
  return M.jump(void 0, h_6);
}

function h_6(h) {
  if (!(h._loop1 = h._loop1.step()).done) {
    h._i = h._loop1.value;
    console.log("b");
    return M.chain(eff("b"), h_7);
  } else {
    return M.jump(void 0, h_12);
  }
}

function h_7(h) {
  return M.chain(eff(h._i + h._j), h_8);
}

function h_8(h, a) {
  if (a) {
    return M.jump(void 0, h_3);
  } else {
    return M.chain(effB(h._i + h._j), h_9);
  }
}

function h_9(h, a) {
  if (a) {
    return M.jump(void 0, h_13);
  } else {
    return M.chain(eff(h._i), h_10);
  }
}

function h_10(h, a) {
  if (a) {
    return M.jump(void 0, h_6);
  } else {
    return M.chain(effB(h._i), h_11);
  }
}

function h_11(h, a) {
  if (a) {
    return M.jump(void 0, h_12);
  } else {
    return M.chain(eff("c"), h_6);
  }
}

function h_12(h) {
  return M.chain(effB(h._j), h_3);
}

function h_13(h) {
  return M.chain(eff("z"), h_14);
}

function h_14(h) {}