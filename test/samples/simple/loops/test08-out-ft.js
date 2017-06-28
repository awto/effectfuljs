function a_1(a, ref_) {
  ref_.i = a;
  return a_2(ref_);
}

function a_2(ref_) {
  return M.jMB1(check(), a_3, ref_);
}

function a_3(a, ref_) {
  if (a === true) {
    return M.jM1(b1(), a_4, ref_);
  } else return M.pure();
}

function a_4(ref_) {
  if (v) return a_5(ref_);else return a_6(ref_);
}

function a_5(ref_) {
  return M.jM1(e(), a_6, ref_);
}

function a_6(ref_) {
  return M.jM1R(upd(), a_2, ref_);
}

function a() {
  var ref_ = {
    i: undefined
  };
  return M.jMB1(init(), a_1, ref_);
}