function a() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var b = i1 += 1;
      var c = j += 1;
      return M(eff(b, c)).mbind(() => {
        var i2 = i1;
        {
          {
            i2 += 3;
          }
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var d = i3 += 4;
            return M.set({
              i: i3
            }).mbind(() => eff(d));
          }).mbind(() => {
            if (false) return lab();
          });
        }
      });
    }));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i)));
}

function a1() {
  var i, j;
  return M(eff()).mbind(() => M.get()).mbind(({
    i
  }) => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var a = i1 += 1;
      var b = j += 1;
      return M(eff(a, b)).mbind(() => {
        var i2 = i1;
        {
          {
            i2 += 3;
          }
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var c = i3 += 4;
            return M.set({
              i: i3
            }).mbind(() => eff(c));
          }).mbind(() => {
            if (false) return lab();
          });
        }
      });
    }));
  })).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function b() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var a = i1 += 1;
      var c = j += 1;
      return M(eff(a, c)).mbind(() => {
        var i2 = i1;
        {
          {
            i2 += 3;
          }
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var d = i3 += 4;
            return M.set({
              i: i3
            }).mbind(() => eff(d));
          }).mbind(() => lab());
        }
      });
    }));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i)));
}

function c() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.scope(ret => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var a = i1 += 1;
      var b = j += 1;
      return M(eff(a, b)).mbind(() => {
        var i2 = i1;
        return M.block(lab2 => {
          i2 += 3;
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var d = i3 += 6;
            return M(eff(d)).mbind(() => lab2()).mbind(() => eff(i3)).mbind(() => {
              var i4 = i3;
              var e = i4++;
              return M(eff(e)).mbind(() => lab()).mbind(() => eff(i4)).mbind(() => {
                var i5 = i4;
                var f = i5++;
                return M.set({
                  i: i5
                }).mbind(() => eff(f));
              });
            });
          });
        });
      });
    })).mbind(() => M.get().mbind(({
      i
    }) => {
      var g = i += 5;
      return ret(g).mbind(() => eff(i)).mbind(() => {
        var i6 = i;
        var h = i6 += 6;
        return M.set({
          i: i6
        }).mbind(() => eff(h));
      });
    }));
  }).mbind(() => M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    var i7 = i;
    var k = i7 += 7;
    return eff(k);
  })))));
}

function c0() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.block(lab => M(eff(i)).mbind(() => M.get().mbind(({
    j
  }) => {
    var i1 = i;
    var a = i1 += 1;
    var b = j += 1;
    return M.set({
      i: i1
    }).mbind(() => eff(a, b)).mbind(() => eff(i1));
  })).mbind(() => lab())).mbind(() => M.get()).mbind(({
    i
  }) => eff(i)));
}

function c1() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.scope(ret => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var a = i1 += 1;
      var b = j += 1;
      return M(eff(a, b)).mbind(() => {
        var i2 = i1;
        return M.block(lab2 => {
          i2 += 3;
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var c = i3 += 6;
            return M(eff(c)).mbind(() => {
              if (true) return lab2();
            }).mbind(() => eff(i3)).mbind(() => {
              var i4 = i3;
              var d = i4++;
              return M(eff(d)).mbind(() => {
                if (true) return lab();
              }).mbind(() => eff(i4)).mbind(() => {
                var i5 = i4;
                var e = i5++;
                return M.set({
                  i: i5
                }).mbind(() => eff(e));
              });
            });
          });
        });
      });
    })).mbind(() => M.get().mbind(({
      i
    }) => {
      var f = i += 5;
      return ret(f).mbind(() => eff(i)).mbind(() => {
        var i6 = i;
        var g = i6 += 6;
        return M.set({
          i: i6
        }).mbind(() => eff(g));
      });
    }));
  }).mbind(() => M.get().mbind(({
    i
  }) => M(eff(i)).mbind(() => {
    var i7 = i;
    var h = i7 += 7;
    return eff(h);
  })))));
}

function c2() {
  var i, j;
  return M.scope(ret => M(eff()).mbind(() => M.get()).mbind(({
    i
  }) => M.block(lab => {
    i++;
    return M(eff(i)).mbind(() => M.get().mbind(({
      j
    }) => {
      var i1 = i;
      var a = i1 += 1;
      var b = j += 1;
      return M.set({
        j: j
      }).mbind(() => eff(a, b)).mbind(() => {
        var i2 = i1;
        return M.block(lab2 => {
          i2 += 3;
          return M(eff(i2)).mbind(() => {
            var i3 = i2;
            var c = i3 += 4;
            return M(eff(c)).mbind(() => {
              if (true) return lab2();
            }).mbind(() => eff(i3)).mbind(() => {
              var i4 = i3;
              var d = i4++;
              return M(eff(d)).mbind(() => {
                if (true) return lab();
              }).mbind(() => eff(i4)).mbind(() => {
                var i5 = i4;
                var e = i5++;
                return M.modify(s => ({
                  i: i5,
                  j: s.j
                })).mbind(() => eff(e));
              });
            });
          });
        });
      });
    })).mbind(() => M.get().mbind(({
      i
    }) => {
      var f = i += 5;
      return ret(f).mbind(() => eff(i)).mbind(() => {
        var i6 = i;
        var g = i6 += 6;
        return M.modify(s => ({
          i: i6,
          j: s.j
        })).mbind(() => eff(g));
      });
    }));
  })).mbind(() => M.get().mbind(({
    i,
    j
  }) => M(eff(i, j)).mbind(() => {
    var i7 = i;
    var h = i7 += 7;
    return eff(h);
  }))));
}

function d() {
  var i, j;
  return M.get().mbind(({
    i
  }) => M.scope(ret => {
    var a = i++;
    return M.set({
      i: i
    }).mbind(() => eff(a)).mbind(() => {
      var i1 = i;

      if (t1) {
        var b = i1 += 5;
        return M.set({
          i: i1
        }).mbind(() => ret(b));
      }
    }).mbind(() => M.get()).mapply(({
      i
    }) => {
      console.log(i);
    });
  }));
}