function a_1(i) {
  var a;
  a = i += 1;
  return M.jMB(eff(a), a_2, i);
}

function a_2(a, i) {
  var b, c;

  switch (a) {
    case 1:
      b = i += 3;
      return M.jM(effB(b), a_3, i);

    case 2:
      c = i += 5;
      return M.jM(effB(c), a_3, i);

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
  return M.jM(eff(), a_1, i);
}