import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();

  a1.V.b = function _b(j) {
    var b = M.context();
    b.V.a1 = a1.V;
    b.V.j = j;
    return M.scope(b_1);
  };

  return M.scope(a1_1);
}

function a2() {
  var a2 = M.context();

  a2.V.$b$$ = function _b(j) {
    var b = M.context();
    b.VV.$a2$$ = a2.V;
    b.V.$j$$ = j;
    return M.scope(_b_1);
  };

  return M.scope(a2_1);
}

function b_1(b) {
  var k;
  k = b.V.j + b.V.a1.i;
  b.V.a1.i++;
  b.V.j = null;
  return M.chain(eff_1(), b_2);
}

function b_2(b, a) {
  return a;
}

function a1_1(a1) {
  a1.V.i = 0;
  return M.chain(eff_2(), a1_2);
}

function a1_2(a1, a) {
  return a;
}

function _b_1(b) {
  var k;
  k = b.V.$j$$ + b.VV.$a2$$.$i$$;
  b.VV.$a2$$.$i$$++;
  b.V.$j$$ = null;
  return M.chain(eff_1(), _b_2);
}

function _b_2(b, a) {
  return a;
}

function a2_1(a2) {
  a2.V.$i$$ = 0;
  return M.chain(eff_2(), a2_2);
}

function a2_2(a2, a) {
  return a;
}