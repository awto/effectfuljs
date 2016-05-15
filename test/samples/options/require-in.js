// *- QSKIP
// *- M.require function

function a() {
  eff(1);
  eff(2);
  V(eff(2));
  V(eff(3));
  M(eff(4));
  M(eff(5));
}

var V = M.require("./require-sample");

function a() {
  eff(1);
  eff(2);
  V(eff(2));
  V(eff(3));
  M(eff(4));
  M(eff(5));
}




