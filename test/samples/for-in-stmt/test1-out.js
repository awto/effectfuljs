function a() {
  var loop;
  var i;
  return M(eff(2)).mbind(b => {
    var c = M.forInIterator(b);
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
          loop: loop
        }).mbind(() => eff(i));
      } else return M.set({
        loop: loop
      }).mbind(() => label());
    }))));
  });
}

function b() {
  var i;
  var loop;
  return M(eff(2)).mbind(a => {
    var c = M.forInIterator(a);
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
          loop: loop
        }).mbind(() => eff(i));
      } else return M.set({
        loop: loop
      }).mbind(() => label());
    }))));
  });
}

function c() {
  var loop;
  var i;
  return M(eff(2)).mbind(a => {
    var b = M.forInIterator(a);
    loop = b;
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
          loop: loop
        }).mbind(() => eff(i));
      } else return M.set({
        loop: loop
      }).mbind(() => label());
    }))));
  });
}

function d() {
  var i;
  return M(eff(2)).mapply(a => {
    for (i in a) {
      console.log(i);
    }
  });
}

function e() {
  var loop;
  var i;
  loop = M.forInIterator(obj);
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
      }).mbind(() => eff(i));
    } else return M.set({
      loop: loop
    }).mbind(() => label());
  }))));
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var loop;
  var i;
  return M(eff('a')).mbind(() => eff(2)).mbind(a => {
    var b = M.forInIterator(a);
    loop = b;
    return M.block(label => M.set({
      loop: loop
    }).mbind(() => M.repeat(() => M.get().mbind(({
      loop
    }) => {
      var c = loop();
      var d = loop = c;
      if (d) return M.block($continue => {
        i = loop.value;
        return M.set({
          loop: loop
        }).mbind(() => eff(i)).mbind(e => {
          if (e) return $continue();
        }).mbind(() => effB(i)).mbind(f => {
          if (f) return label();
        }).mbind(() => eff('c'));
      });else return M.set({
        loop: loop
      }).mbind(() => label());
    }))));
  }).mbind(() => eff('z'));
}

function h() {
  var j;
  var loop;
  var loop1;
  var i;
  return M(eff('a')).mbind(() => {
    loop = M.forInIterator(obj);
    return M.block(lab => M.set({
      loop: loop
    }).mbind(() => M.repeat(() => M.get().mbind(({
      loop
    }) => {
      var a = loop();
      var b = loop = a;
      if (b) return M.block(lab$continue => {
        j = loop.value;
        console.log('j');
        return M.set({
          loop: loop
        }).mbind(() => effA(j)).mbind(() => eff(j)).mbind(c => {
          var d = M.forInIterator(c);
          loop1 = d;
          return M.block(label => M.modify(s => ({
            loop: s.loop,
            loop1: loop1
          })).mbind(() => M.repeat(() => M.get().mbind(({
            loop1
          }) => {
            var e = loop1();
            var f = loop1 = e;
            if (f) return M.block($continue => {
              i = loop1.value;
              console.log('b');
              return M.modify(s => ({
                loop: s.loop,
                loop1: loop1
              })).mbind(() => eff('b')).mbind(() => M(eff(i + j)).mbind(g => {
                if (g) return lab$continue();
              }).mbind(() => effB(i + j))).mbind(k => {
                if (k) return lab();
              }).mbind(() => eff(i)).mbind(m => {
                if (m) return $continue();
              }).mbind(() => effB(i)).mbind(n => {
                if (n) return label();
              }).mbind(() => eff('c'));
            });else return M.modify(s => ({
              loop: s.loop,
              loop1: loop1
            })).mbind(() => label());
          }))));
        }).mbind(() => effB(j));
      });else return M.set({
        loop: loop
      }).mbind(() => lab());
    }))));
  }).mbind(() => eff('z'));
}