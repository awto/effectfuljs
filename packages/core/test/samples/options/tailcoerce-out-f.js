import * as M from "@effectful/core";

function a1(a, b, c, d) {
  var a1 = M.context();
  a1._a = a;
  a1._b = b;
  a1._c = c;
  a1._d = d;
  a1.$run = _1;
  return M.chain(bb(), 5);

  function _1(a1, p) {
    switch (a1.true) {
      case 5:
        return M.chain(cc(), 6);

      case 0:
        return p;

      case 6:
      default:
        throw new Error("invalid state");
    }
  }
}

function a2(a, b, c, d) {
  var a2 = M.context();
  a2._a = a;
  a2._b = b;
  a2._c = c;
  a2._d = d;
  a2.$run = _1;
  return M.chain(bb(), 5);

  function _1(a2, p) {
    for (;;) {
      switch (a2.true) {
        case 5:
          p = M.chain(cc(), 6);
          if (M.check(p)) return p;else continue;

        case 0:
          return p;

        case 6:
        default:
          throw new Error("invalid state");
      }
    }
  }
}

function a3(a, b, c, d) {
  var a3 = M.context();
  a3._a = a;
  a3._b = b;
  a3._c = c;
  a3._d = d;
  a3.$run = _1;
  return M.chain(bb(), 5);

  function _1(a3, p) {
    for (;;) {
      switch (a3.true) {
        case 5:
          p = M.chain(cc(), 6);
          if (M.isEff(p)) return p;else continue;

        case 0:
          return p;

        case 6:
        default:
          throw new Error("invalid state");
      }
    }
  }
}

function a4(a, b, c, d) {
  var a4 = M.context();
  a4._a = a;
  a4._b = b;
  a4._c = c;
  a4._d = d;
  a4.$run = _1;
  return M.chain(bb(), 5);

  function _1(a4, p) {
    for (;;) {
      switch (a4.true) {
        case 5:
          if ((p = cc()) === M.token) {
            a4.true = 6;
            return p;
          } else {
            a4.true = 6;
            continue;
          }

        case 0:
          return p;

        case 6:
        default:
          throw new Error("invalid state");
      }
    }
  }
}

function a5(a, b, c, d) {
  var a5 = M.context();
  a5._a = a;
  a5._b = b;
  a5._c = c;
  a5._d = d;
  a5.$run = _1;
  return M.chain(bb(), 5);

  function _1(a5, p) {
    for (;;) {
      switch (a5.true) {
        case 5:
          if ((p = cc()) === M.token) {
            a5.true = 6;
            return p;
          } else {
            a5.true = 6;
            continue;
          }

        case 0:
          return p;

        case 6:
        default:
          throw new Error("invalid state");
      }
    }
  }
}