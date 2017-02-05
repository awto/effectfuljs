function a1() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    if (true) {
      var a = i += 1;
      return efft(a);
    } else {
      var b = j += 2;
      return effe(b);
    }
  });
}

function a2() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return efft(a);
    } else {
      var b = j += 2;
      return effe(b);
    }
  }));
}

function a2a() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return efft(a);
    } else return effe(j);
  }));
}

function a2b() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return efft(a);
    } else {
      j += 2;
    }
  }));
}

function a3() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    if (true) {
      var a = i += 1;
      return M.set({
        i: i
      }).mbind(() => efft(a));
    } else {
      var b = j += 2;
      return M.set({
        j: j
      }).mbind(() => effe(b));
    }
  }).mbind(() => M.get()).mapply(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a3a() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    if (true) {
      var a = i += 1;
      return M.set({
        i: i
      }).mbind(() => efft(a));
    } else {
      var b = j += 2;
      return M.set({
        j: j
      }).mbind(() => effe(b));
    }
  }).mbind(() => M.get()).mapply(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a3b() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    if (true) {
      var a = i += 1;
      return M.set({
        i: i
      }).mbind(() => efft(a));
    } else return eff(j);
  }).mbind(() => M.get()).mapply(({
    i
  }) => {
    console.log(i, j);
  });
}

function a3c() {
  var i, j;
  return M.get().mbind(({
    i,
    j
  }) => {
    if (true) {
      var a = i += 1;
      return M.set({
        i: i
      }).mbind(() => efft(a));
    } else {
      j += 2;
      return M.set({
        j: j
      });
    }
  }).mbind(() => M.get()).mapply(({
    i,
    j
  }) => {
    console.log(i, j);
  });
}

function a4() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return M.set({
        i: i1
      }).mbind(() => efft(a));
    } else {
      var b = j += 2;
      return M.set({
        j: j
      }).mbind(() => effe(b));
    }
  }).mbind(() => M.get()).mapply(({
    i,
    j
  }) => {
    console.log(i, j);
  }));
}

function a4a() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return M.set({
        i: i1
      }).mbind(() => efft(a));
    } else return effe(j);
  }).mbind(() => M.get()).mapply(({
    i
  }) => {
    console.log(i, j);
  }));
}

function a4b() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return M.set({
        i: i1
      }).mbind(() => efft(a));
    } else {
      j += 2;
      return M.set({
        j: j
      });
    }
  }).mbind(() => M.get()).mapply(({
    i,
    j
  }) => {
    console.log(i, j);
  }));
}

function a5() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => M.get()).mbind(({
    j
  }) => {
    var i1 = i;

    if (true) {
      var a = i1 += 1;
      return M.set({
        i: i1
      }).mbind(() => efft(a));
    } else {
      var b = j += 2;
      return M.set({
        j: j
      }).mbind(() => effe(b));
    }
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  })));
}

function a6() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M.set({
      i: i1
    }).mbind(() => eff(a)).mbind(b => M.get().mbind(({
      j
    }) => {
      var i2 = i1;

      if (b) {
        var c = i2 += 1;
        return M.set({
          i: i2
        }).mbind(() => efft(c));
      } else {
        var d = j += 2;
        return M.modify(s => ({
          i: s.i2,
          j: j
        })).mbind(() => effe(d));
      }
    }));
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  })));
}

function a7() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    var i1 = i;
    var a = i1++;
    return M.set({
      i: i1
    }).mbind(() => eff(a)).mbind(b => M.get().mbind(({
      j
    }) => {
      if (b) {
        var c = j++;
        return M.set({
          j: j
        }).mbind(() => eff(c)).mbind(() => {
          var i2 = i1;
          var d = i2 += 1;
          return M.modify(s => ({
            i: i2,
            j: s.j
          })).mbind(() => efft(d));
        });
      } else {
        var e = j += 2;
        return M.modify(s => ({
          i: s.i1,
          j: j
        })).mbind(() => effe(e));
      }
    }));
  }).mbind(() => M.get().mbind(({
    i,
    j
  }) => {
    console.log(i, j);
    return M(eff(i, j)).mbind(() => eff(i, j));
  })));
}

function drawM() {
  var start;
  var end;
  var c;
  return M.scope(ret => M(event('mousedown')).mbind(a => {
    start = a;
    console.log('s', start);
    if (!start) return M.set({
      start: start
    }).mbind(() => ret(def));else return M.set({
      start: start
    });
  }).mbind(() => event('mouseup')).mbind(b => {
    end = b;
    console.log('e', end);
    c = '.box';

    if (!end) {
      c = '.draw';
      return M(event('mousemove')).mbind(d => M.get().mbind(({
        start
      }) => {
        end = d;
        console.log('m', start, end);
        return M.modify(s => ({
          end: end,
          start: s.start
        }));
      }));
    } else return M.modify(s => ({
      end: end,
      start: s.start
    }));
  }).mbind(() => M.get()).mapply(({
    start,
    end
  }) => {
    console.log('s:', start);
    console.log('e:', end);
    return {
      s: start,
      e: end
    };
  }));
}