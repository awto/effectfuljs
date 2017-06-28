function _1(i, ref) {
  if (i < 3) return _2(i, ref);else return M.pure();
}

function _2(i, ref) {
  return M.jM2(eff(i), _3, i, ref);
}

function _3(i, ref) {
  var j, len;
  j = 0, len = ref.length;
  return _4(i, j, len, ref);
}

function _4(i, j, len, ref) {
  if (j < len) return _5(i, j, len, ref);else return _8(i, ref);
}

function _5(i, j, len, ref) {
  d = ref[j];
  return M.jMB4(eff(d), _6, i, j, len, ref);
}

function _6(a, i, j, len, ref) {
  if (a) return _8(i, ref);else {
    return M.jMB4(eff(2), _7, i, j, len, ref);
  }
}

function _7(a, i, j, len, ref) {
  if (a) return M.pure();else {
    j++;
    return M.jNR(_4, i, j, len, ref);
  }
}

function _8(i, ref) {
  i++;
  return M.jNR(_1, i, ref);
}

(function () {
  var i, ref;
  ref = [1, 2, 3];
  i = 0;
  return _1(i, ref);
});