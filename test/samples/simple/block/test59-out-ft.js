function a_1(a, a_v) {
  a_v.i = a;
  return M.jM1(eff(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  return write(a_v.i);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jMB1(read1(), a_1, a_v);
}