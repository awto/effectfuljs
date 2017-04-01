(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.block(label => M.modify(s => ({
    i,
    len,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    i,
    len
  }) => {
    let j;

    if (i < len) {
      j = 0, len = ref.length;
      return M.block(label => M.modify(s => ({
        i: s.i,
        j,
        len,
        ref: s.ref
      })).mseq(M.repeat(() => M.get().mbind(({
        j
      }) => {
        let d;

        if (j < len) {
          d = ref[j];
          return M(eff(i)).mbind(() => {
            let _j = j;
            _j++;
            return M.modify(s => ({
              i: s.i,
              j: _j
            }));
          });
        } else return label();
      })))).mbind(() => eff(2)).mbind(() => {
        let _i = i;
        _i++;
        return M.modify(s => ({
          i: _i,
          j: s.j
        }));
      });
    } else return M.modify(s => ({
      i: s.i,
      j,
      len
    })).mseq(label());
  })))).mbind(() => eff(3));
});