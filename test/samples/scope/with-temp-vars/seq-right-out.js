function ai() {
  var i;
  i += 1;
  return M(eff1(i)).mbind(() => {
    let _i = i;
    _i += 2;
    return eff2(_i);
  });
}

function aij() {
  var i, j, y;
  i++;
  return M(eff(i)).mbind(() => {
    let _i = i,
        j;
    j = 2;
    _i++;
    return M(eff(j)).mbind(() => eff(_i, j)).mbind(() => eff(j));
  });
}

function aij1() {
  var i, j, y;
  return M(eff(1)).mbind(() => {
    let i;
    i += j;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      j = 2;
      _i++;
      return M(eff(j)).mbind(() => eff(_i, j)).mbind(() => eff(j));
    });
  });
}

function aij2() {
  var i, j, y;
  return M(eff(1)).mbind(() => {
    let i;
    i += 2;
    return M(eff(i)).mbind(() => {
      let _i = i,
          j;
      j = 2;
      _i++;
      return M(eff(j)).mbind(() => eff(_i, j)).mbind(() => eff(j));
    });
  });
}

function ar() {
  var i, j;
  i++;
  return M(eff(i)).mbind(() => eff(i)).mbind(() => {
    let _i = i;
    _i++;
    return M(eff(_i)).mbind(() => eff(_i)).mbind(() => {
      let i = _i;
      i++;
      return M(eff(i)).mbind(() => {
        let _i = i,
            j;
        j = 2;
        _i += 1;
        return M(eff(_i)).mbind(() => eff(3)).mbind(() => {
          let i = _i;
          i++;
          return M.set({
            i
          }).mseq(eff(j)).mbind(() => eff(3)).mbind(() => {
            let j;
            j = 1;
            return M.modify(s => ({
              i: s.i,
              j
            })).mseq(eff(i));
          });
        });
      });
    });
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}

function a() {
  var i, j;
  i++;
  return M(eff(i)).mbind(() => eff(i)).mbind(() => {
    let _i = i;
    _i++;
    return M(eff(_i)).mbind(() => eff(_i)).mbind(() => {
      let i = _i;
      i++;
      return M(eff(i)).mbind(() => {
        let _i = i,
            j;
        j = 2;
        _i += 1;
        return M(eff(_i)).mbind(() => eff(_i)).mbind(() => eff(3)).mbind(() => {
          let i = _i;
          i++;
          return M.set({
            i
          }).mseq(eff(j));
        });
      });
    });
  }).mbind(() => eff(3)).mbind(() => M.get().mbind(({
    i
  }) => {
    let j;
    j = 1;
    return M(eff(i)).mbind(() => eff(j));
  }));
}

function al() {
  var i, j;
  i += 2;
  return M(eff1(i)).mbind(() => eff1(i)).mbind(() => {
    let _i = i;
    _i++;
    return M(eff2(_i)).mbind(() => eff2(_i)).mbind(() => {
      let i = _i;
      i += 3;
      return M(eff3(i)).mbind(() => eff4(i)).mbind(() => {
        let _i = i;
        _i++;
        return eff5(_i);
      });
    });
  });
}

function b() {
  var i;
  i = new Something();
  return M(i.next()).mbind(a => {
    let i;
    i = a;
    return i.next();
  }).mbind(a => {
    let i;
    i = a;
    return i.next();
  }).mapply(a => {
    let i;
    i = a;
  });
}