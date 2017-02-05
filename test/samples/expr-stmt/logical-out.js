function a1() {
  return M(eff(1)).mbind(a => a || eff(2));
}

function a2() {
  return M(eff(1)).mbind(a => a && eff(2));
}

function a3() {
  return M(eff(1)).mbind(a => a || eff(2)).mbind(b => b || eff(3));
}

function a4() {
  return M(eff(1)).mbind(a => a && eff(2)).mbind(b => b && eff(3));
}

function a5() {
  return 1 || eff(2);
}

function a6() {
  return M(eff(2)).mapply(a => {
    a || 1;
  });
}

function a7() {
  return 1 + 1 || eff(2);
}

function a8() {
  return M(eff(2)).mapply(a => {
    a || 1 + 1;
  });
}

function a9() {
  return 1 && eff(2);
}

function a10() {
  return M(eff(2)).mapply(a => {
    a && 1;
  });
}

function a11() {
  return 1 + 1 && eff(2);
}

function a12() {
  return M(eff(2)).mapply(a => {
    a && 1 + 1;
  });
}

function a13() {
  return M(eff(1)).mbind(a => a ? eff(2) : eff(3));
}

function a14() {
  return M(eff(1)).mbind(a => a ? 2 : eff(3));
}

function a15() {
  return M(eff(1)).mbind(a => a ? eff(2) : 3);
}

function a16() {
  return 1 ? eff(2) : eff(3);
}

function a17() {
  return M(eff(1)).mapply(a => {
    console.log(a ? 2 : 3);
  });
}

function a18() {
  return M(eff(1)).mbind(a => M(eff(2)).mapply(b => {
    a + b ? 2 : 3;
  }));
}

function b() {
  return M(eff(1)).mbind(a => a || eff(2)).mbind(() => eff(1)).mbind(c => c && eff(2)).mbind(() => 1 || eff(2)).mbind(() => eff(2)).mbind(d => {
    d || 1;
    return 1 + 1 || eff(2);
  }).mbind(() => eff(2)).mbind(e => {
    e || 1 + 1;
    return 1 && eff(2);
  }).mbind(() => eff(2)).mbind(f => {
    f && 1;
    return 1 + 1 && eff(2);
  }).mbind(() => eff(2)).mbind(g => {
    g && 1 + 1;
    return eff(1);
  }).mbind(h => h ? eff(2) : eff(3)).mbind(() => eff(1)).mbind(k => k ? 2 : eff(3)).mbind(() => eff(1)).mbind(m => m ? eff(2) : 3).mbind(() => 1 ? eff(2) : eff(3)).mbind(() => eff(1)).mapply(n => {
    n ? 2 : 3;
  });
}