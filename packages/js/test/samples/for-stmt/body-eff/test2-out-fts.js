(function () {
  var i, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.jump(f_1, f_6, i, len, ref);
});

function f_1(i, len, ref) {
  var j;

  if (i < len) {
    j = 0, len = ref.length;
    return M.jump(f_2, f_6, i, j, len, ref);
  } else {
    return M.chain(eff(3), f_5, f_6);
  }
}

function f_2(i, j, len, ref) {
  var d;

  if (j < len) {
    d = ref[j];
    return M.chain(eff(i), f_3, f_6, i, j, len, ref);
  } else {
    return M.chain(eff(2), f_4, f_6, i, len, ref);
  }
}

function f_3(i, j, len, ref) {
  j++;
  return M.repeat(f_2, f_6, i, j, len, ref);
}

function f_4(i, len, ref) {
  i++;
  return M.repeat(f_1, f_6, i, len, ref);
}

function f_5() {
  return M.pure();
}

function f_6(e) {
  return M.raise(e);
}