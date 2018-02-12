import * as M from '@effectful/core';

// *- with state
function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  a._i = 0;
  return M.chain(eff(), a_2);
}

function a_2(a) {
  var b;
  b = a._i += 1;
  return M.chain(eff(b), a_3);
}

function a_3(a, b) {
  var c;
  a._pat = b;
  c = a._i += 2;
  return M.chain(check(c), a_4);
}

function a_4(a, b) {
  var c, d;

  if (a._pat === b) {
    c = a._i += 3;
    return M.chain(effB(c), a_7);
  } else {
    d = a._i += 4;
    return M.chain(check(d), a_5);
  }
}

function a_5(a, b) {
  var c, d;

  if (a._pat === b) {
    c = a._i += 5;
    return M.chain(effB(c), a_7);
  } else {
    d = a._i += 6;
    return M.chain(check(d), a_6);
  }
}

function a_6(a, b) {
  if (a._pat === b) {
    console.log('hi', a._i);
  }

  return M.chain(eff(a._i), a_7);
}

function a_7(a) {}