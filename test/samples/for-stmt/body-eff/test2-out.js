(function () {
  var i, j, d, len, ref;
  ref = [1, 2, 3];
  i = 0, len = ref.lenght;
  return M.block(label => M.set({
    i: i,
    len: len
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i,
    len
  }) => {
    if (i < len) {
      j = 0, len = ref.length;
      return M.block(label1 => M.set({
        j: j,
        len: len
      }).mbind(() => M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) {
          d = ref[j];
          return M(eff(i)).mbind(() => {
            var j1 = j;
            j1++;
            return M.modify(s => ({
              j: j1,
              len: s.len
            }));
          });
        } else return label1();
      })))).mbind(() => eff(2)).mbind(() => {
        var i1 = i;
        i1++;
        return M.modify(s => ({
          i: i1,
          len: s.len
        }));
      });
    } else return label();
  })))).mbind(() => eff(3));
});