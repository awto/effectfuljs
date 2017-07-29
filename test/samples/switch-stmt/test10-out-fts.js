function a_1(i) {
  var a, b;
  i += 1;
  a = i += 2;

  switch (a) {
    case 1:
      b = i += 3;
      return M.jM(effB(b), a_2, i);

    case 2:
      return M.jM(effB(i), a_2, i);

    case 3:
      {
        console.log('hi', i);
      }
  }
}

function a_2(i) {
  return eff(i);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff(), a_1, i);
}