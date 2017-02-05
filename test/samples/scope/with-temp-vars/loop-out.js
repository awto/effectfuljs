function a() {
  var i, j;
  i = 0;
  j = 0;
  var b = i++;
  return M.set({
    j: j
  }).mbind(() => eff(b)).mbind(() => {
    i = 0;
    return M.block(label => M.modify(s => ({
      i: i,
      j: s.j
    })).mbind(() => M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        j++;
        return M.set({
          j: j
        }).mbind(() => eff(j));
      }).mbind(() => {
        var i1 = i;
        ++i1;
        return M.modify(s => ({
          i: i1,
          j: s.j
        }));
      });else return label();
    }))));
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}

function a1() {
  var i, j;
  i = 0;
  j = 0;
  var a = i++;
  return M.set({
    j: j
  }).mbind(() => eff(a)).mbind(() => {
    i = 0;
    return M.block(label => M.modify(s => ({
      i: i,
      j: s.j
    })).mbind(() => M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        j++;
        return M.set({
          j: j
        }).mbind(() => eff(j));
      }).mbind(() => {
        var i1 = i;
        ++i1;
        return M.modify(s => ({
          i: i1,
          j: s.j
        }));
      });else return label();
    }))));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function b() {
  var i, j;
  i = 0;
  j = 0;
  var a = i++;
  return M.set({
    j: j
  }).mbind(() => eff(a)).mbind(() => {
    i = 0;
    return M.block(label => M.modify(s => ({
      i: i,
      j: s.j
    })).mbind(() => M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        var c = j++;
        if (c) return M.set({
          j: j
        }).mbind(() => label());else return M.set({
          j: j
        });
      }).mbind(() => M.get()).mbind(({
        j
      }) => eff(j)).mbind(() => {
        var i1 = i;
        ++i1;
        return M.modify(s => ({
          i: i1,
          j: s.j
        }));
      });else return label();
    }))));
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}