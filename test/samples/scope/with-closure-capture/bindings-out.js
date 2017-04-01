function a1() {
  var i;
  const a = i++;
  return eff1(a);
}

function a2() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => eff2(a));
}

function a3() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(() => eff2(i)).mbind(() => {
    let _i = i;
    const a = _i++;
    return M(eff3(a)).mbind(() => eff4(_i));
  });
}

function a4() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i++;
    return eff2(a, b);
  });
}

function a5() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i++;
    return M(eff2(a, b)).mbind(() => eff(_i));
  });
}

function a6() {
  var i;
  const a = i++;
  const b = i += 2;
  return M(eff1(b)).mbind(b => eff2(a, b));
}

function a7() {
  var i;
  const a = i++;
  const b = i += 2;
  return M(eff1(b)).mbind(b => eff2(a, b)).mbind(() => eff(i));
}

function a8() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i += 1;
    return M(eff2(b)).mbind(b => eff3(a, b));
  });
}

function a9() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i += 1;
    return M(eff1(b)).mbind(b => eff2(a, b)).mbind(() => eff(_i));
  });
}

function a10() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i += 1;
    return M(eff1(b)).mbind(b => eff2(a, b));
  });
}

function a11() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mbind(b => eff(a + b, i)));
}

function a12() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mbind(b => eff(a + b))).mapply(() => {
    console.log(i);
  });
}

function a13() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(i)).mbind(b => eff1(a, b)));
}

function a14() {
  var i;
  return M(eff(i)).mbind(a => {
    let i;
    const b = i++;
    return M(eff(b)).mbind(b => eff1(a, b));
  });
}

function a15() {
  var i;
  const a = i++;
  return eff1(i, a);
}

function a16() {
  var i;
  const a = i++;
  return M(eff(i)).mbind(b => eff(a, b));
}

function a17() {
  var i;
  const a = i++;
  const b = i++;
  return M(eff(b)).mbind(b => eff(a, b));
}

function a18() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(i)).mbind(b => eff(a, b)));
}

function a19() {
  var i;
  const a = i += 1;
  return M(eff1(a)).mbind(() => {
    let _i = i;
    const a = _i += 2;
    return eff2(a);
  });
}

function a20() {
  var i;
  const a = i += 1;
  const b = i++;
  return M(eff(b)).mbind(b => eff1(a, b)).mapply(() => {
    console.log(i);
  });
}

function a21() {
  var i;
  const a = i += 1;
  const b = i++;
  return M(eff(b)).mbind(b => eff1(a, b)).mapply(() => {
    console.log(i);
  });
}

function a22() {
  var i;
  const a = i += 1;
  const b = i++;
  return M(eff(b)).mbind(b => eff1(a, b)).mbind(() => {
    let _i = i;
    console.log(_i);
    const a = _i += 2;
    return M(eff(_i)).mbind(b => eff2(a, b));
  });
}

function a23() {
  var i;
  const a = i++;
  const b = i += 1;
  return eff1(a, b);
}

function a24() {
  var i;
  const a = i++;
  const b = i += 1;
  return M(eff1(a, b)).mbind(() => {
    let _i = i;
    const a = _i++;
    const b = _i += 1;
    return M(eff2(a, b)).mbind(() => {
      let i = _i;
      const a = i++;
      const b = i += 1;
      return eff2(a, b);
    });
  });
}

function a25() {
  var i;
  const a = i++;
  const b = i += 1;
  return M(eff1(a, b)).mapply(() => {
    console.log(i);
  });
}

function a26() {
  var i;
  const a = i++;
  const b = i += 1;
  return M(eff1(a, b)).mbind(() => {
    let _i = i;
    const a = _i++;
    const b = _i += 1;
    return M(eff2(a, b)).mbind(() => {
      let i = _i;
      const a = i++;
      const b = i += 1;
      return M(eff2(a, b)).mapply(() => {
        console.log(i);
      });
    });
  });
}

function a27() {
  var i;
  const a = i++;
  return M(eff1(a)).mbind(() => {
    let _i = i;
    const a = _i++;
    return M(eff2(a)).mbind(() => {
      let i = _i;
      const a = i++;
      return eff2(a);
    });
  });
}

function a28() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => eff(a)).mbind(() => eff(i));
}

function a29() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mbind(b => eff(a + b))).mapply(() => {
    let _i = i;
    _i++;
    console.log(_i);
  });
}

function a30() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mapply(b => {
    a + b;
    console.log(i);
  }));
}

function a31() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mapply(b => {
    let i;
    i = a + b;
    console.log(i);
  }));
}

function a32a() {
  var i;
  return M(eff(i)).mbind(a => M(eff(2)).mapply(b => {
    console.log(a + b);
    console.log(i);
  }));
}

function a32() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => M(eff(2)).mapply(b => {
    console.log(a + b);
    console.log(i);
  }));
}

function a33() {
  var i;
  i++;
  return M(eff(i)).mbind(() => eff(1)).mbind(() => {
    let _i = i;
    const a = _i++;
    return M(eff(a)).mbind(a => {
      let i = _i;
      const b = i++;
      return eff(b);
    });
  }).mbind(b => {
    let i;
    i = a + b;
    i++;
    return eff(i);
  }).mbind(() => eff(1));
}

function a33a() {
  var i;
  return M(eff1(i)).mbind(() => {
    let i;
    const a = i += 1;
    return M(eff2(a)).mbind(a => {
      let _i = i;
      const b = _i += 2;
      return M(eff3(b)).mbind(b => {
        console.log(a + b);
        return eff4(_i);
      });
    });
  });
}

function a34() {
  var i;
  const a = i += 1;
  return M(eff1(a)).mbind(a => {
    let _i = i;
    const b = _i += 2;
    return M(eff(b)).mapply(b => {
      console.log(a, b);
    });
  });
}

function a35() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => {
    let _i = i;
    const b = _i++;
    return a.eff(b);
  });
}

function a36() {
  var i;
  const a = i++;
  return M(eff(a)).mbind(a => {
    let _i = i;
    const b = _i++;
    return M(a.eff(b)).mbind(a => {
      let i = _i;
      const b = i++;
      return M(a.eff(b)).mbind(() => eff(i));
    });
  });
}

function a37() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i, j;
    const a = i += 1;
    const b = j += 1;
    return M(eff(a, b)).mbind(() => eff(i));
  });
}

function a38() {
  var i, j;
  return M(eff(i)).mbind(() => {
    let i;
    const a = i += 1;
    return M(eff(a)).mbind(() => eff(i));
  });
}

function a39() {
  var i, j;
  const a = i++;
  const b = j++;
  return M(eff(a, b)).mbind(() => {
    let _i = i,
        _j = j;
    const a = _i++;
    const b = _j++;
    return M(eff(a, b)).mapply(() => {
      console.log(_i, _j);
    });
  });
}

function aij() {
  var i, j, y;
  i++;
  return M(eff(i)).mbind(a => a.mbind(function () {
    return function (i) {
      j = 2;
      i++;
      return M(eff(j)).mbind(a => a.mbind(function () {
        return M(eff(i, j)).mbind(a => a.mbind(function () {
          return eff(j);
        }));
      }));
    }(i);
  }));
}