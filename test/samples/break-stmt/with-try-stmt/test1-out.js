(function () {
  return M.block(lab => M(eff(1)).mbind(a => {
    if (a) return M(eff('before break')).mbind(() => lab());
  }).mbind(() => eff(2)).mhandle(e => eff(3)).mbind(() => eff(4))).mbind(() => eff(5));
});