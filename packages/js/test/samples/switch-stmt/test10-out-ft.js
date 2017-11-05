function a() {
  var a = M.context();
  a._i = 0;
  return M.chain(eff(), a_1, a_4);
}

function a_1(a) {
  var b;
  a._i += 1;

  switch (a._i += 2) {
    case 1:
      b = a._i += 3;
      return M.chain(effB(b), a_2, a_4);

    case 2:
      return M.chain(effB(a._i), a_2, a_4);

    case 3:
      {
        console.log('hi', a._i);
      }

    default:
      return M.jump(a_2, a_4);
  }
}

function a_2(a) {
  return M.chain(eff(a._i), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}