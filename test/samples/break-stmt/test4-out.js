(function () {
  return M.block(lab => M(eff(1)).mbind(() => lab()).mbind(() => eff(2))).mbind(() => eff(3)).mbind(() => eff(4));
});