(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.block(label => M.modify(s => ({
    j,
    len: s.len,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    j
  }) => {
    let i;

    if (j < len) {
      i = ref[j];
      return M(eff(i)).mbind(a => {
        if (a) return label();
      }).mbind(() => {
        let _j = j;
        _j++;
        return M.set({
          j: _j
        });
      });
    } else return label();
  })))).mbind(() => eff(2)).mbind(() => eff(3));
});