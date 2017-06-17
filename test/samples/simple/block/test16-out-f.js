function a() {
  var i;
  i = 0;
  {
    i++;
  }
  return M.jM(eff1(i), _1);

  function _1() {
    return M.jM(eff(i), _2);
  }

  function _2() {
    {
      i++;
    }
    return eff2(i);
  }
}