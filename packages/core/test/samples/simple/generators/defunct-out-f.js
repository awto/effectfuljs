import * as M from "@effectful/core";

function a() {
  var a = M.context();
  a.$run = _1;
  a.$cont = 4;
  return M.scope();

  function _1(a, p) {
    switch (a.$cont) {
      case 4:
        a.$cont = 5;
        return M.yldStar(M.yld(1));

      case 5:
        a.$cont = 6;
        return M.yldStar(M.yld(2));

      case 6:
        return M.pure();

      case 0:
        return M.pure(p);

      case 2:
        return M.$redir(p);

      default:
        throw new Error("invalid state");
    }
  }
}

function b() {
  var b = M.context();
  b.$run = _1;
  b.$err = _err;
  b.$cont = 4;
  return M.scope();

  function _1(b, p) {
    var e;

    switch (b.$cont) {
      case 4:
        b.$cont = 5;
        return M.yldStar(M.yld(1));

      case 5:
        b.$cont = 7;
        return M.yldStar(M.yld(2));

      case 6:
        e = b._ex;
        b.$cont = 7;
        return M.yldStar(M.yld(e));

      case 7:
        return M.pure();

      case 0:
        return M.pure(p);

      case 8:
        b.$cont = 6;
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
  c.$run = _1;
  c.$err = __err;
  c.$fin = _fin;
  c.$cont = 4;
  return M.scope();

  function _1(c, p) {
    var e;

    switch (c.$cont) {
      case 4:
        c.$cont = 5;
        return M.yldStar(M.yld(1));

      case 5:
        c.$cont = 7;
        c._fc = 8;
        return M.yldStar(M.yld(2));

      case 6:
        e = c._ex;
        c.$cont = 7;
        c._fc = 8;
        return M.yldStar(M.yld(e));

      case 7:
        c.$cont = c._fc;
        return M.yldStar(M.yld("F"));

      case 8:
        return M.pure();

      case 0:
        return M.pure(p);

      case 9:
        c.$cont = 0;
        return M.jump(c._r);

      case 10:
        return M.raise(c._err1);

      case 11:
        c.$cont = 6;
        c._ex = p;
        return M.jump();

      case 12:
        c.$cont = 7;
        c._fc = 9, c._r = p;
        return M.jump();

      case 13:
        c.$cont = 7;
        c._fc = 10, c._err1 = p;
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
  d.$run = _1;
  d.$err = _err1;
  d.$fin = __fin;
  d.$cont = 4;
  return M.scope();

  function _1(d, p) {
    switch (d.$cont) {
      case 4:
        d._loop = M.iterator(s);
        d.$cont = 5;
        return M.jump();

      case 5:
        if (!(d._loop = d._loop.step()).done) {
          d._i = d._loop.value;
          d.$cont = 6;
          return M.yldStar(M.yldStar([d._i]));
        } else {
          d.$cont = 7;
          d._fc = 8;
          return M.jump();
        }

      case 6:
        d.$cont = 5;
        return M.yldStar(M.yld(d._i));

      case 7:
        if (d._loop.exit) {
          d._loop.exit();
        }

        d.$cont = d._fc;
        return M.jump();

      case 8:
        return M.pure();

      case 0:
        return M.pure(p);

      case 9:
        d.$cont = 0;
        return M.jump(d._r);

      case 10:
        return M.raise(d._err1);

      case 11:
        d.$cont = 7;
        d._fc = 10, d._err1 = p;
        return M.jump();

      case 12:
        d.$cont = 7;
        d._fc = 9, d._r = p;
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
  b2.$run = _1;
  b2.$err = _err2;
  b2.$cont = 4;
  return M.scope();

  function _1(b2, p) {
    var e;

    switch (b2.$cont) {
      case 4:
        b2.$cont = 5;
        return M.yldStar(M.yld(1));

      case 5:
        b2.$cont = 7;
        return M.yldStar(M.yld(2));

      case 6:
        e = b2._ex;
        b2.$cont = 7;
        return M.yldStar(M.yld(e));

      case 7:
        return M.pure();

      case 0:
        return M.pure(p);

      case 8:
        b2.$cont = 6;
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
      return 11;

    case 6:
      return 13;

    default:
      return 1;
  }
}

function _fin(s) {
  switch (s) {
    case 5:
    case 6:
      return 12;

    default:
      return 0;
  }
}

function _err1(s) {
  switch (s) {
    case 5:
    case 6:
      return 11;

    default:
      return 1;
  }
}

function __fin(s) {
  switch (s) {
    case 5:
    case 6:
      return 12;

    default:
      return 0;
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