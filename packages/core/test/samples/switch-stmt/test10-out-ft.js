import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scopeH(a_1, a_5);
}

function a_1(a) {
  a._i = 0;
  return M.chainBH(eff(), a_2, a_5);
}

function a_2(a) {
  var b;
  a._i += 1;

  switch (a._i += 2) {
    case 1:
      b = a._i += 3;
      return M.chainBH(effB(b), a_3, a_5);

    case 2:
      return M.chainBH(effB(a._i), a_3, a_5);

    case 3:
      {
        console.log('hi', a._i);
      }

    default:
      return M.jumpH(a_3, a_5);
  }
}

function a_3(a) {
  return M.chainBH(eff(a._i), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}