function a_1(ref_) {
  try {
    return M.jME(eff(1), M.pure, a_2);
  } catch (e) {
    return a_2(e, ref_);
  }
}

function a_2(ex, ref_) {
  ref_.e = ex;
  console.log(ref_.e, 1);
  return M.jM1(eff(2), a_3, ref_);
}

function a_3(ref_) {
  console.log(ref_.e, 2);
  return M.pure();
}

function a() {
  var ref_ = {
    e: undefined
  };
  return a_1(ref_);
}