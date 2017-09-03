// *- with state
function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.j(eff(), a_1, a_v);
}

function a_1(a_v) {
  var a;
  a = a_v.i += 1;
  return M.jB(eff(a), a_2, a_v);
}

function a_2(a, a_v) {
  var b, c;

  switch (a) {
    case 1:
      b = a_v.i += 3;
      return M.j(effB(b), a_3, a_v);

    case 2:
      c = a_v.i += 5;
      return M.j(effB(c), a_3, a_v);

    case 3:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_3(a_v) {
  return M.j(eff(a_v.i), a_4);
}

function a_4() {
  return M.pure();
}