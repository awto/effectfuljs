import * as M from "@effectful/core";

function a() {
  var a = M.context();
  a.null = _1;
  a.$sc = 4;
  return M.scope();

  function _1(a, p) {
    var s;

    switch (s = a.$sc, s) {
      case 4:
        a.$sc = 5;
        return M.yldStar(M.yld(1));

      case 5:
        a.$sc = 6;
        return M.yldStar(M.yld(2));

      case 6:
        return M.pure();

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

function b() {
  var b = M.context();
  b.null = _1;
  b.$err = _err;
  b.$sc = 4;
  return M.scope();

  function _1(b, p) {
    var e, s;

    switch (s = b.$sc, s) {
      case 4:
        b.$sc = 5;
        return M.yldStar(M.yld(1));

      case 5:
        b.$sc = 7;
        return M.yldStar(M.yld(2));

      case 6:
        e = b._ex;
        b.$sc = 7;
        return M.yldStar(M.yld(e));

      case 7:
        return M.pure();

      case 8:
        b.$sc = 6;
        b._ex = p;
        return M.jump();

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

function c() {
  var c = M.context();
  c.null = _1;
  c.$err = __err;
  c.$sc = 4;
  return M.scope();

  function _1(c, p) {
    var e, s;

    switch (s = c.$sc, s) {
      case 4:
        c.$sc = 5;
        return M.yldStar(M.yld(1));

      case 5:
        c.$sc = 7;
        c._fc = 8;
        return M.yldStar(M.yld(2));

      case 6:
        e = c._ex;
        c.$sc = 7;
        c._fc = 8;
        return M.yldStar(M.yld(e));

      case 7:
        c.$sc = c._fc;
        return M.yldStar(M.yld("F"));

      case 8:
        return M.pure(c._r);

      case 9:
        return M.raise(c._err1);

      case 10:
        c.$sc = 6;
        c._ex = p;
        return M.jump();

      case 11:
        c.$sc = 7;
        c._fc = 8, c._r = p;
        return M.jump();

      case 12:
        c.$sc = 7;
        c._fc = 9, c._err1 = p;
        return M.jump();

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

function d() {
  var d = M.context();
  d.null = _1;
  d.$err = _err1;
  d.$sc = 4;
  return M.scope();

  function _1(d, p) {
    var _s;

    switch (_s = d.$sc, _s) {
      case 4:
        d._loop = M.iterator(s);
        d.$sc = 5;
        return M.jump();

      case 5:
        if (!(d._loop = d._loop.step()).done) {
          d._i = d._loop.value;
          d.$sc = 6;
          return M.yldStar(M.yldStar([d._i]));
        } else {
          d.$sc = 7;
          d._fc = 8;
          return M.jump();
        }

      case 6:
        d.$sc = 5;
        return M.yldStar(M.yld(d._i));

      case 7:
        if (d._loop.exit) {
          d._loop.exit();
        }

        d.$sc = d._fc;
        return M.jump();

      case 8:
        return M.pure(d._r);

      case 9:
        return M.raise(d._err1);

      case 10:
        d.$sc = 7;
        d._fc = 9, d._err1 = p;
        return M.jump();

      case 11:
        d.$sc = 7;
        d._fc = 8, d._r = p;
        return M.jump();

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

async function af1() {
  if (await a) await b;
  return await c;
}

function b2() {
  var b2 = M.context();
  b2.null = _1;
  b2.$err = _err2;
  b2.$sc = 4;
  return M.scope();

  function _1(b2, p) {
    var e, s;

    switch (s = b2.$sc, s) {
      case 4:
        b2.$sc = 5;
        return M.yldStar(M.yld(1));

      case 5:
        b2.$sc = 7;
        return M.yldStar(M.yld(2));

      case 6:
        e = b2._ex;
        b2.$sc = 7;
        return M.yldStar(M.yld(e));

      case 7:
        return M.pure();

      case 8:
        b2.$sc = 6;
        b2._ex = p;
        return M.jump();

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

async function af2() {
  if (await a) await b;
  return await c;
}

function _err(s) {
  switch (s) {
    case 5:
      return 8;

    default:
      return 1;
  }
}

function __err(s) {
  switch (s) {
    case 5:
      return 10;

    case 6:
      return 12;

    default:
      return 1;
  }
}

function _err1(s) {
  switch (s) {
    case 5:
    case 6:
      return 10;

    default:
      return 1;
  }
}

function _err2(s) {
  switch (s) {
    case 5:
      return 8;

    default:
      return 1;
  }
}