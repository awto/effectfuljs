function a() {
  var i = 0, j = 0
  eff1(i,j)
  i++, j++
  (function b(i,k) {
    var z = 0
    eff2(i,j,k,z)
    i++, j++, k++, z++
    eff3(i,j,k,z)
    eff4(i,j,k,z)
  })(i,j)
  i++, j++
  eff5(i,j)
  eff6(i,j)
}
