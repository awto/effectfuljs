function a() {
  var i = 0, j = 0
  function b(i) {
    eff1(i,j)
    i++, j++
    eff2(i,j)
  }
  eff3(i,j)
  i++, j--
  b(i)
  i--, j++
  eff4(i,j)
}
