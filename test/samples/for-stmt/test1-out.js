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
      i = ref[j];
      return M(eff(i)).mbind(a => {
        if (a) return $continue();
      });
    }).mbind(() => {
      var j1 = j;
      j1++;
      return M.set({
        j: j1
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
    i = 0;
    return M.block(label => M.set({
      i: i
    }).mbind(() => M.repeat(() => M.get().mbind(({
      i
    }) => {
      if (i < 3) {
        if (i === 2) console.log(i);
        return M(eff(i)).mbind(() => {
          var i1 = i;
          i1++;
          return M.set({
            i: i1
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
    i = 0;
    j = 10;
    return M.block(label => M.set({
      i: i,
      j: j
    }).mbind(() => M.repeat(() => M.get().mbind(({
      i,
      j
    }) => {
      if (i < 3) {
        if (i === 2) console.log(i, j);
        return M(eff(i, j)).mbind(() => {
          var i1 = i;
          var j1 = j;
          i1++, j1 += 2;
          return M.set({
            i: i1,
            j: j1
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
    i: i,
    result: result
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i,
    result
  }) => {
    if (i < 10) return M(eff(result, i)).mbind(a => {
      var i1 = i;
      result = a;
      i1++;
      return M.set({
        i: i1,
        result: result
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
    i: i
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 10) return M(eff(i)).mbind(a => {
      var i1 = i;
      result = a;
      i1++;
      return M.set({
        i: i1
      });
    });else return label();
  })))).mbind(() => eff());
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.block(label => M.set({
    i: i,
    result: result
  }).mbind(() => M.repeat(() => M.get().mbind(({
    i
  }) => {
    if (i < 10) return M(eff(i)).mbind(a => {
      var i1 = i;
      result = a;
      i1++;
      return M.set({
        i: i1,
        result: result
      });
    });else return label();
  })))).mbind(() => M.get()).mbind(({
    result
  }) => eff(result));
}