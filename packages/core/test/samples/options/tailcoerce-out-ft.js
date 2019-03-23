import * as M from "@effectful/core";

function a1(a, b, c, d) {
  var a1 = M.context();
  a1._a = a;
  a1._b = b;
  a1._c = c;
  a1._d = d;
  a1.$run = a1_1;
  return M.scope(5);
}

function a2(a, b, c, d) {
  var a2 = M.context();
  a2._a = a;
  a2._b = b;
  a2._c = c;
  a2._d = d;
  a2.$run = a2_1;
  return M.scope(5);
}

function a3(a, b, c, d) {
  var a3 = M.context();
  a3._a = a;
  a3._b = b;
  a3._c = c;
  a3._d = d;
  a3.$run = a3_1;
  return M.scope(5);
}

function a4(a, b, c, d) {
  var a4 = M.context();
  a4._a = a;
  a4._b = b;
  a4._c = c;
  a4._d = d;
  a4.$run = a4_1;
  return M.scope(5);
}

function a5(a, b, c, d) {
  var a5 = M.context();
  a5._a = a;
  a5._b = b;
  a5._c = c;
  a5._d = d;
  a5.$run = a5_1;
  return M.scope(5);
}

function a1_1(a1, p) {
  for (;;) {
    switch (a1.true) {
      case 5:
        return M.chain(bb(), 6);

      case 6:
        return M.chain(cc(), 7);

      case 0:
        return p;

      case 7:
      default:
        throw new Error("invalid state");
    }
  }
}

function a2_1(a2, p) {
  for (;;) {
    switch (a2.true) {
      case 5:
        p = M.chain(bb(), 6);
        if (M.check(p)) return p;else continue;

      case 6:
        p = M.chain(cc(), 7);
        if (M.check(p)) return p;else continue;

      case 0:
        return p;

      case 7:
      default:
        throw new Error("invalid state");
    }
  }
}

function a3_1(a3, p) {
  for (;;) {
    switch (a3.true) {
      case 5:
        p = M.chain(bb(), 6);
        if (M.isEff(p)) return p;else continue;

      case 6:
        p = M.chain(cc(), 7);
        if (M.isEff(p)) return p;else continue;

      case 0:
        return p;

      case 7:
      default:
        throw new Error("invalid state");
    }
  }
}

function a4_1(a4, p) {
  for (;;) {
    switch (a4.true) {
      case 5:
        p = M.chain(bb(), 6);
        if (p === M.token) return p;else continue;

      case 6:
        p = M.chain(cc(), 7);
        if (p === M.token) return p;else continue;

      case 0:
        return p;

      case 7:
      default:
        throw new Error("invalid state");
    }
  }
}

function a5_1(a5, p) {
  for (;;) {
    switch (a5.true) {
      case 5:
        p = M.chain(bb(), 6);
        if (p === M.token) return p;else continue;

      case 6:
        p = M.chain(cc(), 7);
        if (p === M.token) return p;else continue;

      case 0:
        return p;

      case 7:
      default:
        throw new Error("invalid state");
    }
  }
}