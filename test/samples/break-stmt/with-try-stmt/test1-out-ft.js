function _1(ref_) {
  try {
    return M.jMB1E(eff(1), _2, ref_, _4);
  } catch (e) {
    return _4(e, ref_);
  }
}

function _2(a, ref_) {
  try {
    if (a) return _3(ref_);else {
      return M.jM1E(eff(2), _5, ref_, _4);
    }
  } catch (e) {
    return _4(e, ref_);
  }
}

function _3(ref_) {
  try {
    return M.jM1E(eff('before break'), _6, ref_, _4);
  } catch (e) {
    return _4(e, ref_);
  }
}

function _4(ex, ref_) {
  ref_.e = ex;
  return M.jM1(eff(3), _5, ref_);
}

function _5(ref_) {
  return M.jM1(eff(4), _6, ref_);
}

function _6(ref_) {
  return eff(5);
}

(function () {
  var ref_ = {
    e: undefined
  };
  return _1(ref_);
});