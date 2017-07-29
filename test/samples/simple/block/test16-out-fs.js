function a() {
  var i;
  i = 0;
  i++;
  return M.jM(eff1(i), _1, i);

  function _1(i) {
    return M.jM(eff(i), _2, i);
  }

  function _2(i) {
    {
      i++;
    }
    return eff2(i);
  }
}