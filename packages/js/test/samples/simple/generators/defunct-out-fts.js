function a() {
  var a = M.generator();
  return M.scope(0, 4);
}

function b() {
  var b = M.generator();
  return M.scope(0, 5);
}

function c() {
  var c = M.generator();
  return M.scope(0, 6);
}

function d() {
  var d = M.generator();
  return M.scope(0, 7);
}

function b2() {
  var b2 = M.generator();
  return M.scope(0, 5);
}

function a_1(a, s, p) {
  for (;;) {
    switch (s) {
      case 0:
        return M.yldStar(M.yld(1), 1, 4);

      case 1:
        return M.yldStar(M.yld(2), 2, 4);

      case 2:
        return M.pure();

      case 4:
        return M.raise(p);
    }
  }
}

function b_1(b, s, p) {
  for (;;) {
    switch (s) {
      case 0:
        return M.yldStar(M.yld(1), 1, 6);

      case 1:
        return M.yldStar(M.yld(2), 3, 5);

      case 2:
        b._e = b._ex;
        return M.yldStar(M.yld(b._e), 3, 5);

      case 3:
        return M.pure();

      case 5:
        return M.raise(p);

      case 6:
        b._ex = p;
        s = 2;
        continue;
    }
  }
}

function c_1(c, s, p) {
  for (;;) {
    switch (s) {
      case 0:
        return M.yldStar(M.yld(1), 1, 8);

      case 1:
        c._fc = 4, c._fe = 6;
        return M.yldStar(M.yld(2), 3, 6);

      case 2:
        c._e = c._ex;
        c._fc = 4, c._fe = 6;
        return M.yldStar(M.yld(c._e), 3, 6);

      case 3:
        return M.yldStar(M.yld('F'), c._fc, c._fe, c._fr);

      case 4:
        return M.pure();

      case 6:
        return M.raise(p);

      case 7:
        return M.raise(c._err1);

      case 8:
        c._ex = p;
        s = 2;
        continue;

      case 9:
        c._fc = 7, c._fe = 6, c._err1 = p;
        s = 3;
        continue;
    }
  }
}

function d_1(d, s, p) {
  for (;;) {
    switch (s) {
      case 0:
        d._loop = M.iterator(s);
        s = 1;
        continue;

      case 1:
        if (!(d._loop = d._loop.step()).done) {
          d._i = d._loop.value;
          s = 2;
          continue;
        } else {
          return M.pure();
        }

      case 2:
        return M.yldStar(M.yldStar([d._i]), 3, 8);

      case 3:
        return M.repeat(M.yld(d._i), 1, 7);

      case 4:
        d._e = d._ex;

        if (d._loop.exit) {
          d._loop.exit();
        }

        throw d._e;

      case 7:
        return M.raise(p);

      case 8:
        d._ex = p;
        s = 4;
        continue;
    }
  }
}

function b2_1(b2, s, p) {
  for (;;) {
    switch (s) {
      case 0:
        return M.yldStar(M.yld(1), 1, 6);

      case 1:
        return M.yldStar(M.yld(2), 3, 5);

      case 2:
        b2._e = b2._ex;
        return M.yldStar(M.yld(b2._e), 3, 5);

      case 3:
        return M.pure();

      case 5:
        return M.raise(p);

      case 6:
        b2._ex = p;
        s = 2;
        continue;
    }
  }
}