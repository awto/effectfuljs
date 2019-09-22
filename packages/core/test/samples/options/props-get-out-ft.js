import * as M from "@effectful/core";

function tuza() {
  var tuzb = function _tuzb() {
    var tuzb = M.context();
    tuzb._tuza = tuza;
    return M.scope(tuzb_1);
  },
      tuza = {};

  tuza._a = 1;
}

function tuzb_1(tuzb) {
  tuzb._b = 2;
  tuzb._m = 3;
  tuzb._6 = M.G(global, "che");
  return M.chain((0, tuzb._b)(), tuzb_2);
}

function tuzb_2(tuzb, b) {
  var a, c;
  a = tuzb._tuza._a = b;
  c = tuzb._6, tuzb._6 = null;
  return M.chain(c(a), tuzb_3);
}

function tuzb_3(tuzb) {
  tuzb._7 = M.G(global, "che");
  tuzb._9 = tuzb._tuza._a;
  return M.chain((0, tuzb._b)(), tuzb_4);
}

function tuzb_4(tuzb, a) {
  var b;
  tuzb._8 = tuzb._tuza._a = tuzb._9 + a;
  tuzb._10 = tuzb._tuza._a;
  b = M.G(global, "c");
  tuzb._9 = null;
  return M.chain(b(), tuzb_5);
}

function tuzb_5(tuzb, b) {
  var a, c, d;
  a = tuzb._tuza._a = tuzb._10 - b;
  c = tuzb._7, d = tuzb._8, tuzb._7 = null, tuzb._8 = null, tuzb._10 = null;
  return M.chain(c(d, a), tuzb_6);
}

function tuzb_6(tuzb) {
  var a;
  tuzb._m = tuzb._m + 1;
  tuzb._m = tuzb._m - 1;
  a = M.G(global, "me");
  tuzb._m = null;
  return M.chain(a(), tuzb_7);
}

function tuzb_7(tuzb) {
  var a;
  tuzb._v = (tuzb._ = M.G(M.G(tuzb._b, "a"), "d"), tuzb._1 = (tuzb._2 = M.G(M.G(global, "c"), "b"), tuzb._3 = M.G(tuzb._2, "a"), tuzb._2.a = tuzb._3 + 1, tuzb._3), tuzb._[tuzb._1] = M.G(tuzb._, tuzb._1) - 1);
  c = tuzb._v;
  a = M.G(global, "be");
  tuzb._v = null;
  return M.chain(a(), tuzb_8);
}

function tuzb_8(tuzb) {
  var a;

  if (tuzb._4 = M.G(tuzb._b, "a"), tuzb._5 = M.G(tuzb._tuza._a, "m"), tuzb._3 = M.G(tuzb._4, tuzb._5), tuzb._4[tuzb._5] = tuzb._3 + 1, tuzb._3) {
    delete tuzb._b[tuzb._tuza._a];
  }

  delete tuzb._b[tuzb._tuza._a] + delete tuzb._b.a;
  a = tuzb._b, tuzb._b = null;
  return M.chain(a(), tuzb_9);
}

function tuzb_9(tuzb, b) {
  var a;
  tuzb._11 = b;
  a = tuzb._tuza._a;
  return M.chain(a(), tuzb_10);
}

function tuzb_10(tuzb, a) {
  var b;
  b = delete M.G(tuzb._tuza._a, "z")[2 + 2];
  delete tuzb._11[a + b];
}