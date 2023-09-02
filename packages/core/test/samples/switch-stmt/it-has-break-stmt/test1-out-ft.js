import * as M from "@effectful/core";
function a(z) {
  var a = M.context();
  a._z = z;
  return M.scope(_a_1);
}
function a_1(z) {
  var a_1 = M.context();
  a_1._z = z;
  return M.scope(a_1_1);
}
function c(z) {
  var c = M.context();
  c._z = z;
  return M.scope(c_1);
}
function d(z) {
  var d = M.context();
  d._z = z;
  return M.scope(d_1);
}
function _a_1(a) {
  switch (a._z) {
    case 1:
      a._z = null;
      return M.chain(eff(1), a_2);
    default:
      a._z = null;
      return M.chain(eff(2), a_2);
  }
}
function a_2(a) {
  return M.chain(eff(3), a_3);
}
function a_3(a) {}
function a_1_1(a_1) {
  switch (a_1._z) {
    case 1:
      a_1._z = null;
      return M.chain(eff(1), a_1_2);
    case 2:
      console.log("1");
      a_1._z = null;
      return M.jump(void 0, a_1_2);
    default:
      console.log("2");
      a_1._z = null;
      return M.jump(void 0, a_1_2);
  }
}
function a_1_2(a_1) {
  return M.chain(eff(3), a_1_3);
}
function a_1_3(a_1) {}
function c_1(c) {
  switch (c._z) {
    case 1:
      c._z = null;
      return M.chain(eff(1), c_2);
    case 2:
      c._z = null;
      return M.chain(eff(2), c_3);
    case 3:
      {
        console.log("z");
      }
    default:
      c._z = null;
      return M.chain(eff(3), c_2);
  }
}
function c_2(c) {
  return M.chain(eff(4), c_3);
}
function c_3(c) {
  return M.chain(eff(5), c_4);
}
function c_4(c) {}
function d_1(d) {
  switch (d._z) {
    case 1:
      d._z = null;
      return M.chain(eff(1), d_2);
    case 2:
      d._z = null;
      return M.chain(eff(2), d_3);
    case 3:
      console.log("z");
      d._z = null;
      return M.chain(eff(5), d_3);
    default:
      d._z = null;
      return M.chain(eff(3), d_2);
  }
}
function d_2(d) {
  return M.chain(eff(4), d_3);
}
function d_3(d) {
  return M.chain(eff(6), d_4);
}
function d_4(d) {}