function a_1(ref_) {
  try {
    console.log('1');
    return M.jM1E(eff(1), a_3, ref_, a_2);
  } catch (e) {
    return a_2(e, ref_);
  }
}

function a_2(ex, ref_) {
  ref_._error = ex;
  ref_.e = ref_._error;
  console.log('2');
  return a_3(ref_);
}

function a_3(ref_) {
  return eff(ref_.e);
}

function a() {
  var ref_ = {
    e: undefined,
    error: undefined,
    _error: undefined
  };
  return a_1(ref_);
}