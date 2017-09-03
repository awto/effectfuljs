function a() {
  return M.jB(eff('1'), _);

  function _(a) {
    console.log(a, 3);
    console.log('2');
    return M.pure(console.log('3'));
  }
}