function a_1(a_v) {
  var a;
  a = a_v.i += 1;
  return M.jMB1(eff(a), a_2, a_v);
}

function a_2(a, a_v) {
  var b;
  b = a_v.i += 2;
  return M.jMB2(check(b), a_3, a_v, a);
}

function a_3(b, a_v, a) {
  var c;
  c = a_v.i += 4;
  return M.jMB3(check(c), a_4, a_v, a, b);
}

function a_4(c, a_v, a, b) {
  var d;
  d = a_v.i += 6;
  return M.jMB4(check(d), a_5, a_v, a, b, c);
}

function a_5(d, a_v, a, b, c) {
  switch (a) {
    case b:
      return M.jM1(effB(a_v.i += 3), a_6, a_v);

    case c:
      return M.jM1(effB(a_v.i += 5), a_6, a_v);

    case d:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_6(a_v) {
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