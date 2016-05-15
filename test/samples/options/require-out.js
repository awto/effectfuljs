function a() {
  return M(eff(1)).mbind(function () {
    return eff(2);
  }).mbind(function () {
    return M(eff(2)).mbind(V);
  }).mbind(function () {
    return M(eff(3)).mbind(V);
  }).mbind(function () {
    return eff(4);
  }).mbind(function () {
    return eff(5);
  });
}

var V = require('./require-sample');
function a() {
  eff(1);
  eff(2);
  return M(V(eff(2))).mbind(function () {
    return V(eff(3));
  }).mbind(function () {
        return eff(4);
  }).mbind(function () {
    return eff(5);
  });
}


