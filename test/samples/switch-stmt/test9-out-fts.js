function a_1(i) {
  var a;
  const a = i += 1;
  return M.jMB1(eff(a), a_2, i);
}

function a_2(a, i) {
  switch (a) {
    case 1:
      return M.jM1(effB(i += 3), a_3, i);

    case 2:
      return M.jM1(effB(i += 5), a_3, i);

    case 3:
      {
        console.log('hi', i);
      }
  }
}

function a_3(i) {
  return eff(i);
}

// *- with state
function a() {
  var i;
  i = 0;
  return M.jM1(eff(), a_1, i);
}