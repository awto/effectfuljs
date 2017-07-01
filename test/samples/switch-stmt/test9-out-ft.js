function a_1(a_v) {
  var a;
  const a = a_v.i += 1;
  return M.jMB1(eff(a), a_2, a_v);
}

function a_2(a, a_v) {
  switch (a) {
    case 1:
      return M.jM1(effB(a_v.i += 3), a_3, a_v);

    case 2:
      return M.jM1(effB(a_v.i += 5), a_3, a_v);

    case 3:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_3(a_v) {
  return eff(a_v.i);
}

// *- with state
function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM1(eff(), a_1, a_v);
}