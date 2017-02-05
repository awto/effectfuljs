function a() {
  var i, j, k;
  return M.get().mbind(({
    k
  }) => M(eff(k)).mbind(() => M.get()).mbind(({
    i
  }) => {
    var k1 = k;
    k1++;
    return M(eff(i)).mbind(() => {
      var i1 = i;
      var k2 = k1;
      i1++;
      k2++;
      j = i1;
      return M.set({
        i: i1,
        j: j,
        k: k2
      }).mbind(() => eff(i1, j, k2)).mbind(() => eff(i1, j));
    }).mhandle(e => M.get().mapply(({
      i,
      j
    }) => {
      console.log(i, j, e);
    }));
  }).mbind(() => M.get().mbind(({
    k
  }) => {
    var b = k += 1;
    return M(eff(b)).mapply(() => {
      console.log(k);
    });
  })));
}

function b() {
  var i, j, k;
  return M.get().mbind(({
    k
  }) => M(eff(k)).mbind(() => M.get()).mbind(({
    i
  }) => {
    var k1 = k;
    k1++;
    return M.set({
      k: k1
    }).mbind(() => eff(i)).mbind(() => {
      var i1 = i;
      i1++;
      j = i1;
      return M.modify(s => ({
        i: i1,
        j: j,
        k: s.k1
      })).mbind(() => eff(i1, j));
    }).mhandle(e => M.get().mapply(({
      i,
      j
    }) => {
      console.log(i, j, e);
    }));
  }).mbind(() => M.get().mbind(({
    k
  }) => {
    var a = k += 1;
    return M(eff(a)).mapply(() => {
      console.log(k);
    });
  })));
}