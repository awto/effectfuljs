function a() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    console.log(a, 3);
    console.log('2');
    return M.pure(console.log('3'));
  }
}