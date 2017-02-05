// *- when it is the last statement
(function () {
  return M.block(lab => M(eff(2)).mbind(a => {
    if (a) return lab();else return eff(3);
  }));
});