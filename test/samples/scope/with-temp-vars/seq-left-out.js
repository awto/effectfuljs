function ai() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    i += 1;
    return M(eff1(i)).mbind(() => {
      var i1 = i;
      i1 += 2;
      return eff2(i1);
    });
  });
}

function aij() {
  var i, j, y;
  return M.get().mbind(({
    i
  }) => {
    i++;
    return M(eff(i)).mbind(() => {
      var i1 = i;
      j = 2;
      i1++;
      return M(eff(j)).mbind(() => eff(i1, j)).mbind(() => eff(j));
    });
  });
}

function aij1() {
  var i, j, y;
  return M(eff(1)).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    i += j;
    return M(eff(i)).mbind(() => {
      var i1 = i;
      j = 2;
      i1++;
      return M(eff(j)).mbind(() => eff(i1, j)).mbind(() => eff(j));
    });
  }));
}

function aij2() {
  var i, j, y;
  return M(eff(1)).mbind(() => M.get().mbind(({
    i
  }) => {
    i += 2;
    return M(eff(i)).mbind(() => {
      var i1 = i;
      j = 2;
      i1++;
      return M(eff(j)).mbind(() => eff(i1, j)).mbind(() => eff(j));
    });
  }));
}

function aij3() {
  var i, j, y;
  return M.get().mbind(({
    i
  }) => {
    j = 0;
    i++;
    return M(eff(i)).mbind(() => {
      var i1 = i;
      j = 2;
      i1++;
      return M(eff(j)).mbind(() => eff(i1, j)).mbind(() => eff(j));
    });
  });
}

function ar() {
  var i, j;
  return M.get().mbind(({
    i
  }) => {
    i++;
    return M(eff(i)).mbind(() => eff(i)).mbind(() => {
      var i1 = i;
      i1++;
      return M(eff(i1)).mbind(() => eff(i1)).mbind(() => {
        var i2 = i1;
        i2++;
        return M(eff(i2)).mbind(() => {
          var i3 = i2;
          j = 2;
          i3 += 1;
          return M(eff(i3)).mbind(() => eff(3)).mbind(() => {
            var i4 = i3;
            i4++;
            return M(eff(j)).mbind(() => eff(3)).mbind(() => {
              j = 1;
              return M(eff(i4)).mbind(() => eff(i4, j));
            });
          });
        });
      });
    });
  });
}

function a() {
  var i, j;
  return M.get().mbind(({
    i
  }) => {
    i++;
    return M(eff(i)).mbind(() => eff(i)).mbind(() => {
      var i1 = i;
      i1++;
      return M(eff(i1)).mbind(() => eff(i1)).mbind(() => {
        var i2 = i1;
        i2++;
        return M(eff(i2)).mbind(() => {
          var i3 = i2;
          j = 2;
          i3 += 1;
          return M(eff(i3)).mbind(() => eff(i3)).mbind(() => eff(3)).mbind(() => {
            var i4 = i3;
            i4++;
            return M(eff(j)).mbind(() => eff(3)).mbind(() => {
              j = 1;
              return M(eff(i4)).mbind(() => eff(j));
            });
          });
        });
      });
    });
  });
}

function al() {
  var i, j;
  return M.get().mbind(({
    i
  }) => {
    i += 2;
    return M(eff1(i)).mbind(() => eff1(i)).mbind(() => {
      var i1 = i;
      i1++;
      return M(eff2(i1)).mbind(() => eff2(i1)).mbind(() => {
        var i2 = i1;
        i2 += 3;
        return M(eff3(i2)).mbind(() => eff4(i2)).mbind(() => {
          var i3 = i2;
          i3++;
          return eff5(i3);
        });
      });
    });
  });
}

function b() {
  var i;
  i = new Something();
  return M(i.next()).mbind(a => {
    i = a;
    return i.next();
  }).mbind(c => {
    i = c;
    return i.next();
  }).mapply(d => {
    i = d;
  });
}