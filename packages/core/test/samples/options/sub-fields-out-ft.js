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

function oii() {
  var oj = function _oj() {
    var mapTest = function _mapTest() {
      var mapTest = M.context();
      mapTest.VV.$oii$$ = _oii;
      mapTest.VV.$oj$$ = oj.V;
      return M.scope(mapTest_1);
    },
        oj = {
      V: {},
      VV: {}
    },
        _oii = oii.V;

    oj.V.$j$$ = 0;
  },
      oii = {
    V: {},
    VV: {}
  };

  oii.V.$ii$$ = 0;
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

function mapTest_1(mapTest) {
  mapTest.V.$v$$ = [1, 2, 3];
  mapTest.V.$self$$ = {};
  return M.chain(mapTest.V.$v$$.map((i, x, t) => {
    var ctx = {
      V: {},
      VV: {}
    },
        oii = mapTest.VV.$oii$$,
        oj = mapTest.VV.$oj$$,
        _mapTest = mapTest.V;
    return `${i}@${x}[${oj.$j$$++}/${oii.$ii$$++}]:${t === _mapTest.$v$$}/${_mapTest.$self$$ === this}`;
  }, mapTest.V.$self$$), mapTest_2);
}

function mapTest_2(mapTest, a) {
  return a;
}