function a() {
  var i,
      b = function b(i) {
    var _a_v = a_v;
    return M.j(eff1(i, _a_v.j), b_1, i, _a_v);
  },
      a_v = {
    j: undefined,
    b: b
  };

  i = 0;
  a_v.j = 0;
  return M.j(eff3(i, a_v.j), a_1, i, a_v);
}

function b_1(i, _a_v) {
  i++, _a_v.j++;
  return M.j(eff2(i, _a_v.j), b_2);
}

function b_2() {
  return M.pure();
}

function a_1(i, a_v) {
  i++, a_v.j--;
  return M.j(a_v.b(i), a_2, i, a_v);
}

function a_2(i, a_v) {
  i--, a_v.j++;
  return M.j(eff4(i, a_v.j), a_3);
}

function a_3() {
  return M.pure();
}