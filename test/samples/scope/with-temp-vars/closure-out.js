function a() {
  var i, j;
  var k;
  return M.get().mbind(({
    j
  }) => M(eff(i, j)).mbind(() => {
    var j1 = j;
    var b = i++;
    var c = j1++;
    return M(eff(b, c)).mbind(() => {
      k = function () {
        var j;
        return M.get().mbind(({
          j
        }) => M(eff(i, j)).mbind(() => {
          var j1 = j;
          var a = i++;
          var b = j1++;
          return M(eff(a, b)).mbind(() => eff(i, j1));
        }));
      };

      return k();
    }).mbind(() => {
      var j2 = j1;
      var d = i++;
      var e = j2++;
      return M(eff(d, e)).mapply(() => {
        console.log(i, j2);
      });
    });
  }));
}

;

function a1() {
  var i, j;
  var k;
  return M.get().mbind(({
    i,
    j
  }) => M(eff(i, j)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M(eff(a, b)).mbind(() => {
      k = function (i) {
        var j;
        return M.get().mbind(({
          j
        }) => M.set({
          i: i
        }).mbind(() => eff(i, j)).mbind(() => M.get().mbind(({
          i
        }) => {
          var j1 = j;
          var a = i++;
          var b = j1++;
          return M(eff(a, b)).mbind(() => eff(i, j1));
        })));
      };

      return k();
    }).mbind(() => {
      var i2 = i1;
      var j2 = j1;
      var c = i2++;
      var d = j2++;
      return M(eff(c, d)).mapply(() => {
        console.log(i2, j2);
      });
    });
  }));
}

;

function b() {
  var i, j;

  function k() {
    var j;
    return M.get().mbind(({
      j
    }) => M(eff(i, j)).mbind(() => {
      var j1 = j;
      var a = i++;
      var b = j1++;
      return M(eff(a, b)).mbind(() => eff(i, j1));
    }));
  }

  return M.get().mbind(({
    j
  }) => M(eff(i, j)).mbind(() => k()).mbind(() => {
    var j1 = j;
    var a = i++;
    var c = j1++;
    return M(eff(a, c)).mbind(() => {
      ;
      return k();
    }).mbind(() => {
      var j2 = j1;
      var d = i++;
      var e = j2++;
      return M(eff(d, e)).mapply(() => {
        console.log(i, j2);
      });
    });
  }));
}

;

function b1() {
  var i, j;

  function k(i) {
    var j;
    return M.get().mbind(({
      j
    }) => M.set({
      i: i
    }).mbind(() => eff(i, j)).mbind(() => M.get().mbind(({
      i
    }) => {
      var j1 = j;
      var a = i++;
      var b = j1++;
      return M(eff(a, b)).mbind(() => eff(i, j1));
    })));
  }

  return M.get().mbind(({
    i,
    j
  }) => M(eff(i, j)).mbind(() => k()).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M(eff(a, b)).mbind(() => {
      ;
      return k(i1);
    }).mbind(() => {
      var i2 = i1;
      var j2 = j1;
      var c = i2++;
      var d = j2++;
      return M(eff(c, d)).mapply(() => {
        console.log(i2, j2);
      });
    });
  }));
}

;