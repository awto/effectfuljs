import * as M from "@effectful/core";
function a() {
  var a = M.context();
  a._b = function _b() {
    var b = M.context();
    b._a = a;
    return M.scope(b_1);
  };
  return M.scope(a_1);
}
function zzz(zz) {
  var zzz = M.context();
  zzz._zz = zz;
  zzz._aaaa = (function _aaaa() {
    var aaaa = M.context();
    return M.scope(aaaa_1);
  }, function _aaaa() {
    var aaaa = M.context();
    return M.scope(_aaaa_1);
  });
  return M.scope(zzz_1);
}
function b_1(b) {
  var j;
  j = b._a._i;
  return M.chain(eff(2, j), b_2);
}
function b_2(b) {
  return M.chain(eff(3, b._a._i), b_3);
}
function b_3(b) {}
function a_1(a) {
  a._i = 0;
  a._k = 0;
  return M.chain(eff(1, a._i, a._k), a_2);
}
function a_2(a) {
  a._k++;
  return M.chain(eff(4, a._i, a._k), a_3);
}
function a_3(a) {
  var b;
  b = a._k, a._k = null;
  return M.chain(eff(5, a._i, b), a_4);
}
function a_4(a) {}
function aaaa_1(aaaa) {
  return M.chain(eff1(), aaaa_2);
}
function aaaa_2(aaaa) {}
function _aaaa_1(aaaa) {
  return M.chain(eff2(), _aaaa_2);
}
function _aaaa_2(aaaa) {}
function zzz_1(zzz) {
  var a;
  a = zzz._aaaa, zzz._aaaa = null;
  return M.chain(a(), zzz_2);
}
function bbbb_1(_bbbb) {
  return M.chain(eff3(), bbbb_2);
}
function bbbb_2(_bbbb) {}
function zzz_2(zzz) {
  var a;
  zzz._aaaa = function bbbb() {
    var _bbbb = M.context();
    return M.scope(bbbb_1);
  };
  a = zzz._aaaa, zzz._aaaa = null;
  return M.chain(a(), zzz_3);
}
function zzz_3(zzz) {}