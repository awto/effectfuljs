function a() {
  var i, j, k;
  return M(eff(i, j)).mbind(() => {
    let j;
    const a = i++;
    const b = j++;
    return M(eff(a, b)).mbind(() => {
      let k;

      k = function () {
        var j;
        return M(eff(i, j)).mbind(() => {
          let j;
          const a = i++;
          const b = j++;
          return M(eff(a, b)).mbind(() => eff(i, j));
        });
      };

      return k();
    }).mbind(() => {
      let _j = j;
      const a = i++;
      const b = _j++;
      return M(eff(a, b)).mapply(() => {
        console.log(i, _j);
      });
    });
  });
}

function a1() {
  var i, j, k;
  return M(eff(i, j)).mbind(() => {
    let i, j;
    const a = i++;
    const b = j++;
    return M(eff(a, b)).mbind(() => {
      let k;

      k = function (i) {
        var j;
        return M(eff(i, j)).mbind(() => {
          let _i = i,
              j;
          const a = _i++;
          const b = j++;
          return M(eff(a, b)).mbind(() => eff(_i, j));
        });
      };

      return k();
    }).mbind(() => {
      let _i = i,
          _j = j;
      const a = _i++;
      const b = _j++;
      return M(eff(a, b)).mapply(() => {
        console.log(_i, _j);
      });
    });
  });
}

function b() {
  function k() {
    var j;
    return M(eff(i, j)).mbind(() => {
      let j;
      const a = i++;
      const b = j++;
      return M(eff(a, b)).mbind(() => eff(i, j));
    });
  }

  var i, j;
  return M(eff(i, j)).mbind(() => k()).mbind(() => {
    let j;
    const a = i++;
    const b = j++;
    return M(eff(a, b)).mbind(() => {
      ;
      return k();
    }).mbind(() => {
      let _j = j;
      const a = i++;
      const b = _j++;
      return M(eff(a, b)).mapply(() => {
        console.log(i, _j);
      });
    });
  });
}

function b1() {
  function k(i) {
    var j;
    return M(eff(i, j)).mbind(() => {
      let _i = i,
          j;
      const a = _i++;
      const b = j++;
      return M(eff(a, b)).mbind(() => eff(_i, j));
    });
  }

  var i, j;
  return M(eff(i, j)).mbind(() => k()).mbind(() => {
    let i, j;
    const a = i++;
    const b = j++;
    return M(eff(a, b)).mbind(() => {
      ;
      return k(i);
    }).mbind(() => {
      let _i = i,
          _j = j;
      const a = _i++;
      const b = _j++;
      return M(eff(a, b)).mapply(() => {
        console.log(_i, _j);
      });
    });
  });
}