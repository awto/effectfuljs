function a() {
  var j;
  j = 0;
  return M.jM(eff(j), _1, j);

  function _1(j) {
    var a;
    a = j++;
    return M.jM(eff(a), _2, j);
  }

  function _2(j) {
    return M.jM(eff2(j), _3, j);
  }

  function _3(j) {
    var a;
    a = j++;
    return eff3(a);
  }
}