function a() {
  var a = M.generator();
  a.$run = _1;
  a.$sc = 0;
  return M.scopeH(3);

  function _1(a, p) {
    switch (a.$sc) {
      case 0:
        a.$sc = 1;
        return M.yldStarBH(M.yld(1), 3);

      case 1:
        a.$sc = 2;
        return M.yldStarBH(M.yld(2), 3);

      case 2:
        return M.pure();

      case 3:
        return M.raise(p);
    }
  }
}

function b() {
  var b = M.generator();
  b.$run = _1;
  b.$sc = 0;
  return M.scopeH(4);

  function _1(b, p) {
    switch (b.$sc) {
      case 0:
        b.$sc = 1;
        return M.yldStarBH(M.yld(1), 5);

      case 1:
        b.$sc = 3;
        return M.yldStarBH(M.yld(2), 4);

      case 2:
        b._e = b._ex;
        b.$sc = 3;
        return M.yldStarBH(M.yld(b._e), 4);

      case 3:
        return M.pure();

      case 4:
        return M.raise(p);

      case 5:
        b.$sc = 2;
        b._ex = p;
        return M.jumpH(4);
    }
  }
}

function c() {
  var c = M.generator();
  c.$run = _1;
  c.$sc = 0;
  return M.scopeH(5);

  function _1(c, p) {
    switch (c.$sc) {
      case 0:
        c.$sc = 1;
        return M.yldStarBH(M.yld(1), 7);

      case 1:
        c.$sc = 3;
        c._fc = 4, c._fe = 5;
        return M.yldStarBH(M.yld(2), 5);

      case 2:
        c._e = c._ex;
        c.$sc = 3;
        c._fc = 4, c._fe = 5;
        return M.yldStarBH(M.yld(c._e), 5);

      case 3:
        c.$sc = c._fc;
        return M.yldStarBH(M.yld('F'), c._fe);

      case 4:
        return M.pure();

      case 5:
        return M.raise(p);

      case 6:
        return M.raise(c._err1);

      case 7:
        c.$sc = 2;
        c._ex = p;
        return M.jumpH(8);

      case 8:
        c.$sc = 3;
        c._fc = 6, c._fe = 5, c._err1 = p;
        return M.jumpH(5);
    }
  }
}

function d() {
  var d = M.generator();
  d.$run = _1;
  d.$sc = 0;
  return M.scopeH(5);

  function _1(d, p) {
    switch (d.$sc) {
      case 0:
        d._loop = M.iterator(s);
        d.$sc = 1;
        return M.jumpH(5);

      case 1:
        if (!(d._loop = d._loop.step()).done) {
          d._i = d._loop.value;
          d.$sc = 2;
          return M.jumpRH(6);
        } else {
          return M.pure();
        }

      case 2:
        d.$sc = 3;
        return M.yldStarBH(M.yldStar([d._i]), 6);

      case 3:
        d.$sc = 1;
        return M.yldStarBH(M.yld(d._i), 5);

      case 4:
        d._e = d._ex;

        if (d._loop.exit) {
          d._loop.exit();
        }

        throw d._e;

      case 5:
        return M.raise(p);

      case 6:
        d.$sc = 4;
        d._ex = p;
        return M.jumpH(5);
    }
  }
}

async function af1() {
  if (await a) await b;
  return await c;
}

function b2() {
  var b2 = M.generator();
  b2.$run = _1;
  b2.$sc = 0;
  return M.scopeH(4);

  function _1(b2, p) {
    switch (b2.$sc) {
      case 0:
        b2.$sc = 1;
        return M.yldStarBH(M.yld(1), 5);

      case 1:
        b2.$sc = 3;
        return M.yldStarBH(M.yld(2), 4);

      case 2:
        b2._e = b2._ex;
        b2.$sc = 3;
        return M.yldStarBH(M.yld(b2._e), 4);

      case 3:
        return M.pure();

      case 4:
        return M.raise(p);

      case 5:
        b2.$sc = 2;
        b2._ex = p;
        return M.jumpH(4);
    }
  }
}

async function af2() {
  if (await a) await b;
  return await c;
}