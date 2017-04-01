function a() {
  var b1;
  return M(eff(1)).mbind(a => {
    let b1;
    b1 = a;
    return eff('a');
  }).mbind(() => eff('b'));
}

function a1() {
  var a;
  return M(eff(1)).mbind(b => {
    let a;
    a = b;
    return eff('a');
  }).mbind(() => eff('b'));
}

function b() {
  var b1, b2;
  return M(eff(1)).mbind(a => {
    let b1;
    b1 = a;
    return M(eff(2)).mbind(a => {
      let b2;
      b2 = a;
      return M(eff(b1)).mbind(() => eff(b2));
    });
  });
}

function b1() {
  var a, c;
  return M(eff(1)).mbind(b => {
    let a;
    const d = a = b;
    return M(eff(2)).mbind(b => {
      let c;
      const e = c = b;
      d, e;
      return M(eff(a)).mbind(() => eff(c));
    });
  });
}

function c() {
  var a, b, c, d, e, f, g, j, x, y, z;
  return M(eff(1)).mbind(c => {
    let a, b;
    a = c;
    b = 2;
    return eff(3);
  }).mbind(a => {
    let c;
    c = a;
    return eff('a');
  }).mbind(() => eff('b')).mbind(() => eff(4)).mbind(a => {
    let d, e;
    d = a;
    e = 5;
    return eff(6);
  }).mbind(a => {
    let f;
    f = a;
    return eff(7);
  }).mbind(a => {
    let g, j;
    g = a;
    j = 8;
    return eff('x');
  }).mbind(a => {
    let x, y;
    x = a;
    y = 'y';
    return eff('z');
  }).mbind(a => {
    let z;
    z = a;
    return eff(9);
  }).mbind(() => eff(10));
}

function d() {
  return M(eff1('a')).mbind(a => M(eff(2)).mbind(b => {
    a.some = b;
    return eff('b');
  })).mbind(a => M(eff(3)).mbind(b => {
    a.some += b;
    return eff('c');
  })).mapply(a => {
    a.some++;
    some['d']--;
  });
}