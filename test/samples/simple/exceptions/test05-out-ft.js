function a_1(ref_) {
  try {
    return M.jM1E(eff(1), a_2, ref_, a_3);
  } catch (e) {
    return a_3(e, ref_);
  }
}

function a_2(ref_) {
  return a_4(ref_);
}

function a_3(ex, ref_) {
  ref_.e = ex;
  console.log(ref_.e);
  return a_4(ref_);
}

function a_4(ref_) {
  console.log('fin');
  return M.pure();
}

function a() {
  var ref_ = {
    e: undefined
  };
  return a_1(ref_);
}