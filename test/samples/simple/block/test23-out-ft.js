function a_1(a, ref_) {
  var b;
  const b = ref_.j++;
  return M.jMB1(eff3(a, b), a_2, ref_);
}

function a_2(b, ref_) {
  return M.jMB2(eff5(ref_.i), a_3, ref_, b);
}

function a_3(c, ref_, b) {
  var a;
  return M.jMB1(eff2(a, b, c), a_4, ref_);
}

function a_4(a, ref_) {
  var b;
  const b = ref_.i++;
  return M.jMB1(eff1(a, b), a_5, ref_);
}

function a_5(a, ref_) {
  return eff0(a, ref_.i);
}

function a() {
  var ref_ = {
    i: undefined,
    j: undefined
  };
  ref_.i = 0;
  ref_.j = 0;
  const a = ref_.i++;
  return M.jMB1(eff4(ref_.i, ref_.j), a_1, ref_);
}