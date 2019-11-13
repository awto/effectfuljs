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
  tuzb._6 = M.get(global, "che");
  tuzb._mv = null;
  return M.chain(M.call(tuzb._b), tuzb_2);
}

function tuzb_2(tuzb, b) {
  var a, c;
  a = tuzb._tuza._av = b;
  c = tuzb._6, tuzb._6 = null;
  return M.chain(M.call(c, void 0, a), tuzb_3);
}

function tuzb_3(tuzb) {
  var a;
  a = M.get(global, "me");
  return M.chain(M.call(a), tuzb_4);
}

function tuzb_4(tuzb) {
  var a;
  tuzb._v = (tuzb._ = M.get(M.get(tuzb._b, "a"), "d"), tuzb._1 = (tuzb._2 = M.get(M.get(global, "c"), "b"), tuzb._3 = M.get(tuzb._2, "a"), tuzb._2.a = tuzb._3 + 1, tuzb._3), tuzb._[tuzb._1] = M.get(tuzb._, tuzb._1) - 1);
  c = tuzb._v;
  a = M.get(global, "be");
  tuzb._v = null;
  return M.chain(M.call(a), tuzb_5);
}

function tuzb_5(tuzb) {
  var a;

  if (M.get(global, "process") === 1000) {
    tuzb._8 = M.get(global, "a_fun");
    tuzb._10 = M.get(global, "process");
    a = M.get(global, "c_fun");
    tuzb._7 = null;
    return M.chain(M.call(a, void 0, "a"), tuzb_6);
  } else {
    tuzb._7 = 2;
    tuzb._8 = null, tuzb._10 = null;
    return M.jump(void 0, tuzb_10);
  }
}

function tuzb_6(tuzb, a) {
  var b;
  tuzb._9 = M.call(tuzb._10, a, "b");
  b = M.get(global, "d_fun");
  tuzb._10 = null;
  return M.chain(M.call(b, void 0, "c"), tuzb_7);
}

function tuzb_7(tuzb, a) {
  var b, c;
  b = M.constr(M.get(M.get(global, "process"), "D"), "e");
  c = tuzb._9, tuzb._9 = null;
  return M.chain(M.call(c, void 0, a, "d", b), tuzb_8);
}

function tuzb_8(tuzb, a) {
  var b;
  b = tuzb._8, tuzb._8 = null;
  return M.chain(M.call(b, void 0, a), tuzb_9);
}

function tuzb_9(tuzb, a) {
  tuzb._7 = a;
  return M.jump(void 0, tuzb_10);
}

function tuzb_10(tuzb) {
  var a;
  c = tuzb._7;

  if (tuzb._4 = M.get(tuzb._b, "a"), tuzb._5 = M.get(M.get(tuzb._tuza, "_av"), "m"), tuzb._3 = M.get(tuzb._4, tuzb._5), tuzb._4[tuzb._5] = tuzb._3 + 1, tuzb._3) {
    delete tuzb._b[M.get(tuzb._tuza, "_av")];
  }

  // delete b[av] + delete b.a;
  a = tuzb._b, tuzb._b = null, tuzb._7 = null;
  return M.chain(M.call(a), tuzb_11);
}

function tuzb_11(tuzb, b) {
  var a;
  tuzb._11 = b;
  a = M.get(tuzb._tuza, "_av");
  return M.chain(M.call(a), tuzb_12);
}

function tuzb_12(tuzb, a) {
  var b;
  b = delete M.get(M.get(tuzb._tuza, "_av"), "z")[2 + 2];
  delete tuzb._11[a + b];
}