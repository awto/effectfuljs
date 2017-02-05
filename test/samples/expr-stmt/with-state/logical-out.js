function t1() {
  var i;
  i = 0;
  var a = i++;
  return M(eff(a)).mbind(b => b ? eff1(i) : eff2(i)).mbind(() => eff(i));
}

function t2() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => b ? eff1(i1) : eff2(i1)).mbind(() => eff(i1));
  });
}

function t2a() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return a ? M.set({
      i: i1
    }).mbind(() => eff1(i1)) : M.set({
      i: i1
    }).mbind(() => eff2(i1));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t2b() {
  var i;
  i = 0;
  return M.set({
    i: i
  }).mbind(() => eff(i)).mbind(() => {
    var i1 = i;
    return i1 ? (() => {
      var a = i1++;
      return M.set({
        i: i1
      }).mbind(() => eff1(a));
    })() : eff2(i1);
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t2c() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return a ? (() => {
      var b = i1++;
      return M.set({
        i: i1
      }).mbind(() => eff1(b));
    })() : M.set({
      i: i1
    }).mbind(() => eff2(i1));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t2e() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return a ? (() => {
      var b = i1++;
      return M.set({
        i: i1
      }).mbind(() => eff1(b));
    })() : (() => {
      var c = console.log(i1);
      return M.set({
        i: i1
      }).mapply(() => {
        return c;
      });
    })();
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t2f() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return a ? (() => {
      var b = console.log(i1++);
      return M.set({
        i: i1
      }).mapply(() => {
        return b;
      });
    })() : M.set({
      i: i1
    }).mbind(() => eff(i1));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t2g() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    i1++ ? console.log(i1++) : console.log(i1);
    return eff(i1);
  });
}

function t2h() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => {
      var i2 = i1;
      var c = i2++;
      var d = console.log(c);
      var e = console.log(i2);
      b ? d : e;
      return eff(i2);
    });
  });
}

function t3() {
  var i, j;
  i = 0;
  j = 0;
  return M(eff(i, j)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M.set({
      i: i1
    }).mbind(() => eff(a, b)).mbind(c => {
      var i2 = i1;
      var j2 = j1;
      return c ? (() => {
        var d = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff2(d, j2));
      })() : (() => {
        var e = j2++;
        return eff2(i2, e);
      })();
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t4() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M(eff(i, j, k)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M.set({
      i: i1,
      j: j1
    }).mbind(() => eff(a, b, k)).mbind(c => {
      var i2 = i1;
      var k1 = k;
      var j2 = j1;
      return c ? (() => {
        var d = i2++;
        var e = k1++;
        return M.modify(s => ({
          i: i2,
          j: s.j2
        })).mbind(() => eff2(d, j2, e));
      })() : (() => {
        var f = j2++;
        var g = k1++;
        return M.modify(s => ({
          i: s.i2,
          j: j2
        })).mbind(() => eff2(i2, f, g));
      })();
    });
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}

function t5() {
  var i;
  i = 0;
  var a = i++;
  return M(eff(a)).mbind(b => b && eff1(i)).mbind(() => eff(i));
}

function t6() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => b && eff1(i1)).mbind(() => eff(i1));
  });
}

function t7() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => {
      var i2 = i1;
      return b && (() => {
        var c = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff1(c));
      })();
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t8() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => {
      var i2 = i1;
      return b && (() => {
        var c = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff1(c));
      })();
    });
  }).mbind(d => M.get()).mbind(({
    i
  }) => d && (() => {
    var e = i++;
    return M.set({
      i: i
    }).mbind(() => eff(e));
  })()).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t9() {
  var i;
  i = 0;
  var a = i++;
  return M(eff(a)).mbind(b => b || eff1(i)).mbind(() => eff(i));
}

function t10() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => b || eff1(i1)).mbind(() => eff(i1));
  });
}

function t11() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => {
      var i2 = i1;
      return b || (() => {
        var c = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff1(c));
      })();
    });
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t12() {
  var i;
  i = 0;
  return M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M(eff(a)).mbind(b => {
      var i2 = i1;
      return b || (() => {
        var c = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff1(c));
      })();
    });
  }).mbind(d => M.get()).mbind(({
    i
  }) => d || (() => {
    var e = i++;
    return M.set({
      i: i
    }).mbind(() => eff(e));
  })()).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function t13() {
  var i, j;
  i = 0;
  j = 0;
  return M(eff(i, j)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M(eff(a, b)).mbind(c => {
      var i2 = i1;
      return c && (() => {
        var d = i2++;
        return M.set({
          i: i2
        }).mbind(() => eff2(d, j1));
      })();
    }).mbind(e => M.get().mbind(({
      i
    }) => {
      var j2 = j1;
      return M(e && (() => {
        var f = j2++;
        return eff3(i, f);
      })()).mbind(() => eff(i));
    }));
  });
}

function t14() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M(eff(i, j, k)).mbind(() => {
    var i1 = i;
    var j1 = j;
    var a = i1++;
    var b = j1++;
    return M(eff(a, b, k)).mbind(c => {
      var i2 = i1;
      var k1 = k;
      return c && (() => {
        var d = i2++;
        var e = k1++;
        return M.set({
          i: i2,
          k: k1
        }).mbind(() => eff2(d, j1, e));
      })();
    }).mbind(f => M.get().mbind(({
      k,
      i
    }) => {
      var j2 = j1;
      return M(f && (() => {
        var g = j2++;
        var h = k++;
        return eff3(i, g, h);
      })()).mbind(() => eff(i, j2));
    }));
  });
}