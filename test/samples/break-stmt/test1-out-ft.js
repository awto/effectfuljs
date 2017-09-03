(function () {
  return M.j(eff(1), _1);
});

(function () {
  return M.j(eff(1), _6);
});

(function () {
  return M.j(eff(1), _12);
});

function _1() {
  return M.jB(eff(2), _2);
}

function _2(a) {
  if (a) return _3();else {
    return M.j(eff(3), _3);
  }
}

function _3() {
  return M.j(eff(4), _4);
}

function _4() {
  return M.j(eff(5), _5);
}

function _5() {
  return M.pure();
}

function _6() {
  return M.jB(eff(2), _7);
}

function _7(a) {
  if (a) return _8();else {
    return M.j(eff(3), _9);
  }
}

function _8() {
  return M.j(eff('a'), _9);
}

function _9() {
  return M.j(eff(4), _10);
}

function _10() {
  return M.j(eff(5), _11);
}

function _11() {
  return M.pure();
}

function _12() {
  return M.jB(eff(2), _13);
}

function _13(a) {
  if (a) return _14();else {
    return M.j(eff(4), _17);
  }
}

function _14() {
  return M.j(eff('a'), _15);
}

function _15() {
  return M.jB(eff('b'), _16);
}

function _16(a) {
  return M.pure(a);
}

function _17() {
  return M.j(eff(5), _18);
}

function _18() {
  return M.pure();
}