function a_1(a_v) {
  var a, b;
  a_v.i += 1;
  a = a_v.i += 2;

  switch (a) {
    case 1:
      b = a_v.i += 3;
      return M.jM(effB(b), a_2, a_v);

    case 2:
      return M.jM(effB(a_v.i), a_2, a_v);

    case 3:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_2(a_v) {
  return eff(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM(eff(), a_1, a_v);
}