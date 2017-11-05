(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.jump(f_1, f_12, i, ref);
});

function f_1(i, ref) {
  if (i < 3) {
    return M.chain(eff(i), f_2, f_12, i, ref);
  } else {
    return M.jump(f_9, f_12);
  }
}

function f_2(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return M.jump(f_3, f_12, i, j, len, ref);
}

function f_3(i, j, len, ref) {
  if (j < len) {
    d = ref[j];
    return M.chain(eff(d), f_4, f_12, i, j, len, ref);
  } else {
    return M.jump(f_6, f_12, i, ref);
  }
}

function f_4(a, i, j, len, ref) {
  if (a) {
    return M.jump(f_6, f_12, i, ref);
  } else {
    return M.chain(eff(2), f_5, f_12, i, j, len, ref);
  }
}

function f_5(a, i, j, len, ref) {
  if (a) {
    return M.jump(f_9, f_12);
  } else {
    j++;
    return M.repeat(f_3, f_12, i, j, len, ref);
  }
}

function f_6(i, ref) {
  return M.chain(eff(3), f_7, f_12, i, ref);
}

function f_7(i, ref) {
  return M.chain(eff(4), f_8, f_12, i, ref);
}

function f_8(i, ref) {
  i++;
  return M.repeat(f_1, f_12, i, ref);
}

function f_9() {
  return M.chain(eff(5), f_10, f_12);
}

function f_10() {
  return M.chain(eff(6), f_11, f_12);
}

function f_11() {
  return M.pure();
}

function f_12(e) {
  return M.raise(e);
}