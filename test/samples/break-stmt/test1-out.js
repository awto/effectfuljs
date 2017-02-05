(function () {
  return M(eff(1)).mbind(() => M.block(lab => M(eff(2)).mbind(a => {
    if (a) return lab();else return eff(3);
  }))).mbind(() => eff(4)).mbind(() => eff(5));
});

(function () {
  return M(eff(1)).mbind(() => M.block(lab => M(eff(2)).mbind(a => {
    if (a) return M(eff('a')).mbind(() => lab());else return eff(3);
  }))).mbind(() => eff(4)).mbind(() => eff(5));
});

(function () {
  return M.scope(ret => M(eff(1)).mbind(() => eff(2)).mbind(a => {
    if (a) return M(eff('a')).mbind(() => eff('b')).mbind(b => ret(b));
  }).mbind(() => eff(4)).mbind(() => eff(5)));
});