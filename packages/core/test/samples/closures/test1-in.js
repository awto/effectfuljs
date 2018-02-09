
function a() {
  var i = 0, k = 0;
  eff(1,i,k)
  k++
  function b() {
    var j = i
    eff(2,j)
    eff(3,i)
  }
  eff(4,i,k)
  eff(5,i,k)
}

