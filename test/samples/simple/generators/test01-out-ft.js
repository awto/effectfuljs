function d_1(d_v) {
  var a;
  a = d_v.j++;
  return M.jM(M.yld(a), d_2, d_v);
}

function d_2(d_v) {
  var a, b;
  b = d_v.i += 2;
  a = some(b, d_v.j);
  return M.jMB(M.yldStar(a + d_v.j), d_3, d_v);
}

function d_3(a, d_v) {
  return M.jMB(M.yld(a), d_4, d_v);
}

function d_4(a, d_v) {
  if (a) return d_5(d_v);else {
    if (d_v.j) return d_6(d_v);else {
      return M.yld(2);
    }
  }
}

function d_5(d_v) {
  var a;
  a = d_v.i += 3;
  return M.yldStar(a);
}

function d_6(d_v) {
  return M.pure(d_v.i);
}

function a4_1(a4_v) {
  try {
    return M.jME(M.yld(2), a4_2, a4_v, a4_3);
  } catch (e) {
    return a4_3(a4_v);
  }
}

function a4_2(a4_v) {
  try {
    return M.jME(M.yld(3), a4_5, a4_7, a4_3);
  } catch (e) {
    return a4_3(a4_v);
  }
}

function a4_3(a4_v) {
  a4_v.e = ex;
  return M.jM(M.yld('excep'), a4_4, a4_v);
}

function a4_4(a4_v) {
  return M.jM(M.yld(a4_v.e), a4_5, a4_7);
}

function a4_5(cb) {
  return M.jM(M.yld('f'), a4_6, cb);
}

function a4_6(cb) {
  return M.jM(M.yld('e'), cb);
}

function a4_7() {
  var a;
  a = a2();
  return M.jMB(M.yldStar(a), a4_8);
}

function a4_8(a) {
  return M.yld(a);
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
  return M.jRM(M.yld(a5_v.i), a5_1, a5_v, loop);
}

function d(i) {
  var d_v = {
    i,
    j: undefined
  },
      a;
  d_v.j = 0;
  a = d_v.i++;
  return M.jM(M.yld(a), d_1, d_v);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.jM(M.yld(1), a4_1, a4_v);
}

function a5() {
  var loop;
  loop = M.iterator(a4());
  return a5_1(a5_v, loop);
}