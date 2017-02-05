(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.set({
    i: i
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      j = 0, len = ref.length;
      return M.block(label => M.set({
        j: j
      }).mbind(() => M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) return M.block($continue => {
          d = ref[j];
          return M(eff(d)).mbind(a => {
            if (a) return $continue();
          }).mbind(() => {
            if (t1) return lab$continue();
          });
        }).mbind(() => {
          var j1 = j;
          j1++;
          return M.set({
            j: j1
          });
        });else return label();
      }))));
    })).mbind(() => {
      var i1 = i;
      i1++;
      return M.set({
        i: i1
      });
    });else return lab();
  }))));
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.set({
    i: i
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      j = 0, len = ref.length;
      return M.block(label => M.set({
        j: j
      }).mbind(() => M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) return M.block($continue => {
          d = ref[j];
          return M(eff(d)).mbind(a => {
            if (a) return $continue();
          }).mbind(() => eff(2)).mbind(b => {
            if (b) return lab$continue();
          });
        }).mbind(() => {
          var j1 = j;
          j1++;
          return M.set({
            j: j1
          });
        });else return label();
      }))));
    })).mbind(() => {
      var i1 = i;
      i1++;
      return M.set({
        i: i1
      });
    });else return lab();
  }))));
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.set({
    i: i
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      j = 0, len = ref.length;
      return M.block(label => M.set({
        j: j
      }).mbind(() => M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) {
          d = ref[j];
          return M(eff(d)).mbind(() => {
            var j1 = j;
            j1++;
            if (t2) return M.set({
              j: j1
            }).mbind(() => lab$continue());else return M.set({
              j: j1
            });
          }).mbind(() => M.get()).mbind(({
            j
          }) => {
            j++;
            return M.set({
              j: j
            });
          });
        } else return label();
      }))));
    })).mbind(() => {
      var i1 = i;
      i1++;
      return M.modify(s => ({
        i: i1,
        j: s.j
      }));
    });else return lab();
  })))).mbind(() => M.get()).mbind(({
    j
  }) => eff(j));
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.block(label => M.set({
    j: j
  }).mbind(() => M.repeat(() => M.get().mbind(({
    j
  }) => {
    if (j < len) return M.block($continue => {
      d = ref[j];
      return M(eff(d)).mbind(() => M.get()).mbind(({
        i
      }) => {
        i++;
        if (t2) return M.set({
          i: i
        }).mbind(() => $continue());else return M.set({
          i: i
        });
      });
    }).mbind(() => {
      var j1 = j;
      j1++;
      return M.modify(s => ({
        i: s.i,
        j: j1
      }));
    });else return label();
  }))));
});

(function () {
  var j, len;
  j = 0;
  return M.block(label => M.set({
    j: j
  }).mbind(() => M.repeat(() => M.get().mbind(({
    j
  }) => {
    if (true) return M(eff(j)).mbind(() => {
      var j1 = j;
      j1++;
      if (t2) return M.set({
        j: j1
      }).mbind(() => label());else return M.set({
        j: j1
      });
    }).mbind(() => M.get()).mbind(({
      j
    }) => {
      j--;
      return M.set({
        j: j
      });
    });else return label();
  })))).mbind(() => M.get()).mbind(({
    j
  }) => eff(j));
});