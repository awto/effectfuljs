function _1() {
  return M.jMB(eff(2), _2);
}

function _2(a) {
  if (a) return _3();else {
    return M.jM(eff(3), _3);
  }
}

function _3() {
  return M.jM(eff(4), _4);
}

function _4() {
  return eff(5);
}

function __1() {
  return M.jMB(eff(2), __2);
}

function __2(a) {
  if (a) return __3();else {
    return M.jM(eff(3), __4);
  }
}

function __3() {
  return M.jM(eff('a'), __4);
}

function __4() {
  return M.jM(eff(4), _5);
}

function _5() {
  return eff(5);
}

function _11() {
  return M.jMB(eff(2), _21);
}

function _21(a) {
  if (a) return _31();else {
    return M.jM(eff(4), __5);
  }
}

function _31() {
  return M.jM(eff('a'), _41);
}

function _41() {
  return eff('b');
}

function __5() {
  return eff(5);
}

(function () {
  return M.jM(eff(1), _1);
});

(function () {
  return M.jM(eff(1), __1);
});

(function () {
  return M.jM(eff(1), _11);
});