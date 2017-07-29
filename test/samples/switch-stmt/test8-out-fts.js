function a_1(i) {
  var a;
  a = i += 1;
  return M.jMB(eff(a), a_2, i);
}

function a_2(a, i) {
  var b;
  b = i += 2;
  return M.jMB(check(b), a_3, i, a);
}

function a_3(b, i, a) {
  var c;
  c = i += 4;
  return M.jMB(check(c), a_4, i, a, b);
}

function a_4(d, i, a, b) {
  var c;
  c = i += 6;
  return M.jMB(check(c), a_5, i, a, b, d);
}

function a_5(f, i, a, b, d) {
  var c, e;

  switch (a) {
    case b:
      c = i += 3;
      return M.jM(effB(c), a_6, i);

    case d:
      e = i += 5;
      return M.jM(effB(e), a_6, i);

    case f:
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
  return M.jM(eff(), a_1, i);
}