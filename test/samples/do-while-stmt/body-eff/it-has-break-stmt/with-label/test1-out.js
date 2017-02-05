(function () {
  return M(eff(0)).mbind(() => M.block(lab => M.repeat(() => M.block(lab$continue => M(eff(1)).mbind(() => M.block(label => M.repeat(() => M.block($continue => M(eff(2)).mbind(() => eff(3)).mbind(a => {
    if (a) return M(eff(4)).mbind(() => label());
  }).mbind(() => eff(3)).mbind(b => {
    if (b) return M(eff(4)).mbind(() => $continue());
  }).mbind(() => eff(5)).mbind(c => {
    if (c) return M(eff(6)).mbind(() => lab$continue());
  }).mbind(() => eff(7)).mbind(d => {
    if (d) return M(eff(8)).mbind(() => lab());
  }).mbind(() => eff(9)).mbind(e => {
    if (!e) return label();
  }))))).mbind(() => eff(10)).mbind(() => {
    if (!true) return lab();
  }))))).mbind(() => eff(11));
});