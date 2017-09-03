function a() {
  var i, a;
  a = i++;
  return M.j(eff1(a), _1, i);

  function _1(i) {
    var a;
    a = i++;
    return M.j(eff2(a), _2);
  }

  function _2() {
    return M.pure();
  }
}