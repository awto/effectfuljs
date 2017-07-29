function a_1(a) {
  return M.jMB(check(1), a_2, a);
}

function a_2(b, a) {
  return M.jMB(check(2), a_3, a, b);
}

function a_3(c, a, b) {
  return M.jMB(check(3), a_4, a, b, c);
}

function a_4(d, a, b, c) {
  return M.jMB(check(4), a_5, a, b, c, d);
}

function a_5(e, a, b, c, d) {
  return M.jMB(check(8), a_6, a, b, c, d, e);
}

function a_6(f, a, b, c, d, e) {
  switch (a) {
    case b:
      return M.jM(effB(1), a_7);

    case c:
      {
        console.log(2);
      }

    case d:
      return a_7();

    case e:
      console.log(5);
      return M.pure();

    case 5:
      {
        console.log(6);
      }

    case 6:
      console.log(7);
      return M.pure();

    case f:
      return effB(3);
  }
}

function a_7() {
  return effB(2);
}

// *- with mixed effect/pure branches
function a() {
  return M.jMB(eff(), a_1);
}