function a() {
  i = 0;
  {
    i++;
  }
  return M.jM1(eff1(i), _1, i);

  function _1(i) {
    return M.jM1(eff(i), _2, i);
  }

  function _2(i) {
    {
      i++;
    }
    return eff2(i);
  }
}