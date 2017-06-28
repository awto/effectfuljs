function a_1(ref_) {
  return M.jMB1(eff2(), a_2, ref_);
}

function a_2(a, ref_) {
  ref_.i = a;
  return M.jMB1(eff3(), a_3, ref_);
}

function a_3(a, ref_) {
  ref_.j = a;
  return a_4(ref_);
}

function a_4(ref_) {
  if (ref_.i < 10 && ref_.j > -10) return a_5(ref_);else {
    return eff5(ref_.i, ref_.j);
  }
}

function a_5(ref_) {
  return M.jMB1(eff3(ref_.i), a_6, ref_);
}

function a_6(a, ref_) {
  ref_._k = a;
  return M.jM1(eff4(ref_._k++), a_7, ref_);
}

function a_7(ref_) {
  ref_.i++, ref_.j--;
  return M.jNR(a_4, ref_);
}

// *- should inject forPar
function a() {
  var ref_ = {
    k: undefined,
    i: undefined,
    j: undefined,
    _k: undefined
  };
  return M.jM1(eff1(), a_1, ref_);
}