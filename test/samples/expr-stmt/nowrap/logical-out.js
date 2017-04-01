function a1() {
  return eff(1).mbind(a => a ? M.pure(a) : eff(2));
}

function a2() {
  return eff(1).mbind(a => a ? eff(2) : M.pure(a));
}

function a3() {
  return eff(1).mbind(a => a ? M.pure(a) : eff(2)).mbind(a => a ? M.pure(a) : eff(3));
}

function a4() {
  return eff(1).mbind(a => a ? eff(2) : M.pure(a)).mbind(a => a ? eff(3) : M.pure(a));
}

function a5() {
  const a = 1;
  return a ? M.pure(a) : eff(2);
}

function a6() {
  return eff(2).mapply(a => {
    a ? a : 1;
  });
}

function a7() {
  const a = 1 + 1;
  return a ? M.pure(a) : eff(2);
}

function a8() {
  return eff(2).mapply(a => {
    a ? a : 1 + 1;
  });
}

function a9() {
  const a = 1;
  return a ? eff(2) : M.pure(a);
}

function a10() {
  return eff(2).mapply(a => {
    a ? 1 : a;
  });
}

function a11() {
  const a = 1 + 1;
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
  return eff(1).mbind(a => a ? M.pure(a) : eff(2)).mbind(() => eff(1)).mbind(a => a ? eff(2) : M.pure(a)).mbind(() => {
    const a = 1;
    return a ? M.pure(a) : eff(2);
  }).mbind(() => eff(2)).mbind(a => {
    a ? a : 1;
    const b = 1 + 1;
    return b ? M.pure(b) : eff(2);
  }).mbind(() => eff(2)).mbind(a => {
    a ? a : 1 + 1;
    const b = 1;
    return b ? eff(2) : M.pure(b);
  }).mbind(() => eff(2)).mbind(a => {
    a ? 1 : a;
    const b = 1 + 1;
    return b ? eff(2) : M.pure(b);
  }).mbind(() => eff(2)).mbind(a => {
    a ? 1 + 1 : a;
    return eff(1);
  }).mbind(a => a ? eff(2) : eff(3)).mbind(() => eff(1)).mbind(a => a ? M.pure(2) : eff(3)).mbind(() => eff(1)).mbind(a => a ? eff(2) : M.pure(3)).mbind(() => 1 ? eff(2) : eff(3)).mbind(() => eff(1)).mapply(a => {
    a ? 2 : 3;
  });
}