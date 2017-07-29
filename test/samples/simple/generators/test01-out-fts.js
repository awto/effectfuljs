function d_1(i, j) {
  var a;
  a = j++;
  return M.jM(M.yld(a), d_2, i, j);
}

function d_2(i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.jMB(M.yldStar(a + j), d_3, i, j);
}

function d_3(a, i, j) {
  return M.jMB(M.yld(a), d_4, i, j);
}

function d_4(a, i, j) {
  if (a) return d_5(i);else {
    if (j) return d_6(i);else {
      return M.yld(2);
    }
  }
}

function d_5(i) {
  var a;
  a = i += 3;
  return M.yldStar(a);
}

function d_6(i) {
  return M.pure(i);
}

function a4_1() {
  try {
    return M.jME(M.yld(2), a4_2, a4_3);
  } catch (e) {
    return a4_3();
  }
}

function a4_2() {
  try {
    return M.jME(M.yld(3), a4_5, a4_7, a4_3);
  } catch (e) {
    return a4_3();
  }
}

function a4_3() {
  var e;
  e = ex;
  return M.jM(M.yld('excep'), a4_4, e);
}

function a4_4(e) {
  return M.jM(M.yld(e), a4_5, a4_7);
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

function a5_1(loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_2(loop);else return M.pure();
}

function a5_2(loop) {
  var i;
  i = loop.value;
  return M.jRM(M.yld(i), a5_1, loop);
}

function d(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.jM(M.yld(a), d_1, i, j);
}

function a4() {
  return M.jM(M.yld(1), a4_1);
}

function a5() {
  var loop;
  loop = M.iterator(a4());
  return a5_1(loop);
}