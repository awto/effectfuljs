// *- when branches has effects and it is the last statement
function a() {
  return M.scope(ret => {
    if (true) return M(eff(1)).mbind(a => ret(a));else return M(eff(2)).mbind(a => ret(a));
  });
}

function b() {
  return M.scope(ret => M((() => {
    if (true) return M(eff(1)).mbind(a => ret(a));else return M(eff(2)).mbind(a => ret(a));
  })()).mbind(() => eff(3)).mbind(() => eff(4)));
}

function c() {
  return M((() => {
    if (true) return eff(1);else return eff(2);
  })()).mbind(() => eff(3)).mbind(() => eff(4));
}

function d() {
  return M(eff('a')).mbind(() => {
    if (true) return eff(1);else return eff(2);
  }).mbind(() => eff(3)).mbind(() => eff(4));
}

function e() {
  return M.scope(ret => M(eff(1)).mbind(a => {
    if (a) return ret(1);else return ret(2);
  }).mbind(() => eff(2)));
}

function f() {
  return M.scope(ret => M(eff(1)).mbind(a => {
    if (a) return ret(1);else return ret(2);
  }));
}