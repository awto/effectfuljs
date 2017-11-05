(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(f_1, f_7, i, ref);
});

function f_1(i, ref) {
  if (i < 3) {
    return M.chain(eff(i), f_2, f_7, i, ref);
  } else {
    return M.pure();
  }
}

function f_2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return M.jump(f_3, f_7, i, j, len, ref);
}

function f_3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), f_4, f_7, i, j, len, ref);
  } else {
    return M.jump(f_6, f_7, i, ref);
  }
}

function f_4(a, i, j, len, ref) {
  if (a) {
    return M.jump(f_6, f_7, i, ref);
  } else {
    return M.chain(eff(2), f_5, f_7, i, j, len, ref);
  }
}

function f_5(a, i, j, len, ref) {
  if (a) {
    return M.pure();
  } else {
    j++;
    return M.repeat(f_3, f_7, i, j, len, ref);
  }
}

function f_6(i, ref) {
  i++;
  return M.repeat(f_1, f_7, i, ref);
}

function f_7(e) {
  return M.raise(e);
}