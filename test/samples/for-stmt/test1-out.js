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
    let i;
    if (j < len) return M.block($continue => {
      i = ref[j];
      return M(eff(i)).mbind(a => {
        if (a) return $continue();
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
  console.log('bi');

  for (var i = 0; i < 3; i++) {
    console.log('bi:', i);
  }

  console.log('ai');
});

(function () {
  console.log('bi');

  lab: for (var i = 0; i < 3; i++) {
    console.log('bj:' + i);

    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      console.log(i + j);
    }

    console.log('aj:' + i);
  }

  console.log('ai');
});

function a() {
  var i;
  return M(eff('b')).mbind(() => {
    let i;
    i = 0;
    return M.block(label => M.set({
      i
    }).mseq(M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 3) {
        if (i === 2) console.log(i);
        return M(eff(i)).mbind(() => {
          let _i = i;
          _i++;
          return M.set({
            i: _i
          });
        });
      } else return label();
    }))));
  }).mbind(() => eff('a'));
}

;

function a1() {
  var i, j;
  return M(eff('b')).mbind(() => {
    let i, j;
    i = 0;
    j = 10;
    return M.block(label => M.set({
      i,
      j
    }).mseq(M.repeat(() => M.get().mbind(({
      i,
      j
    }) => {
      if (i < 3) {
        if (i === 2) console.log(i, j);
        return M(eff(i, j)).mbind(() => {
          let _i = i,
              _j = j;
          _i++, _j += 2;
          return M.set({
            i: _i,
            j: _j
          });
        });
      } else return label();
    }))));
  }).mbind(() => M.get()).mbind(({
    i,
    j
  }) => effRes(i, j));
}

function b() {
  return M(eff('b')).mbind(() => M.repeat(() => {
    if (i === 2) console.log(i);
    return eff(i);
  })).mbind(() => eff('a'));
}

function c() {
  return M.scope(ret => M(eff('b')).mbind(() => M.repeat(() => M((() => {
    if (i === 2) console.log(i);
    if (i === 3) return ret(10);
  })()).mbind(() => eff(i)))).mbind(() => eff('a')));
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return M.block(label => M.set({
    result,
    i
  }).mseq(M.repeat(() => M.get().mbind(({
    i,
    result
  }) => {
    if (i < 10) return M(eff(result, i)).mbind(a => {
      let result,
          _i = i;
      result = a;
      _i++;
      return M.set({
        result,
        i: _i
      });
    });else return label();
  })))).mbind(() => M.get()).mbind(({
    result
  }) => eff(result));
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return M.block(label => M.set({
    i
  }).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 10) return M(eff(i)).mbind(a => {
      let result,
          _i = i;
      result = a;
      _i++;
      return M.set({
        i: _i
      });
    });else return label();
  })))).mbind(() => eff());
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.block(label => M.set({
    result,
    i
  }).mseq(M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 10) return M(eff(i)).mbind(a => {
      let result,
          _i = i;
      result = a;
      _i++;
      return M.set({
        result,
        i: _i
      });
    });else return label();
  })))).mbind(() => M.get()).mbind(({
    result
  }) => eff(result));
}