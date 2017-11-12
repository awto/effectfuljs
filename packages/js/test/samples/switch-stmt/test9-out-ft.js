// *- with state
function a() {
  var a = M.context();
  return M.scope(a_1, a_6);
}

function a_1(a) {
  a._i = 0;
  return M.chain(eff(), a_2, a_6);
}

function a_2(a) {
  var b;
  b = a._i += 1;
  return M.chain(eff(b), a_3, a_6);
}

function a_3(a, b) {
  var c, d;

  switch (b) {
    case 1:
      c = a._i += 3;
      return M.chain(effB(c), a_4, a_6);

    case 2:
      d = a._i += 5;
      return M.chain(effB(d), a_4, a_6);

    case 3:
      {
        console.log('hi', a._i);
      }

    default:
      return M.jump(a_4, a_6);
  }
}

function a_4(a) {
  return M.chain(eff(a._i), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}