function a1() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return eff1(a);
  });
}

function a2() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => eff2(b));
  });
}

function a3() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(() => eff2(i)).mbind(() => {
      var i1 = i;
      var b = i1++;
      return M(eff3(b)).mbind(() => eff4(i1));
    });
  });
}

function a4() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => {
      var i1 = i;
      var c = i1++;
      return eff2(b, c);
    });
  });
}

function a5() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => {
      var i1 = i;
      var c = i1++;
      return M(eff2(b, c)).mbind(() => eff(i1));
    });
  });
}

function a6() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 2;
    return M(eff1(b)).mbind(c => eff2(a, c));
  });
}

function a7() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 2;
    return M(eff1(b)).mbind(c => eff2(a, c)).mbind(() => eff(i));
  });
}

function a8() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => M((() => {
      var i1 = i;
      var c = i1 += 1;
      return eff2(c);
    })()).mbind(d => eff3(b, d)));
  });
}

function a9() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => {
      var i1 = i;
      var c = i1 += 1;
      return M(eff1(c)).mbind(d => eff2(b, d)).mbind(() => eff(i1));
    });
  });
}

function a10() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(b => M((() => {
      var i1 = i;
      var c = i1 += 1;
      return eff1(c);
    })()).mbind(d => eff2(b, d)));
  });
}

function a11() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mbind(c => eff(b + c, i)));
  });
}

function a12() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mbind(c => eff(b + c))).mapply(() => {
      console.log(i);
    });
  });
}

function a13() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(i)).mbind(c => eff1(b, c)));
  });
}

function a14() {
  var i;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(a => M((() => {
    var i1 = i;
    var b = i1++;
    return eff(b);
  })()).mbind(c => eff1(a, c))));
}

function a15() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return eff1(i, a);
  });
}

function a16() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(i)).mbind(b => eff(a, b));
  });
}

function a17() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i++;
    return M(eff(b)).mbind(c => eff(a, c));
  });
}

function a18() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(i)).mbind(c => eff(b, c)));
  });
}

function a19() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i += 1;
    return M(eff1(a)).mbind(() => {
      var i1 = i;
      var b = i1 += 2;
      return eff2(b);
    });
  });
}

function a20() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i += 1;
    var b = i++;
    return M(eff(b)).mbind(c => eff1(a, c)).mapply(() => {
      console.log(i);
    });
  });
}

function a21() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i += 1;
    var b = i++;
    return M(eff(b)).mbind(c => eff1(a, c)).mapply(() => {
      console.log(i);
    });
  });
}

function a22() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i += 1;
    var b = i++;
    return M(eff(b)).mbind(c => eff1(a, c)).mbind(() => {
      var i1 = i;
      console.log(i1);
      var d = i1 += 2;
      return M(eff(i1)).mbind(e => eff2(d, e));
    });
  });
}

function a23() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 1;
    return eff1(a, b);
  });
}

function a24() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 1;
    return M(eff1(a, b)).mbind(() => {
      var i1 = i;
      var c = i1++;
      var d = i1 += 1;
      return M(eff2(c, d)).mbind(() => {
        var i2 = i1;
        var e = i2++;
        var f = i2 += 1;
        return eff2(e, f);
      });
    });
  });
}

function a25() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 1;
    return M(eff1(a, b)).mapply(() => {
      console.log(i);
    });
  });
}

function a26() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    var b = i += 1;
    return M(eff1(a, b)).mbind(() => {
      var i1 = i;
      var c = i1++;
      var d = i1 += 1;
      return M(eff2(c, d)).mbind(() => {
        var i2 = i1;
        var e = i2++;
        var f = i2 += 1;
        return M(eff2(e, f)).mapply(() => {
          console.log(i2);
        });
      });
    });
  });
}

function a27() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff1(a)).mbind(() => {
      var i1 = i;
      var b = i1++;
      return M(eff2(b)).mbind(() => {
        var i2 = i1;
        var c = i2++;
        return eff2(c);
      });
    });
  });
}

function a28() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => eff(b)).mbind(() => eff(i));
  });
}

function a29() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mbind(c => eff(b + c))).mapply(() => {
      var i1 = i;
      i1++;
      console.log(i1);
    });
  });
}

function a30() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mapply(c => {
      b + c;
      console.log(i);
    }));
  });
}

function a31() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mapply(c => {
      i = b + c;
      console.log(i);
    }));
  });
}

function a32a() {
  var i;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(a => M(eff(2)).mapply(b => {
    console.log(a + b);
    console.log(i);
  })));
}

function a32() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => M(eff(2)).mapply(c => {
      console.log(b + c);
      console.log(i);
    }));
  });
}

function a33() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    i++;
    return M(eff(i)).mbind(() => eff(1)).mbind(() => {
      var i1 = i;
      var a = i1++;
      return M(eff(a)).mbind(b => {
        var i2 = i1;
        var c = i2++;
        return eff(c);
      });
    }).mbind(d => {
      i = b + d;
      i++;
      return eff(i);
    }).mbind(() => eff(1));
  });
}

function a33a() {
  var i;
  return M.get().mbind(({
    i
  }) => M(eff1(i)).mbind(() => {
    var i1 = i;
    var a = i1 += 1;
    return M(eff2(a)).mbind(b => {
      var i2 = i1;
      var c = i2 += 2;
      return M(eff3(c)).mbind(d => {
        console.log(b + d);
        return eff4(i2);
      });
    });
  }));
}

function a34() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i += 1;
    return M(eff1(a)).mbind(b => M((() => {
      var i1 = i;
      var c = i1 += 2;
      return eff(c);
    })()).mapply(d => {
      console.log(b, d);
    }));
  });
}

function a35() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => {
      var i1 = i;
      var c = i1++;
      return b.eff(c);
    });
  });
}

function a36() {
  var i;
  return M.get().mbind(({
    i
  }) => {
    var a = i++;
    return M(eff(a)).mbind(b => {
      var i1 = i;
      var c = i1++;
      return M(b.eff(c)).mbind(d => {
        var i2 = i1;
        var e = i2++;
        return M(d.eff(e)).mbind(() => eff(i2));
      });
    });
  });
}

function a37() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get().mbind(({
    j
  }) => {
    var i1 = i;
    var a = i1 += 1;
    var b = j += 1;
    return M(eff(a, b)).mbind(() => eff(i1));
  })));
}

function a38() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1 += 1;
    return M(eff(a)).mbind(() => eff(i1));
  }));
}

function a39() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    var a = i++;
    var b = j++;
    return M(eff(a, b)).mbind(() => {
      var i1 = i;
      var j1 = j;
      var c = i1++;
      var d = j1++;
      return M(eff(c, d)).mapply(() => {
        console.log(i1, j1);
      });
    });
  });
}

;

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