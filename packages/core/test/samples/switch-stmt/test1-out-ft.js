import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function c() {
  var c = M.context();
  return M.scope(c_1);
}

function a_1(a) {
  return M.chain(eff(), a_2);
}

function a_2(a, b) {
  a._pat = b;
  return M.chain(effC(1), a_3);
}

function a_3(a, b) {
  if (a._pat === b) {
    return M.chain(effR(1), a_6);
  } else {
    return M.chain(effC(2), a_4);
  }
}

function a_4(a, b) {
  if (a._pat === b) {
    return M.chain(effR(2), a_5);
  } else {
    return M.jump(void 0, a_5);
  }
}

function a_5(a) {
  return M.chain(effR('default'), a_6);
}

function a_6(a) {}

function c_1(c) {
  return M.chain(eff(1), c_2);
}

function c_2(c, a) {
  c._pat = a;
  return M.chain(eff(2), c_3);
}

function c_3(c, a) {
  if (c._pat === a) {
    return M.chain(eff(3), c_4);
  } else {
    return M.jump(void 0, c_4);
  }
}

function c_4(c) {
  return M.chain(eff(4), c_5);
}

function c_5(c, a) {
  if (c._pat === a) {
    return M.chain(eff(5), c_7);
  } else {
    if (c._pat === 6) {
      return M.chain(eff(7), c_6);
    } else {
      return M.jump(void 0, c_6);
    }
  }
}

function c_6(c) {
  if (c._pat === 8) {
    console.log(9);
  }

  return M.chain(eff(10), c_7);
}

function c_7(c) {}