function a1() {
  return eff(1).mbind(a => a ? M.pure(a) : eff(2));
}

function a2() {
  return eff(1).mbind(a => a ? eff(2) : M.pure(a));
}

function a3() {
  return eff(1).mbind(a => a ? M.pure(a) : eff(2)).mbind(b => b ? M.pure(b) : eff(3));
}

function a4() {
  return eff(1).mbind(a => a ? eff(2) : M.pure(a)).mbind(b => b ? eff(3) : M.pure(b));
}

function a5() {
  var a = 1;
  return a ? M.pure(a) : eff(2);
}

function a6() {
  return eff(2).mapply(a => {
    a ? a : 1;
  });
}

function a7() {
  var a = 1 + 1;
  return a ? M.pure(a) : eff(2);
}

function a8() {
  return eff(2).mapply(a => {
    a ? a : 1 + 1;
  });
}

function a9() {
  var a = 1;
  return a ? eff(2) : M.pure(a);
}

function a10() {
  return eff(2).mapply(a => {
    a ? 1 : a;
  });
}

function a11() {
  var a = 1 + 1;
  return a ? eff(2) : M.pure(a);
}

function a12() {
  return eff(2).mapply(a => {
    a ? 1 + 1 : a;
  });
}

function a13() {
  return eff(1).mbind(a => a ? eff(2) : eff(3));
}

function a14() {
  return eff(1).mbind(a => a ? M.pure(2) : eff(3));
}

function a15() {
  return eff(1).mbind(a => a ? eff(2) : M.pure(3));
}

function a16() {
  return 1 ? eff(2) : eff(3);
}

function a17() {
  return eff(1).mapply(a => {
    a ? 2 : 3;
  });
}

function b() {
  return eff(1).mbind(a => a ? M.pure(a) : eff(2)).mbind(() => eff(1)).mbind(c => c ? eff(2) : M.pure(c)).mbind(() => {
    var d = 1;
    return d ? M.pure(d) : eff(2);
  }).mbind(() => eff(2)).mbind(e => {
    e ? e : 1;
    var f = 1 + 1;
    return f ? M.pure(f) : eff(2);
  }).mbind(() => eff(2)).mbind(g => {
    g ? g : 1 + 1;
    var h = 1;
    return h ? eff(2) : M.pure(h);
  }).mbind(() => eff(2)).mbind(k => {
    k ? 1 : k;
    var m = 1 + 1;
    return m ? eff(2) : M.pure(m);
  }).mbind(() => eff(2)).mbind(n => {
    n ? 1 + 1 : n;
    return eff(1);
  }).mbind(x => x ? eff(2) : eff(3)).mbind(() => eff(1)).mbind(y => y ? M.pure(2) : eff(3)).mbind(() => eff(1)).mbind(z => z ? eff(2) : M.pure(3)).mbind(() => 1 ? eff(2) : eff(3)).mbind(() => eff(1)).mapply(a1 => {
    a1 ? 2 : 3;
  });
}