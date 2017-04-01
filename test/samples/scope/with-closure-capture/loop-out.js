function a() {
  var i, j;
  i = 0;
  j = 0;
  const a = i++;
  return M.set({
    j
  }).mseq(eff(a)).mbind(() => {
    let i;
    i = 0;
    return M.block(label => M.modify(s => ({
      i,
      j: s.j
    })).mseq(M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        j++;
        return M.modify(s => ({
          i: s.i,
          j
        })).mseq(eff(j));
      }).mbind(() => {
        let _i = i;
        ++_i;
        return M.modify(s => ({
          i: _i,
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
  const a = i++;
  return M.set({
    j
  }).mseq(eff(a)).mbind(() => {
    let i;
    i = 0;
    return M.block(label => M.modify(s => ({
      i,
      j: s.j
    })).mseq(M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        j++;
        return eff(j);
      }).mbind(() => {
        let _i = i;
        ++_i;
        return M.set({
          i: _i
        });
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
  const a = i++;
  return M.set({
    j
  }).mseq(eff(a)).mbind(() => {
    let i;
    i = 0;
    return M.block(label => M.modify(s => ({
      i,
      j: s.j
    })).mseq(M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 10) return M(eff(i)).mbind(() => M.get()).mbind(({
        j
      }) => {
        const a = j++;
        if (a) return M.modify(s => ({
          i: s.i,
          j
        })).mseq(label());else return M.modify(s => ({
          i: s.i,
          j
        }));
      }).mbind(() => M.get()).mbind(({
        j
      }) => eff(j)).mbind(() => {
        let _i = i;
        ++_i;
        return M.modify(s => ({
          i: _i,
          j: s.j
        }));
      });else return label();
    }))));
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}