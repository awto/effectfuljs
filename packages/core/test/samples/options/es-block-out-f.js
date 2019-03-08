import M from "@effectful/core";
import { block, block as opts } from "@effectful/core";

function a() {
  var a = M.context(),
      r;
  a.$run = _1;
  return a.scope(5);

  function _1(a, p) {
    var b, c;

    switch (a.$state) {
      case 5:
        return a.chain(s_1, 7);

      case 6:
        return a.pure();

      case 0:
        return a.pure(p);

      case 7:
        b = a.fork(null, 8);
        c = a.fork(null, 9);
        return a.chain(a.join([b, c]), 6);

      case 8:
        return a.chain(p_1, 0);

      case 9:
        return a.chain(p_2, 0);

      default:
        throw new Error("invalid state");
    }
  }
}

function b() {
  var b = M.context(),
      r;
  b.$run = _1;
  return b.scope(5);

  function _1(b, p) {
    var a, c;

    switch (b.$state) {
      case 5:
        return b.chain(s_1, 7);

      case 6:
        return b.pure();

      case 0:
        return b.pure(p);

      case 7:
        a = b.fork(null, 8);
        c = b.fork(null, 9);
        return b.chain(b.join([a, c]), 6);

      case 8:
        return b.chain(p_1, 0);

      case 9:
        return b.chain(p_2, 0);

      default:
        throw new Error("invalid state");
    }
  }
}

function c() {
  var c = M.context(),
      r;
  c.$run = _1;
  return c.scope(5);

  function _1(c, p) {
    var a, b;

    switch (c.$state) {
      case 5:
        return c.chain(s_1, 7);

      case 6:
        return c.pure();

      case 0:
        return c.pure(p);

      case 7:
        a = c.fork(null, 8);
        b = c.fork(null, 9);
        return c.chain(c.join([a, b]), 6);

      case 8:
        return c.chain(p_1, 0);

      case 9:
        return c.chain(p_2, 0);

      default:
        throw new Error("invalid state");
    }
  }
}

function d() {
  var d = M.context(),
      r;
  d.$run = _1;
  return d.scope(5);

  function _1(d, p) {
    var a, b;

    switch (d.$state) {
      case 5:
        return d.chain(s_1, 7);

      case 6:
        return d.pure();

      case 0:
        return d.pure(p);

      case 7:
        a = d.fork(null, 8);
        b = d.fork(null, 9);
        return d.chain(d.join([a, b]), 6);

      case 8:
        return d.chain(p_1, 0);

      case 9:
        return d.chain(p_2, 0);

      default:
        throw new Error("invalid state");
    }
  }
}