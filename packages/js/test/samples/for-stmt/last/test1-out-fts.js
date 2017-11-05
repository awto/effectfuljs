(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jump(f_1, f_3, j, len, ref);
});

function f_1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.chain(eff(i), f_2, f_3, j, len, ref);
  } else {
    return M.pure();
  }
}

function f_2(a, j, len, ref) {
  if (a) {
    return M.pure();
  } else {
    j++;
    return M.repeat(f_1, f_3, j, len, ref);
  }
}

function f_3(e) {
  return M.raise(e);
}