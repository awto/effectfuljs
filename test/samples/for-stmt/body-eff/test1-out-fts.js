(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);
});

function _1(j, len, ref) {
  if (j < len) return _2(j, len, ref);else {
    return M.pure();
  }
}

function _2(j, len, ref) {
  var i;
  i = ref[j];
  return M.j(eff(i), _3, j, len, ref);
}

function _3(j, len, ref) {
  j++;
  return M.jR(_1, j, len, ref);
}