function a_1(i) {
  return M.jM(eff(i), a_2);
}

function a_2(i) {
  return write(i);
}

function a() {
  return M.jMB(read1(), a_1);
}