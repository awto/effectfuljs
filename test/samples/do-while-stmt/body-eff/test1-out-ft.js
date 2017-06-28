function _1() {
  return M.jMB(eff(2), _2);
}

function _2(a) {
  if (a) return _1();else {
    return M.jM(eff(3), _3);
  }
}

function _3() {
  return M.jMB(eff(1), _4);
}

function _4(a) {
  if (!a) return M.pure();else return _1();
}

(function () {
  return _1();
});