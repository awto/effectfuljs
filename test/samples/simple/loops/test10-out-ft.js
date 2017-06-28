function a_1(a, ref_) {
  ref_.i = a;
  return a_2(ref_);
}

function a_2(ref_) {
  return M.jMB1(check(), a_3, ref_);
}

function a_3(a, ref_) {
  if (a === true) {
    return M.jMB1(initJ(), a_4, ref_);
  } else return M.pure();
}

function a_4(a, ref_) {
  ref_.j = a;
  return a_5(ref_);
}

function a_5(ref_) {
  return M.jMB1(checkJ(), a_6, ref_);
}

function a_6(a, ref_) {
  if (a === true) {
    if (ref_.i === ref_.j) {
      return M.jM1R(updJ(), a_5, ref_);
    } else return a_7(ref_);
  } else return a_7(ref_);
}

function a_7(ref_) {
  return M.jM1R(upd(), a_2, ref_);
}

function a() {
  var ref_ = {
    i: undefined,
    j: undefined
  };
  return M.jMB1(init(), a_1, ref_);
}