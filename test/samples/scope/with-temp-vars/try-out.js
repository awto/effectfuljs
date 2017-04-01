function a() {
  var i, j, k;
  return M(eff(k)).mbind(() => {
    let k;
    k++;
    return M(eff(i)).mbind(() => {
      let _k = k,
          i,
          j;
      i++;
      _k++;
      j = i;
      return M.set({
        i,
        j,
        k: _k
      }).mseq(eff(i, j, _k)).mbind(() => eff(i, j));
    }).mhandle(e => M.get().mbind(({
      i,
      j
    }) => {
      console.log(i, j, e);
    }));
  }).mbind(() => M.get().mbind(({
    k
  }) => {
    const a = k += 1;
    return M(eff(a)).mapply(() => {
      console.log(k);
    });
  }));
}

function b() {
  var i, j, k;
  return M(eff(k)).mbind(() => {
    let k;
    k++;
    return M(eff(i)).mbind(() => {
      let i, j;
      i++;
      j = i;
      return M.modify(s => ({
        i,
        j,
        k: s.k
      })).mseq(eff(i, j));
    }).mhandle(e => M.get().mbind(({
      i,
      j
    }) => {
      console.log(i, j, e);
    })).mbind(() => {
      let _k = k;
      const a = _k += 1;
      return M(eff(a)).mapply(() => {
        console.log(_k);
      });
    });
  });
}