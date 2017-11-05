function a() {
  var i;
  i = 0;
  return M.chain(eff(), a_1, a_4, i);
}

function a_1(i) {
  var a;
  i += 1;

  switch (i += 2) {
    case 1:
      a = i += 3;
      return M.chain(effB(a), a_2, a_4, i);

    case 2:
      return M.chain(effB(i), a_2, a_4, i);

    case 3:
      {
        console.log('hi', i);
      }

    default:
      return M.jump(a_2, a_4, i);
  }
}

function a_2(i) {
  return M.chain(eff(i), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}