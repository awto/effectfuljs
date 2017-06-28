function _1(a) {
  if (a) return M.pure();else {
    return eff(3);
  }
}

// *- when it is the last statement
(function () {
  return M.jMB(eff(2), _1);
});