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
  M.call(che, void 0, tuzb._tuza._av = M.call(tuzb._b));
  //che((av += b()), (av -= c()));
  //mv++;
  //--mv;
  M.call(me);
  tuzb._v = (tuzb._ = M.get(M.get(tuzb._b, "a"), "d"), tuzb._1 = (tuzb._2 = M.get(c, "b"), tuzb._3 = M.get(tuzb._2, "a"), tuzb._2.a = tuzb._3 + 1, tuzb._3), tuzb._[tuzb._1] = M.get(tuzb._, tuzb._1) - 1);
  c = tuzb._v;
  M.call(be);
  c = process === 1000 ? M.call(a_fun, void 0, M.call(M.call(process, M.call(c_fun, void 0, "a"), "b"), void 0, M.call(d_fun, void 0, "c"), "d", M.constr(M.get(process, "D"), "e"))) : 2;

  if (tuzb._4 = M.get(tuzb._b, "a"), tuzb._5 = M.get(M.get(tuzb._tuza, "_av"), "m"), tuzb._3 = M.get(tuzb._4, tuzb._5), tuzb._4[tuzb._5] = tuzb._3 + 1, tuzb._3) {
    delete tuzb._b[M.get(tuzb._tuza, "_av")];
  }

  // delete b[av] + delete b.a;
  delete M.call(tuzb._b)[M.call(M.get(tuzb._tuza, "_av")) + delete M.get(M.get(tuzb._tuza, "_av"), "z")[2 + 2]];
}