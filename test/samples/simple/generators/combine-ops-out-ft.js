function d_1(d_v) {
  var a;
  a = d_v.j++;
  return M.yldM(a, d_2, d_v);
}

function d_2(d_v) {
  var a, b;
  b = d_v.i += 2;
  a = some(b, d_v.j);
  return M.yldStarMB(a + d_v.j, d_3, d_v);
}

function d_3(a, d_v) {
  return M.yldMB(a, d_4, d_v);
}

function d_4(a, d_v) {
  if (a) return d_5(d_v);else {
    return M.pure(d_v.i);
  }
}

function d_5(d_v) {
  var a;
  a = d_v.i += 3;
  return M.yldStarMB(a, M.pure);
}

function d_6() {
  return M.yldM(2, M.pure);
}

function a4_1(a4_v) {
  try {
    return M.yldME(2, a4_2, a4_v, a4_3);
  } catch (e) {
    return a4_3(a4_v);
  }
}

function a4_2(a4_v) {
  try {
    return M.yldME(3, a4_5, a4_7, a4_3);
  } catch (e) {
    return a4_3(a4_v);
  }
}

function a4_3(a4_v) {
  a4_v.e = ex;
  return M.yldM('excep', a4_4, a4_v);
}

function a4_4(a4_v) {
  return M.yldM(a4_v.e, a4_5, a4_7);
}

function a4_5(cb) {
  return M.yldM('f', a4_6, cb);
}

function a4_6(cb) {
  return M.yldM('e', cb);
}

function a4_7() {
  var a;
  a = a2();
  return M.yldStarMB(a, a4_8);
}

function a4_8(b) {
  var a;
  a = a3();
  return M.yldStarMB(a, a4_9, b);
}

function a4_9(c, b) {
  var a;
  a = a1(b, c);
  return M.yldM(a, M.pure);
}

function a5_1(a5_v, loop) {
  var a5_v = {
    i: undefined
  },
      a,
      b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_2(a5_v, loop);else return M.pure();
}

function a5_2(a5_v, loop) {
  a5_v.i = loop.value;
  return M.yldM(a5_v.i, a5_1, a5_v, loop);
}

function d(i) {
  var d_v = {
    i,
    j: undefined
  },
      a;
  d_v.j = 0;
  a = d_v.i++;
  return M.yldM(a, d_1, d_v);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.yldM(1, a4_1, a4_v);
}

function a5() {
  var loop;
  loop = M.iterator(a4());
  return a5_1(a5_v, loop);
}