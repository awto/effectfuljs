(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.block(label => M.set({
    j: j
  }).mbind(() => M.repeat(() => M.get().mbind(({
    j
  }) => {
    if (j < len) {
      i = ref[j];
      return M(eff(i)).mbind(a => {
        if (a) return label();
      }).mbind(() => {
        var j1 = j;
        j1++;
        return M.set({
          j: j1
        });
      });
    } else return label();
  })))).mbind(() => eff(2)).mbind(() => eff(3));
});