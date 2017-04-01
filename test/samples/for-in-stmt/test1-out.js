function a() {
  var i;
  return M(eff(2)).mbind(a => {
    const b = M.forInIterator(a);
    loop5 = b;
    return M.block(label => M.repeat(() => {
      let i;
      const a = loop5();
      const b = loop5 = a;

      if (b) {
        i = loop5.value;
        return eff(i);
      } else return label();
    }));
  });
}

function b() {
  var i;
  return M(eff(2)).mbind(a => {
    const b = M.forInIterator(a);
    _loop = b;
    return M.block(label => M.repeat(() => {
      let i;

      const a = _loop();

      const b = _loop = a;

      if (b) {
        i = _loop.value;
        return eff(i);
      } else return label();
    }));
  });
}

function c() {
  var i;
  return M(eff(2)).mbind(a => {
    const b = M.forInIterator(a);
    loop1 = b;
    return M.block(label => M.repeat(() => {
      let i;
      const a = loop1();
      const b = loop1 = a;

      if (b) {
        i = loop1.value;
        return eff(i);
      } else return label();
    }));
  });
}

function d() {
  var i;
  return M(eff(2)).mapply(a => {
    let i;

    for (i in a) console.log(i);
  });
}

function e() {
  var i;
  loop2 = M.forInIterator(obj);
  return M.block(label => M.repeat(() => {
    let i;
    const a = loop2();
    const b = loop2 = a;

    if (b) {
      i = loop2.value;
      return eff(i);
    } else return label();
  }));
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var i;
  return M(eff('a')).mbind(() => eff(2)).mbind(a => {
    const b = M.forInIterator(a);
    loop3 = b;
    return M.block(label => M.repeat(() => {
      let i;
      const a = loop3();
      const b = loop3 = a;
      if (b) return M.block($continue => {
        i = loop3.value;
        return M(eff(i)).mbind(a => {
          if (a) return $continue();
        }).mbind(() => effB(i)).mbind(a => {
          if (a) return label();
        }).mbind(() => eff('c'));
      });else return label();
    }));
  }).mbind(() => eff('z'));
}

function h() {
  var j, i;
  return M(eff('a')).mbind(() => {
    loop4 = M.forInIterator(obj);
    return M.block(lab => M.repeat(() => {
      let j;
      const a = loop4();
      const b = loop4 = a;
      if (b) return M.block(lab$continue => {
        j = loop4.value;
        console.log('j');
        return M(effA(j)).mbind(() => eff(j)).mbind(a => {
          const b = M.forInIterator(a);
          loop = b;
          return M.block(label => M.repeat(() => {
            let i;
            const a = loop();
            const b = loop = a;
            if (b) return M.block($continue => {
              i = loop.value;
              console.log('b');
              return M(eff('b')).mbind(() => eff(i + j)).mbind(a => {
                if (a) return lab$continue();
              }).mbind(() => effB(i + j)).mbind(a => {
                if (a) return lab();
              }).mbind(() => eff(i)).mbind(a => {
                if (a) return $continue();
              }).mbind(() => effB(i)).mbind(a => {
                if (a) return label();
              }).mbind(() => eff('c'));
            });else return label();
          }));
        }).mbind(() => effB(j));
      });else return lab();
    }));
  }).mbind(() => eff('z'));
}