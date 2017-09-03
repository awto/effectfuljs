// *- with state
function a() {
  var i;
  i = 0;
  return M.j(eff(), a_1, i);
}

function a_1(i) {
  var a;
  a = i += 1;
  return M.jB(eff(a), a_2, i);
}

function a_2(a, i) {
  var b, c;

  switch (a) {
    case 1:
      b = i += 3;
      return M.j(effB(b), a_3, i);

    case 2:
      c = i += 5;
      return M.j(effB(c), a_3, i);

    case 3:
      {
        console.log('hi', i);
      }
  }
}

function a_3(i) {
  return M.j(eff(i), a_4);
}

function a_4() {
  return M.pure();
}