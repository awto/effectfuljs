function a_1(i) {
  i += 1;

  switch (i += 2) {
    case 1:
      return M.jM1(effB(i += 3), a_2, i);

    case 2:
      return M.jM1(effB(i), a_2, i);

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
  return M.jM1(eff(), a_1, i);
}