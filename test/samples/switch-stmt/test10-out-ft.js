function a_1(ref_) {
  ref_.i += 1;

  switch (ref_.i += 2) {
    case 1:
      return M.jM1(effB(ref_.i += 3), a_2, ref_);

    case 2:
      return M.jM1(effB(ref_.i), a_2, ref_);

    case 3:
      {
        console.log('hi', ref_.i);
      }
  }
}

function a_2(ref_) {
  return eff(ref_.i);
}

function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff(), a_1, ref_);
}