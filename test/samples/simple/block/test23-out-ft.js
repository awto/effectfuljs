function a_1(a, a_v) {
  var b;
  const b = a_v.j++;
  return M.jMB1(eff3(a, b), a_2, a_v);
}

function a_2(b, a_v) {
  return M.jMB2(eff5(a_v.i), a_3, a_v, b);
}

function a_3(c, a_v, b) {
  var a;
  return M.jMB1(eff2(a, b, c), a_4, a_v);
}

function a_4(a, a_v) {
  var b;
  const b = a_v.i++;
  return M.jMB1(eff1(a, b), a_5, a_v);
}

function a_5(a, a_v) {
  return eff0(a, a_v.i);
}

function a() {
  var a_v;
  a_v = {
    i: undefined,
    j: undefined
  };
  a_v.i = 0;
  a_v.j = 0;
  const a = a_v.i++;
  return M.jMB1(eff4(a_v.i, a_v.j), a_1, a_v);
}