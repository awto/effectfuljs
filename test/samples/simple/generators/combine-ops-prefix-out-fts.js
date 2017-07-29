function d_1(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yldM(a, d_2, i, j);
}

function d_2(i, j) {
  var a;
  a = j++;
  return M.yldM(a, d_3, i, j);
}

function d_3(i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.yldStarMB(a + j, d_4, i);
}

function d_4(a, i) {
  return M.yldMB(a, d_5, i);
}

function d_5(a, i) {
  if (a) return d_6(i);else {
    return M.pure(i);
  }
}

function d_6(i) {
  var a;
  a = i += 3;
  return M.yldStarMB(a, M.pure);
}

function d_7() {
  return M.yldM(2, M.pure);
}

function a4_1() {
  return M.yldM(1, a4_2);
}

function a4_2() {
  try {
    return M.yldME(2, a4_3, a4_4);
  } catch (e) {
    return a4_4();
  }
}

function a4_3() {
  try {
    return M.yldME(3, a4_6, a4_8, a4_4);
  } catch (e) {
    return a4_4();
  }
}

function a4_4() {
  var e;
  e = ex;
  return M.yldM('excep', a4_5, e);
}

function a4_5(e) {
  return M.yldM(e, a4_6, a4_8);
}

function a4_6(cb) {
  return M.yldM('f', a4_7, cb);
}

function a4_7(cb) {
  return M.yldM('e', cb);
}

function a4_8() {
  var a;
  a = a2();
  return M.yldStarMB(a, a4_9);
}

function a4_9(b) {
  var a;
  a = a3();
  return M.yldStarMB(a, a4_10, b);
}

function a4_10(c, b) {
  var a;
  a = a1(b, c);
  return M.yldM(a, M.pure);
}

function a5_1() {
  var loop;
  loop = M.iterator(a4());
  return a5_2(loop);
}

function a5_2(loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_3(loop);else return M.pure();
}

function a5_3(loop) {
  var i;
  i = loop.value;
  return M.yldM(i, a5_2, loop);
}

function d(i) {
  return M.scope(d_1, i);
}

function a4() {
  return M.scope(a4_1);
}

function a5() {
  return M.scope(a5_1);
}