import * as M from '@effectful/core';

// *- with mixed effect/pure branches
function a() {
  var a = M.context();
  return M.scope(a_1, a_10);
}

function a_1(a) {
  return M.chain(eff(), a_2, a_10);
}

function a_2(a, b) {
  a._pat = b;
  return M.chain(check(1), a_3, a_10);
}

function a_3(a, b) {
  if (a._pat === b) {
    return M.chain(effB(1), a_4, a_10);
  } else {
    return M.jump(void 0, a_4, a_10);
  }
}

function a_4(a) {
  return M.chain(check(2), a_5, a_10);
}

function a_5(a, b) {
  if (a._pat === b) {
    console.log(2);
  }

  return M.chain(check(3), a_6, a_10);
}

function a_6(a, b) {
  if (a._pat === b) {
    return M.chain(effB(2), a_9, a_10);
  } else {
    return M.chain(check(4), a_7, a_10);
  }
}

function a_7(a, b) {
  if (a._pat === b) {
    console.log(5);
    return M.pure();
  } else {
    if (a._pat === 5) {
      console.log(6);
    }

    if (a._pat === 6) {
      console.log(7);
      return M.pure();
    } else {
      return M.chain(check(8), a_8, a_10);
    }
  }
}

function a_8(a, b) {
  if (a._pat === b) {
    return M.chain(effB(3), a_9, a_10);
  } else {
    return M.pure();
  }
}

function a_9(a) {
  return M.pure();
}

function a_10(a, e) {
  return M.raise(e);
}