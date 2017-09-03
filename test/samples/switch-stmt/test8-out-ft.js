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
  var b;
  b = a_v.i += 2;
  return M.jB(check(b), a_3, a_v, a);
}

function a_3(b, a_v, a) {
  var c;
  c = a_v.i += 4;
  return M.jB(check(c), a_4, a_v, a, b);
}

function a_4(d, a_v, a, b) {
  var c;
  c = a_v.i += 6;
  return M.jB(check(c), a_5, a_v, a, b, d);
}

function a_5(f, a_v, a, b, d) {
  var c, e;

  switch (a) {
    case b:
      c = a_v.i += 3;
      return M.j(effB(c), a_6, a_v);

    case d:
      e = a_v.i += 5;
      return M.j(effB(e), a_6, a_v);

    case f:
      {
        console.log('hi', a_v.i);
      }
  }
}

function a_6(a_v) {
  return M.j(eff(a_v.i), a_7);
}

function a_7() {
  return M.pure();
}