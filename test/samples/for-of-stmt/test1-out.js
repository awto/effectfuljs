function a() {
  var loop;
  var i;
  loop = M.iterator(some);
  return M.block(label => M.set({
    loop: loop
  }).mbind(() => M.repeat(() => M.get().mbind(({
    loop
  }) => {
    var b = loop();
    var c = loop = b;

    if (c) {
      i = loop.value;
      return M.set({
        loop: loop
      }).mbind(() => eff(1));
    } else return M.set({
      loop: loop
    }).mbind(() => label());
  })))).mbind(() => eff(2));
}

function b() {
  var loop;
  var i;
  return M(eff('d')).mbind(a => {
    var c = M.iterator(a);
    loop = c;
    return M.block(label => M.set({
      loop: loop
    }).mbind(() => M.repeat(() => M.get().mbind(({
      loop
    }) => {
      var d = loop();
      var e = loop = d;

      if (e) {
        i = loop.value;
        return M.set({
          i: i,
          loop: loop
        }).mbind(() => eff(i));
      } else return M.set({
        loop: loop
      }).mbind(() => label());
    }))));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function c() {
  var loop;
  var i;
  var loop1;
  var j;
  loop = M.iterator(some);
  return M.block(label => M.set({
    loop: loop
  }).mbind(() => M.repeat(() => M.get().mbind(({
    loop
  }) => {
    var a = loop();
    var b = loop = a;

    if (b) {
      i = loop.value;
      loop1 = M.iterator(other);
      return M.block(label1 => M.set({
        i: i,
        loop: loop,
        loop1: loop1
      }).mbind(() => M.repeat(() => M.get().mbind(({
        loop1
      }) => {
        var d = loop1();
        var e = loop1 = d;

        if (e) {
          j = loop1.value;
          return M.modify(s => ({
            i: s.i,
            j: j,
            loop: s.loop,
            loop1: loop1
          })).mbind(() => eff(i, j));
        } else return M.modify(s => ({
          i: s.i,
          loop: s.loop,
          loop1: loop1
        })).mbind(() => label1());
      }))));
    } else return M.set({
      loop: loop
    }).mbind(() => label());
  })))).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}

function d() {
  var loop;
  var i;
  loop = M.iterator(some);
  return M.block(label => M.set({
    loop: loop
  }).mbind(() => M.repeat(() => M.get().mbind(({
    loop
  }) => {
    var a = loop();
    var b = loop = a;

    if (b) {
      i = loop.value;
      return M.set({
        loop: loop
      }).mbind(() => eff(1));
    } else return M.set({
      loop: loop
    }).mbind(() => label());
  })))).mbind(() => eff(2));
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}