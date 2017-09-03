function a() {
  var i, a;
  a = i++;
  return M.j(eff1(a), _1);

  function _1() {
    var a;
    a = i++;
    return M.j(eff2(a), _2);
  }

  function _2() {
    return M.pure();
  }
}