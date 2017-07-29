function a_1(a, a_v) {
  a_v.i = a;
  return M.jM(eff(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  return write(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  return M.jMB(read1(), a_1, a_v);
}