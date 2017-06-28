function _1(ref_) {
  try {
    return M.jM1E(eff(2), _2, ref_, _5);
  } catch (e) {
    return _5(e, ref_);
  }
}

function _2(ref_) {
  try {
    return M.jMB1E(eff(3), _3, ref_, _5);
  } catch (e) {
    return _5(e, ref_);
  }
}

function _3(a, ref_) {
  try {
    if (a) return _7(ref_);else {
      return M.jM1E(M.throw(new Error('error')), _4, ref_, _5);
    }
  } catch (e) {
    return _5(e, ref_);
  }
}

function _4(ref_) {
  try {
    return M.jM1E(eff(4), _6, ref_, _5);
  } catch (e) {
    return _5(e, ref_);
  }
}

function _5(ex, ref_) {
  ref_.e = ex;
  return M.jM1(eff(5), _6, ref_);
}

function _6(ref_) {
  return M.jM1(eff(6), _7, ref_);
}

function _7(ref_) {
  return eff(7);
}

(function () {
  var ref_ = {
    e: undefined
  };
  return _1(ref_);
});