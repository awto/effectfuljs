function a() {
  var i;
  i = 0;
  return M.j(eff(), a_1, i);
}

function a_1(i) {
  var a, b;
  i += 1;
  a = i += 2;

  switch (a) {
    case 1:
      b = i += 3;
      return M.j(effB(b), a_2, i);

    case 2:
      return M.j(effB(i), a_2, i);

    case 3:
      {
        console.log('hi', i);
      }
  }
}

function a_2(i) {
  return M.j(eff(i), a_3);
}

function a_3() {
  return M.pure();
}