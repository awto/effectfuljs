function a_1(ref_) {
  var a;
  const a = ref_.i += 1;
  return M.jMB1(eff(a), a_2, ref_);
}

function a_2(a, ref_) {
  switch (a) {
    case 1:
      return M.jM1(effB(ref_.i += 3), a_3, ref_);

    case 2:
      return M.jM1(effB(ref_.i += 5), a_3, ref_);

    case 3:
      {
        console.log('hi', ref_.i);
      }
  }
}

function a_3(ref_) {
  return eff(ref_.i);
}

// *- with state
function a() {
  var ref_ = {
    i: undefined
  };
  ref_.i = 0;
  return M.jM1(eff(), a_1, ref_);
}