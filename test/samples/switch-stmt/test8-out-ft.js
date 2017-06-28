function a_1(ref_) {
  var a;
  const a = ref_.i += 1;
  return M.jMB1(eff(a), a_2, ref_);
}

function a_2(a, ref_) {
  var b;
  const b = ref_.i += 2;
  return M.jMB2(check(b), a_3, ref_, a);
}

function a_3(b, ref_, a) {
  var c;
  const c = ref_.i += 4;
  return M.jMB3(check(c), a_4, ref_, a, b);
}

function a_4(c, ref_, a, b) {
  var d;
  const d = ref_.i += 6;
  return M.jMB4(check(d), a_5, ref_, a, b, c);
}

function a_5(d, ref_, a, b, c) {
  switch (a) {
    case b:
      return M.jM1(effB(ref_.i += 3), a_6, ref_);

    case c:
      return M.jM1(effB(ref_.i += 5), a_6, ref_);

    case d:
      {
        console.log('hi', ref_.i);
      }
  }
}

function a_6(ref_) {
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