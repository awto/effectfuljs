function a_1(i) {
  var a;
  const a = i += 1;
  return M.jMB1(eff(a), a_2, i);
}

function a_2(a, i) {
  var b;
  const b = i += 2;
  return M.jMB2(check(b), a_3, i, a);
}

function a_3(b, i, a) {
  var c;
  const c = i += 4;
  return M.jMB3(check(c), a_4, i, a, b);
}

function a_4(c, i, a, b) {
  var d;
  const d = i += 6;
  return M.jMB4(check(d), a_5, i, a, b, c);
}

function a_5(d, i, a, b, c) {
  switch (a) {
    case b:
      return M.jM1(effB(i += 3), a_6, i);

    case c:
      return M.jM1(effB(i += 5), a_6, i);

    case d:
      {
        console.log('hi', i);
      }
  }
}

function a_6(i) {
  return eff(i);
}

// *- with state
function a() {
  var i;
  i = 0;
  return M.jM1(eff(), a_1, i);
}