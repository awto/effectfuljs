function a_1(i, j) {
  i++, j++;
  return M.jM2(function b(j, i, k) {
    var z;
    z = 0;
    return M.jM4(eff2(i, j, k, z), _1, j, i, k, z);

    function _1(j, i, k, z) {
      i++, j++, k++, z++;
      return M.jM4(eff3(i, j, k, z), _2, j, i, k, z);
    }

    function _2(j, i, k, z) {
      return eff4(i, j, k, z);
    }
  }(j, i, j), a_2, i, j);
}

function a_2(i, j) {
  i++, j++;
  return M.jM2(eff5(i, j), a_3, i, j);
}

function a_3(i, j) {
  return eff6(i, j);
}

function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff1(i, j), a_1, i, j);
}