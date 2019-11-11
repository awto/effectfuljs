import * as M from "@effectful/core";

function tuza() {
  var tuzb = function _tuzb() {
    var tuzb = M.context();
    tuzb._tuza = tuza;
    return M.scope(tuzb_1);
  },
      tuza = {};

  tuza._av = 1;
}

function tuzb_1(tuzb) {
  tuzb._b = 2;
  tuzb._mv = 3;
  tuzb._mv = null;
  return M.chain(M.call(tuzb._b), tuzb_2);
}

function tuzb_2(tuzb, b) {
  var a;
  a = tuzb._tuza._av = b;
  return M.chain(M.call(che, void 0, a), tuzb_3);
}

function tuzb_3(tuzb) {
  return M.chain(M.call(me), tuzb_4);
}

function tuzb_4(tuzb) {
  tuzb._v = (tuzb._ = M.get(M.get(tuzb._b, "a"), "d"), tuzb._1 = (tuzb._2 = M.get(c, "b"), tuzb._3 = M.get(tuzb._2, "a"), tuzb._2.a = tuzb._3 + 1, tuzb._3), tuzb._[tuzb._1] = M.get(tuzb._, tuzb._1) - 1);
  c = tuzb._v;
  tuzb._v = null;
  return M.chain(M.call(be), tuzb_5);
}

function tuzb_5(tuzb) {
  if (process === 1000) {
    tuzb._6 = null;
    return M.chain(M.call(c_fun, void 0, "a"), tuzb_6);
  } else {
    tuzb._6 = 2;
    return M.jump(void 0, tuzb_10);
  }
}

function tuzb_6(tuzb, a) {
  tuzb._7 = M.call(process, a, "b");
  return M.chain(M.call(d_fun, void 0, "c"), tuzb_7);
}

function tuzb_7(tuzb, a) {
  var b, c;
  b = M.constr(M.get(process, "D"), "e");
  c = tuzb._7, tuzb._7 = null;
  return M.chain(M.call(c, void 0, a, "d", b), tuzb_8);
}

function tuzb_8(tuzb, a) {
  return M.chain(M.call(a_fun, void 0, a), tuzb_9);
}

function tuzb_9(tuzb, a) {
  tuzb._6 = a;
  return M.jump(void 0, tuzb_10);
}

function tuzb_10(tuzb) {
  var a;
  c = tuzb._6;

  if (tuzb._4 = M.get(tuzb._b, "a"), tuzb._5 = M.get(M.get(tuzb._tuza, "_av"), "m"), tuzb._3 = M.get(tuzb._4, tuzb._5), tuzb._4[tuzb._5] = tuzb._3 + 1, tuzb._3) {
    delete tuzb._b[M.get(tuzb._tuza, "_av")];
  }

  // delete b[av] + delete b.a;
  a = tuzb._b, tuzb._b = null, tuzb._6 = null;
  return M.chain(M.call(a), tuzb_11);
}

function tuzb_11(tuzb, b) {
  var a;
  tuzb._8 = b;
  a = M.get(tuzb._tuza, "_av");
  return M.chain(M.call(a), tuzb_12);
}

function tuzb_12(tuzb, a) {
  var b;
  b = delete M.get(M.get(tuzb._tuza, "_av"), "z")[2 + 2];
  delete tuzb._8[a + b];
}