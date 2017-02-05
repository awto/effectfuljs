(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.set({
    i: i
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M(eff(i)).mbind(() => {
      j = 0, len = ref.length;
      return M.block(label => M.set({
        j: j
      }).mbind(() => M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) {
          d = ref[j];
          return M(eff(d)).mbind(a => {
            if (a) return label();
          }).mbind(() => eff(2)).mbind(b => {
            if (b) return lab();
          }).mbind(() => {
            var j1 = j;
            j1++;
            return M.set({
              j: j1
            });
          });
        } else return label();
      }))));
    }).mbind(() => eff(3)).mbind(() => eff(4)).mbind(() => {
      var i1 = i;
      i1++;
      return M.set({
        i: i1
      });
    });else return lab();
  })))).mbind(() => eff(5)).mbind(() => eff(6));
});