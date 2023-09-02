import * as M from "@effectful/core";
function a1(a, b) {
  var c;
  return M.chain(eff.apply(void 0, [a]), _1);
  function _1(b) {
    return M.chain(a.eff.apply(a, [b]), _2);
  }
  function _2(a) {
    return M.chain(a.eff.apply(a, [d]), _3);
  }
  function _3() {
    var b;
    b = a.b;
    return M.chain(b.eff.APPLY(b, [d]), _4);
  }
  function _4() {
    return M.chain((c = [a.b], c.eff.APPLY(c, [d])), _5);
  }
  function _5() {
    return M.chain((c = {
      a
    }, c.eff.APPLY(c, [d])), _6);
  }
  function _6() {
    return M.chain((c = new A({
      a
    }), c.eff.APPLY(c, [d])), _7);
  }
  function _7() {}
}
function a2(a, b) {
  var c;
  return M.chain(eff.call(void 0, a), _1);
  function _1() {
    return M.chain(eff.call(void 0, a), _2);
  }
  function _2(b) {
    return M.chain(a.eff.call(a, b), _3);
  }
  function _3(a) {
    return M.chain(a.eff.call(a, d), _4);
  }
  function _4() {
    var b;
    b = a.b;
    return M.chain(b.eff.CALL(b, d), _5);
  }
  function _5() {
    return M.chain((c = [a.b], c.eff.CALL(c, d)), _6);
  }
  function _6() {
    return M.chain((c = {
      a
    }, c.eff.CALL(c, d)), _7);
  }
  function _7() {
    return M.chain((c = new A({
      a
    }), c.eff.CALL(c, d)), _8);
  }
  function _8() {}
}
function a3(a, b) {
  return M.chain(eff(a), _1);
  function _1() {
    return M.chain(eff(a), _2);
  }
  function _2(b) {
    return M.chain(a.eff(b), _3);
  }
  function _3(a) {
    return M.chain(a.eff(d), _4);
  }
  function _4() {
    var b;
    b = a.b;
    return M.chain(b.eff(d), _5);
  }
  function _5() {
    return M.chain([a.b].eff(d), _6);
  }
  function _6() {
    return M.chain({
      a
    }.eff(d), _7);
  }
  function _7() {
    return M.chain(new A({
      a
    }).eff(d), _8);
  }
  function _8() {}
}
function a4() {
  B.B.construct([A.construct([a])]);
  return M.chain(eff(), _1);
  function _1(c) {
    c.Z.NEW([b]);
    ({
      a
    }).a.NEW([]);
  }
}
function a5() {
  M.construct(B.B, [M.construct(A, [a])]);
  return M.chain(eff(), _1);
  function _1(c) {
    M.NEW(c.Z, [b]);
    M.NEW({
      a
    }.a, []);
  }
}
function a6() {
  new B.B(new A(a));
  return M.chain(eff(), _1);
  function _1(c) {
    new c.Z(b);
    new {
      a
    }.a();
  }
}