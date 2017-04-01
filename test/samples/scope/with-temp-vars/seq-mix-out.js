function ar() {
  var i, j;
  i += 1;
  return M(eff1(i)).mbind(() => {
    let _i = i;
    _i += 2;
    return M(eff2(_i)).mbind(() => {
      let i = _i;
      i += 3;
      return M(effl1(i)).mbind(() => effl2(i));
    });
  });
}

function ar2() {
  var i, j;
  i++;
  return M(effr1(i)).mbind(() => effr2(i)).mbind(() => {
    let _i = i;
    _i++;
    return M(effr3(_i)).mbind(() => {
      let i = _i;
      i++;
      return M(effl1(i)).mbind(() => {
        let _i = i;
        _i++;
        return M(effl2(_i)).mbind(() => {
          let i = _i,
              j;
          j = 2;
          i += 1;
          return M(effl3(i)).mbind(() => effr4(3)).mbind(() => {
            let _i = i;
            _i++;
            return M.set({
              i: _i
            }).mseq(effr5(j)).mbind(() => effr6(3)).mbind(() => {
              let j;
              j = 1;
              return M.modify(s => ({
                i: s.i,
                j
              })).mseq(effr7(_i));
            });
          });
        });
      });
    });
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => effr8(i, j));
}

function a() {
  var i, j;
  i++;
  return M(effl1(i)).mbind(() => effl2(i)).mbind(() => {
    let _i = i;
    _i++;
    return M(effr1(_i)).mbind(() => effr2(_i)).mbind(() => {
      let i = _i;
      i++;
      return M(effr3(i)).mbind(() => {
        let _i = i,
            j;
        j = 2;
        _i += 1;
        return M(effr4(_i)).mbind(() => effr5(_i)).mbind(() => effr6(3)).mbind(() => {
          let i = _i;
          i++;
          return M.set({
            i
          }).mseq(effl3(j));
        });
      });
    });
  }).mbind(() => effl4(3)).mbind(() => M.get().mbind(({
    i
  }) => {
    let j;
    j = 1;
    return M(effl5(i)).mbind(() => effl6(j));
  }));
}