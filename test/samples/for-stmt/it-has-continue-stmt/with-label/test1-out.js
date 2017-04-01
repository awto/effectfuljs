(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.modify(s => ({
    i,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      let j, len;
      j = 0, len = ref.length;
      return M.block(label => M.modify(s => ({
        i: s.i,
        j,
        len: s.len,
        ref: s.ref
      })).mseq(M.repeat(() => M.get().mbind(({
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
          let _j = j;
          _j++;
          return M.modify(s => ({
            i: s.i,
            j: _j
          }));
        });else return label();
      }))));
    })).mbind(() => {
      let _i = i;
      _i++;
      return M.modify(s => ({
        i: _i,
        j: s.j
      }));
    });else return lab();
  }))));
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.modify(s => ({
    i,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      let j, len;
      j = 0, len = ref.length;
      return M.block(label => M.modify(s => ({
        i: s.i,
        j,
        len: s.len,
        ref: s.ref
      })).mseq(M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) return M.block($continue => {
          d = ref[j];
          return M(eff(d)).mbind(a => {
            if (a) return $continue();
          }).mbind(() => eff(2)).mbind(a => {
            if (a) return lab$continue();
          });
        }).mbind(() => {
          let _j = j;
          _j++;
          return M.modify(s => ({
            i: s.i,
            j: _j
          }));
        });else return label();
      }))));
    })).mbind(() => {
      let _i = i;
      _i++;
      return M.modify(s => ({
        i: _i,
        j: s.j
      }));
    });else return lab();
  }))));
});

(function () {
  var i, j, len, ref;
  ref = [1, 2, 3];
  i = 0;
  return M.block(lab => M.modify(s => ({
    i,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 3) return M.block(lab$continue => M(eff(i)).mbind(() => {
      let j, len;
      j = 0, len = ref.length;
      return M.block(label => M.modify(s => ({
        i: s.i,
        j,
        len: s.len,
        ref: s.ref
      })).mseq(M.repeat(() => M.get().mbind(({
        j
      }) => {
        if (j < len) {
          d = ref[j];
          return M(eff(d)).mbind(() => {
            let _j = j;
            _j++;
            if (t2) return M.modify(s => ({
              i: s.i,
              j: _j
            })).mseq(lab$continue());else return M.modify(s => ({
              i: s.i,
              j: _j
            }));
          }).mbind(() => M.get()).mbind(({
            j
          }) => {
            j++;
            return M.modify(s => ({
              i: s.i,
              j
            }));
          });
        } else return label();
      }))));
    })).mbind(() => {
      let _i = i;
      _i++;
      return M.modify(s => ({
        i: _i,
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
  return M.block(label => M.modify(s => ({
    j,
    len: s.len,
    ref: s.ref
  })).mseq(M.repeat(() => M.get().mbind(({
    j
  }) => {
    if (j < len) return M.block($continue => {
      d = ref[j];
      return M(eff(d)).mbind(() => {
        let i;
        i++;
        if (t2) return $continue();
      });
    }).mbind(() => {
      let _j = j;
      _j++;
      return M.set({
        j: _j
      });
    });else return label();
  }))));
});

(function () {
  var j, len;
  j = 0;
  return M.block(label => M.set({
    j
  }).mseq(M.repeat(() => M.get().mbind(({
    j
  }) => {
    if (true) return M(eff(j)).mbind(() => {
      let _j = j;
      _j++;
      if (t2) return M.set({
        j: _j
      }).mseq(label());else return M.set({
        j: _j
      });
    }).mbind(() => M.get()).mbind(({
      j
    }) => {
      j--;
      return M.set({
        j
      });
    });else return label();
  })))).mbind(() => M.get()).mbind(({
    j
  }) => eff(j));
});