(function () {
  return M.chainBH(eff(0), _1, _13);

  function _1() {
    return M.chainBH(eff(1), _2, _13);
  }

  function _2() {
    return M.chainBH(eff(2), _3, _13);
  }

  function _3() {
    return M.chainBH(eff(3), _4, _13);
  }

  function _4(a) {
    if (a) {
      return M.chainBH(eff(4), _9, _13);
    } else {
      return M.chainBH(eff(3), _5, _13);
    }
  }

  function _5(a) {
    if (a) {
      return M.chainBH(eff(4), _2, _13);
    } else {
      return M.chainBH(eff(5), _6, _13);
    }
  }

  function _6(a) {
    if (a) {
      return M.chainBH(eff(6), _1, _13);
    } else {
      return M.chainBH(eff(7), _7, _13);
    }
  }

  function _7(a) {
    if (a) {
      return M.chainBH(eff(8), _11, _13);
    } else {
      return M.chainBH(eff(9), _8, _13);
    }
  }

  function _8(a) {
    if (!a) {
      return M.jumpH(_9, _13);
    } else {
      return M.jumpRH(_2, _13);
    }
  }

  function _9() {
    return M.chainBH(eff(10), _10, _13);
  }

  function _10() {
    if (!true) {
      return M.jumpH(_11, _13);
    } else {
      return M.jumpRH(_1, _13);
    }
  }

  function _11() {
    return M.chainBH(eff(11), _12, _13);
  }

  function _12() {
    return M.pure();
  }

  function _13(e) {
    return M.raise(e);
  }
});