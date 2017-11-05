// *- with state
function a() {
  var i;
  i = 0;
  return M.chain(eff(), a_1, a_5, i);
}

function a_1(i) {
  var a;
  a = i += 1;
  return M.chain(eff(a), a_2, a_5, i);
}

function a_2(a, i) {
  var b, c;

  switch (a) {
    case 1:
      b = i += 3;
      return M.chain(effB(b), a_3, a_5, i);

    case 2:
      c = i += 5;
      return M.chain(effB(c), a_3, a_5, i);

    case 3:
      {
        console.log('hi', i);
      }

    default:
      return M.jump(a_3, a_5, i);
  }
}

function a_3(i) {
  return M.chain(eff(i), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}