function a_1(a_v) {
  a_v.i += 1;

  switch (a_v.i += 2) {
    case 1:
      return M.jM1(effB(a_v.i += 3), a_2, a_v);

    case 2:
      return M.jM1(effB(a_v.i), a_2, a_v);

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
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM1(eff(), a_1, a_v);
}