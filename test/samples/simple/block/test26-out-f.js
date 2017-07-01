function a() {
  var i;
  const a = i++;
  return M.jMB(eff1(a), _1);

  function _1(a) {
    i = a;
    return M.jM(eff2(i), _2);
  }

  function _2() {
    var a;
    const a = i++;
    return M.jMB(eff3(a), _3);
  }

  function _3(a) {
    i = a;
    return eff4(i);
  }
}