(function () {
  return M(eff(0)).mbind(() => M.block(lab => M.repeat(() => M.block(lab$continue => M(eff(1)).mbind(() => M.block(label => M.repeat(() => M.block($continue => M(eff(2)).mbind(() => eff(3)).mbind(a => {
    if (a) return M(eff(4)).mbind(() => label());
  }).mbind(() => eff(3)).mbind(a => {
    if (a) return M(eff(4)).mbind(() => $continue());
  }).mbind(() => eff(5)).mbind(a => {
    if (a) return M(eff(6)).mbind(() => lab$continue());
  }).mbind(() => eff(7)).mbind(a => {
    if (a) return M(eff(8)).mbind(() => lab());
  }).mbind(() => eff(9)).mbind(a => {
    if (!a) return label();
  }))))).mbind(() => eff(10)).mbind(() => {
    if (!true) return lab();
  }))))).mbind(() => eff(11));
});