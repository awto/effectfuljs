function a() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    return M.jMB(eff(2), _2, a);
  }

  function _2(b, a) {
    var c;
    console.log(a, b, 3);
    c = console.log('4');
    return M.pure(c);
  }
}