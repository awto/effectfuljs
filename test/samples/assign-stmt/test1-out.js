function a() {
  var b1;
  return M(eff(1)).mbind(b => {
    b1 = b;
    return eff('a');
  }).mbind(() => eff('b'));
}

function a1() {
  var a;
  return M(eff(1)).mbind(b => {
    a = b;
    return eff('a');
  }).mbind(() => eff('b'));
}

function b() {
  var b1, b2;
  return M(eff(1)).mbind(a => {
    b1 = a;
    return M(eff(2)).mbind(c => {
      b2 = c;
      return M(eff(b1)).mbind(() => eff(b2));
    });
  });
}

function b1() {
  var a, c;
  return M(eff(1)).mbind(b => {
    var d = a = b;
    return M(eff(2)).mbind(e => {
      var f = c = e;
      d, f;
      return M(eff(a)).mbind(() => eff(c));
    });
  });
}

function c() {
  var a, b, c;
  var d, e, f, g, j;
  var x, y, z;
  return M(eff(1)).mbind(h => {
    a = h;
    b = 2;
    return eff(3);
  }).mbind(k => {
    c = k;
    return eff('a');
  }).mbind(() => eff('b')).mbind(() => eff(4)).mbind(m => {
    d = m;
    e = 5;
    return eff(6);
  }).mbind(n => {
    f = n;
    return eff(7);
  }).mbind(a1 => {
    g = a1;
    j = 8;
    return eff('x');
  }).mbind(b1 => {
    x = b1;
    y = 'y';
    return eff('z');
  }).mbind(c1 => {
    z = c1;
    return eff(9);
  }).mbind(() => eff(10));
}

function d() {
  return M(eff1('a')).mbind(a => M(eff(2)).mbind(b => {
    a.some = b;
    return eff('b');
  })).mbind(c => M(eff(3)).mbind(e => {
    c.some += e;
    return eff('c');
  })).mapply(f => {
    f.some++;
    some['d']--;
  });
}