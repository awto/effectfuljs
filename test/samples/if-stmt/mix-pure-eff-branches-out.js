// *- when there is a mix of pure and effectful branches
function a() {
  return M.scope(ret => {
    if (true) return M(eff(1)).mbind(a => ret(a));else return ret(3);
  });
}

function b() {
  return M((() => {
    if (true) return eff(1);else console.log(3);
  })()).mbind(() => eff(3)).mbind(() => eff(4));
}

function c() {
  return M.scope(ret => M((() => {
    if (true) return eff(1);else {
      console.log(3);
      return ret(3);
    }
  })()).mbind(() => eff(3)).mbind(() => eff(4)));
}

function d() {
  return M(eff('a')).mbind(() => {
    if (true) return eff(1);else console.log(3);
  }).mbind(() => eff(3)).mbind(() => eff(4));
}

function e() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return ret();
  }).mbind(() => eff('2')));
}

function f() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return M(eff('i')).mbind(a => ret(a));
  }).mbind(() => eff('2')));
}

function g() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return ret();
  }).mapply(() => {
    console.log('2');
  }));
}

function h() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return ret();
  }).mbind(() => {
    console.log('2');
    return eff('2');
  }));
}

function i() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return ret();
  }).mbind(() => {
    console.log('2');
    return eff(2);
  }));
}

function j() {
  return M.scope(ret => M(eff('1')).mbind(a => {
    if (a) return ret();
  }).mbind(() => {
    console.log('2');
    return eff(2);
  }).mapply(() => {
    console.log('3');
  }));
}