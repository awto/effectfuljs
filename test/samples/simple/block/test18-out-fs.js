function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.jM(eff0(a), _1, i);

  function _1(i) {
    return M.jM(eff1(i), _2, i);
  }

  function _2(i) {
    i += 1;
    return M.jM(eff2(2), _3, i);
  }

  function _3(i) {
    var a;
    a = i += 2;
    return eff3(a);
  }
}