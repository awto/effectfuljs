function a() {
  var a_v = {
    e: undefined
  };

  try {
    return M.jH(eff(1), a_2, a_1, a_v, a_3);
  } catch (e) {
    return a_1(e, a_v, undefined);
  }
}

function a_1(e, a_v, cb) {
  console.log(a_v.e);
  return a_2(a_v, a_3);
}

function a_2(a_v, cb) {
  console.log('fin');
  return cb();
}

function a_3() {
  return M.pure();
}