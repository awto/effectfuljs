(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.modify(s => ({
    i,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      let j, len;
      j = 0, len = ref.length;
      return M.block(label => M.modify(s => ({
        i: s.i,
        j,
        len: s.len,
        ref: s.ref
      })).mseq(M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) return M.block($continue => {
          d = ref[j];
          return M(eff(d)).mbind(a => {
            if (a) return $continue();
          }).mbind(() => eff(2)).mbind(a => {
            if (a) return lab$continue();
          });
        }).mbind(() => {
          let _j = j;
          _j++;
          return M.modify(s => ({
            i: s.i,
            j: _j
          }));
        });else return label();
      }))));
    })).mbind(() => {
      let _i = i;
      _i++;
      return M.modify(s => ({
        i: _i,
        j: s.j
      }));
    });else return lab();
  }))));
});