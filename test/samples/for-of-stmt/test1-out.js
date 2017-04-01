function a() {
  var i;
  loop1 = M.iterator(some);
  return M.block(label => M.repeat(() => {
    let i;
    const a = loop1();
    const b = loop1 = a;

    if (b) {
      i = loop1.value;
      return eff(1);
    } else return label();
  })).mbind(() => eff(2));
}

function b() {
  var i;
  return M(eff('d')).mbind(a => {
    const b = M.iterator(a);
    loop3 = b;
    return M.block(label => M.repeat(() => {
      let i;
      const a = loop3();
      const b = loop3 = a;

      if (b) {
        i = loop3.value;
        return M.set({
          i
        }).mseq(eff(i));
      } else return M.set({
        i
      }).mseq(label());
    }));
  }).mbind(() => M.get()).mbind(({
    i
  }) => eff(i));
}

function c() {
  var i, j;
  loop2 = M.iterator(some);
  return M.block(label => M.repeat(() => {
    let i;
    const a = loop2();
    const b = loop2 = a;

    if (b) {
      i = loop2.value;
      _loop = M.iterator(other);
      return M.block(label => M.set({
        i
      }).mseq(M.repeat(() => {
        let j;

        const a = _loop();

        const b = _loop = a;

        if (b) {
          j = _loop.value;
          return M.modify(s => ({
            i: s.i,
            j
          })).mseq(eff(i, j));
        } else return M.modify(s => ({
          i: s.i,
          j
        })).mseq(label());
      })));
    } else return M.modify(s => ({
      i,
      j: s.j
    })).mseq(label());
  })).mbind(() => M.get()).mbind(({
    i,
    j
  }) => eff(i, j));
}

function d() {
  var i;
  loop = M.iterator(some);
  return M.block(label => M.repeat(() => {
    let i;
    const a = loop();
    const b = loop = a;

    if (b) {
      i = loop.value;
      return eff(1);
    } else return label();
  })).mbind(() => eff(2));
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}