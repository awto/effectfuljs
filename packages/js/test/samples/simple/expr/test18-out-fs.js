function a() {
  return M.chain(eff('1'), _1, _2);

  function _1(a) {
    console.log(a, 3);
    console.log('2');
    return M.pure(console.log('3'));
  }

  function _2(e) {
    return M.raise(e);
  }
}