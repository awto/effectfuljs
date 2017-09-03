// *- with mixed effect/pure branches
function a() {
  return M.jB(eff(), a_1);
}

function a_1(a) {
  return M.jB(check(1), a_2, a);
}

function a_2(b, a) {
  return M.jB(check(2), a_3, a, b);
}

function a_3(c, a, b) {
  return M.jB(check(3), a_4, a, b, c);
}

function a_4(d, a, b, c) {
  return M.jB(check(4), a_5, a, b, c, d);
}

function a_5(e, a, b, c, d) {
  return M.jB(check(8), a_6, a, b, c, d, e);
}

function a_6([f, a, b, c, d, e]) {
  switch (a) {
    case b:
      return M.j(effB(1), a_7);

    case c:
      {
        console.log(2);
      }

    case d:
      return a_7();

    case e:
      console.log(5);
      return a_8();

    case 5:
      {
        console.log(6);
      }

    case 6:
      console.log(7);
      return a_8();

    case f:
      return M.j(effB(3), a_8);
  }
}

function a_7() {
  return M.j(effB(2), a_8);
}

function a_8() {
  return M.pure();
}