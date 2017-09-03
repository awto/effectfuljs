function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.j(eff(), a_1, a_v);
}

function a_1(a_v) {
  var a, b;
  a_v.i += 1;
  a = a_v.i += 2;

  switch (a) {
    case 1:
      b = a_v.i += 3;
      return M.j(effB(b), a_2, a_v);

    case 2:
      return M.j(effB(a_v.i), a_2, a_v);

    case 3:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_2(a_v) {
  return M.j(eff(a_v.i), a_3);
}

function a_3() {
  return M.pure();
}