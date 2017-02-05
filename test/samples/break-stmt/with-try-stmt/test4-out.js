(function () {
  return M.block(lab => M(eff(2)).mbind(() => eff(3)).mbind(a => {
    if (a) return lab();else return M.raise(new Error('error'));
  }).mbind(() => eff(4)).mhandle(e => eff(5)).mbind(() => eff(6))).mbind(() => eff(7));
});