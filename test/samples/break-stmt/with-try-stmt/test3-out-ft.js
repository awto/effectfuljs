function _1(ref_) {
  try {
    return M.jM1E(eff(2), _3, ref_, _2);
  } catch (e) {
    return _2(e, ref_);
  }
}

function _2(ex, ref_) {
  ref_.e = ex;
  return M.jM1(eff(3), _3, ref_);
}

function _3(ref_) {
  return eff(4);
}

(function () {
  var ref_ = {
    e: undefined
  };
  return _1(ref_);
});