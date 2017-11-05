function a() {
  return M.scope(0, 4);

  function _1(s, p) {
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
}

function b() {
  var e, ex;
  return M.scope(0, 5);

  function _1(s, p) {
    for (;;) {
      switch (s) {
        case 0:
          return M.yldStar(M.yld(1), 1, 6);

        case 1:
          return M.yldStar(M.yld(2), 3, 5);

        case 2:
          e = ex;
          return M.yldStar(M.yld(e), 3, 5);

        case 3:
          return M.pure();

        case 5:
          return M.raise(p);

        case 6:
          ex = p;
          s = 2;
          continue;
      }
    }
  }
}

function c() {
  var e, ex, fc, fe, err;
  return M.scope(0, 6);

  function _1(s, p) {
    for (;;) {
      switch (s) {
        case 0:
          return M.yldStar(M.yld(1), 1, 8);

        case 1:
          fc = 4, fe = 6;
          return M.yldStar(M.yld(2), 3, 6);

        case 2:
          e = ex;
          fc = 4, fe = 6;
          return M.yldStar(M.yld(e), 3, 6);

        case 3:
          return M.yldStar(M.yld('F'), fc, fe, fr);

        case 4:
          return M.pure();

        case 6:
          return M.raise(p);

        case 7:
          return M.raise(err);

        case 8:
          ex = p;
          s = 2;
          continue;

        case 9:
          fc = 7, fe = 6, err = p;
          s = 3;
          continue;
      }
    }
  }
}

function d() {
  var i, loop, e, ex;
  return M.scope(0, 7);

  function _1(s, p) {
    for (;;) {
      switch (s) {
        case 0:
          loop = M.iterator(s);
          s = 1;
          continue;

        case 1:
          if (!(loop = loop.step()).done) {
            i = loop.value;
            s = 2;
            continue;
          } else {
            return M.pure();
          }

        case 2:
          return M.yldStar(M.yldStar([i]), 3, 8);

        case 3:
          return M.repeat(M.yld(i), 1, 7);

        case 4:
          e = ex;

          if (loop.exit) {
            loop.exit();
          }

          throw e;

        case 7:
          return M.raise(p);

        case 8:
          ex = p;
          s = 4;
          continue;
      }
    }
  }
}

function b2() {
  var e, ex;
  return M.scope(0, 5);

  function _1(s, p) {
    for (;;) {
      switch (s) {
        case 0:
          return M.yldStar(M.yld(1), 1, 6);

        case 1:
          return M.yldStar(M.yld(2), 3, 5);

        case 2:
          e = ex;
          return M.yldStar(M.yld(e), 3, 5);

        case 3:
          return M.pure();

        case 5:
          return M.raise(p);

        case 6:
          ex = p;
          s = 2;
          continue;
      }
    }
  }
}