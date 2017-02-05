(function () {
  return M.block(lab => M(eff(2)).mbind(() => lab()).mhandle(e => eff(3))).mbind(() => eff(4));
});