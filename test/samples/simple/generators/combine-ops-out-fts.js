function d_1(i, j) {
  var a;
  a = j++;
  return M.yldM(a, d_2, i, j);
}

function d_2(i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.yldStarMB(a + j, d_3, i);
}

function d_3(a, i) {
  return M.yldMB(a, d_4, i);
}

function d_4(a, i) {
  if (a) return d_5(i);else {
    return M.pure(i);
  }
}

function d_5(i) {
  var a;
  a = i += 3;
  return M.yldStarMB(a, M.pure);
}

function d_6() {
  return M.yldM(2, M.pure);
}

function a4_1() {
  try {
    return M.yldME(2, a4_2, a4_3);
  } catch (e) {
    return a4_3();
  }
}

function a4_2() {
  try {
    return M.yldME(3, a4_5, a4_7, a4_3);
  } catch (e) {
    return a4_3();
  }
}

function a4_3() {
  var e;
  e = ex;
  return M.yldM('excep', a4_4, e);
}

function a4_4(e) {
  return M.yldM(e, a4_5, a4_7);
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

function a5_1(loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_2(loop);else return M.pure();
}

function a5_2(loop) {
  var i;
  i = loop.value;
  return M.yldM(i, a5_1, loop);
}

function d(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yldM(a, d_1, i, j);
}

function a4() {
  return M.yldM(1, a4_1);
}

function a5() {
  var loop;
  loop = M.iterator(a4());
  return a5_1(loop);
}