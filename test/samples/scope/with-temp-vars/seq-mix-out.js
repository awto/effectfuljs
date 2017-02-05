function ar() {
  var i, j;
  return M.get().mbind(({
    i
  }) => {
    i += 1;
    return M(eff1(i)).mbind(() => {
      var i1 = i;
      i1 += 2;
      return M(eff2(i1)).mbind(() => {
        var i2 = i1;
        i2 += 3;
        return M(effl1(i2)).mbind(() => effl2(i2));
      });
    });
  });
}

function ar2() {
  var i, j;
  return M.get().mbind(({
    i
  }) => {
    i++;
    return M(effr1(i)).mbind(() => effr2(i)).mbind(() => {
      var i1 = i;
      i1++;
      return M(effr3(i1)).mbind(() => {
        var i2 = i1;
        i2++;
        return M(effl1(i2)).mbind(() => {
          var i3 = i2;
          i3++;
          return M(effl2(i3)).mbind(() => {
            var i4 = i3;
            j = 2;
            i4 += 1;
            return M(effl3(i4)).mbind(() => effr4(3)).mbind(() => {
              var i5 = i4;
              i5++;
              return M(effr5(j)).mbind(() => effr6(3)).mbind(() => {
                j = 1;
                return M(effr7(i5)).mbind(() => effr8(i5, j));
              });
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
    return M(effl1(i)).mbind(() => effl2(i)).mbind(() => {
      var i1 = i;
      i1++;
      return M(effr1(i1)).mbind(() => effr2(i1)).mbind(() => {
        var i2 = i1;
        i2++;
        return M(effr3(i2)).mbind(() => {
          var i3 = i2;
          j = 2;
          i3 += 1;
          return M(effr4(i3)).mbind(() => effr5(i3)).mbind(() => effr6(3)).mbind(() => {
            var i4 = i3;
            i4++;
            return M(effl3(j)).mbind(() => effl4(3)).mbind(() => {
              j = 1;
              return M(effl5(i4)).mbind(() => effl6(j));
            });
          });
        });
      });
    });
  });
}