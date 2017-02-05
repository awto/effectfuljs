function a() {
  var i, j, k, l;
  return M.get().mbind(({
    i,
    j
  }) => M(M.ref(i, j)).mbind(() => M.get().mbind(({
    k,
    l
  }) => M(eff(i, j, k, l)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var k1 = k;
    var l1 = l;
    var b = i1++;
    var c = j1++;
    var d = k1++;
    var e = l1++;
    return M(eff(b, c, d, e)).mbind(() => eff(i1, j1, k1, l1)).mbind(() => {
      var i2 = i1;
      var j2 = j1;
      var k2 = k1;
      var l2 = l1;
      var f = i2++;
      var g = j2++;
      var h = k2++;
      var m = l2++;
      return M(eff(f, g, h, m)).mbind(() => eff(i2, j2, k2, l2));
    });
  }))));
}