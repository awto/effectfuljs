import * as M from '@effectful/core';

// *- when there is a mix of pure and effectful branches
function a() {
  if (true) {
    return eff(1);
  } else {
    return 3;
  }
}

function b() {
  if (true) {
    return M.chain(eff(1), _1);
  } else {
    console.log(3);
    return M.jump(void 0, _1);
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {
    return M.chain(eff(4), _3);
  }

  function _3() {}
}

function c() {
  if (true) {
    return M.chain(eff(1), _1);
  } else {
    console.log(3);
    return 3;
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {
    return M.chain(eff(4), _3);
  }

  function _3() {
    var r;
    return r;
  }
}

function d() {
  return M.chain(eff('a'), _1);

  function _1() {
    if (true) {
      return M.chain(eff(1), _2);
    } else {
      console.log(3);
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {}
}

function e() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {} else {
      return M.chain(eff('2'), _2);
    }
  }

  function _2() {}
}

function f() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {
      return eff('i');
    } else {
      return M.chain(eff('2'), _2);
    }
  }

  function _2() {
    var r;
    return r;
  }
}

function g() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {} else {
      console.log('2');
    }
  }
}

function h() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {} else {
      console.log('2');
      return M.chain(eff('2'), _2);
    }
  }

  function _2() {}
}

function i() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {} else {
      console.log('2');
      return M.chain(eff(2), _2);
    }
  }

  function _2() {}
}

function j() {
  return M.chain(eff('1'), _1);

  function _1(a) {
    if (a) {} else {
      console.log('2');
      return M.chain(eff(2), _2);
    }
  }

  function _2() {
    console.log('3');
  }
}