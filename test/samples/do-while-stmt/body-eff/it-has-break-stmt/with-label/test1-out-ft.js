(function () {
  return M.j(eff(0), _1);
});

function _1() {
  return M.j(eff(1), _2);
}

function _2() {
  return M.j(eff(2), _3);
}

function _3() {
  return M.jB(eff(3), _4);
}

function _4(a) {
  if (a) return _5();else {
    return M.jB(eff(3), _6);
  }
}

function _5() {
  return M.j(eff(4), _13);
}

function _6(a) {
  if (a) return _7();else {
    return M.jB(eff(5), _8);
  }
}

function _7() {
  return M.j(eff(4), _2);
}

function _8(a) {
  if (a) return _9();else {
    return M.jB(eff(7), _10);
  }
}

function _9() {
  return M.j(eff(6), _1);
}

function _10(a) {
  if (a) return _11();else {
    return M.jB(eff(9), _12);
  }
}

function _11() {
  return M.j(eff(8), _15);
}

function _12(a) {
  if (!a) return _13();else return _2();
}

function _13() {
  return M.j(eff(10), _14);
}

function _14() {
  if (!true) return _15();else return _1();
}

function _15() {
  return M.j(eff(11), _16);
}

function _16() {
  return M.pure();
}