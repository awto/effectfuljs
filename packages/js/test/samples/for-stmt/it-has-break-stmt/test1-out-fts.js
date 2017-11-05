(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(f_1, f_6, j, len, ref);
});

function f_1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.chain(eff(i), f_2, f_6, j, len, ref);
  } else {
    return M.jump(f_3, f_6);
  }
}

function f_2(a, j, len, ref) {
  if (a) {
    return M.jump(f_3, f_6);
  } else {
    j++;
    return M.repeat(f_1, f_6, j, len, ref);
  }
}

function f_3() {
  return M.chain(eff(2), f_4, f_6);
}

function f_4() {
  return M.chain(eff(3), f_5, f_6);
}

function f_5() {
  return M.pure();
}

function f_6(e) {
  return M.raise(e);
}