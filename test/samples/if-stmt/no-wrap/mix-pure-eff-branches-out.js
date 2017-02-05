function a() {
  return M.scope(ret => {
    if (true) return eff(1).mbind(b => ret(b));else return ret(3);
  });
}

function b() {
  return (() => {
    if (true) return eff(1);else {
      console.log(3);
      return M.pure();
    }
  })().mbind(() => eff(3)).mbind(() => eff(4));
}

function c() {
  return M.scope(ret => (() => {
    if (true) return eff(1);else {
      console.log(3);
      return ret(3);
    }
  })().mbind(() => eff(3)).mbind(() => eff(4)));
}

function d() {
  return eff('a').mbind(() => {
    if (true) return eff(1);else {
      console.log(3);
      return M.pure();
    }
  }).mbind(() => eff(3)).mbind(() => eff(4));
}

function e() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return ret();else return M.pure();
  }).mbind(() => eff('2')));
}

function f() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return eff('i').mbind(b => ret(b));else return M.pure();
  }).mbind(() => eff('2')));
}

function g() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return ret();else return M.pure();
  }).mapply(() => {
    console.log('2');
  }));
}

function h() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return ret();else return M.pure();
  }).mbind(() => {
    console.log('2');
    return eff('2');
  }));
}

function i() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return ret();else return M.pure();
  }).mbind(() => {
    console.log('2');
    return eff(2);
  }));
}

function j() {
  return M.scope(ret => eff('1').mbind(a => {
    if (a) return ret();else return M.pure();
  }).mbind(() => {
    console.log('2');
    return eff(2);
  }).mapply(() => {
    console.log('3');
  }));
}